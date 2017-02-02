var getLoopPromiseFunc = function (func) {
  var loopPromiseFactory = function (func) {
    return func().then(function () {
      return new Promise(function (resolve) {
        resolve(loopPromiseFactory(func))
      })
    })
  }
  return function () {
    return loopPromiseFactory(func)
  }
}

var uniqueId = (function () {
  var id = 0
  return function () {
    return id += 1
  }
})()


var Track = function (src) {
  this.ready = false
  this.src = src
  this.activeChapter = null
  this.activePlayers = []
  this.chapters = []
  this.chaptersWithPlayers = []
  this.waveformsContainer = null
  this.initialize()
  return this
}

Track.prototype.getAudio = function (channel) {
  return new Promise(function (resolve, reject) {
    var worker = new Worker('./assets/track-worker.js')
    worker.postMessage(channel)
    worker.addEventListener('message', function (e) {
      resolve(e.data)
    }, false)
    worker.addEventListener('error', reject, false)
  })
}

Track.prototype.getWavesurfer = function (audio, waveformContainer) {
  var wavesurfer = WaveSurfer.create({
    container: waveformContainer,
    interact: false,
    hideScrollbar: true,
    autoCenter: false,
    normalize: true,
    minPxPerSec: 0,
    cursorColor: 'transparent',
    progressColor: '#ebebeb',
    waveColor: '#f0f0f0',
    height: document.documentElement.clientHeight / 4
  })
  wavesurfer.loadBlob(audio.blob)
  return new Promise(function (resolve, reject) {
    wavesurfer.on('ready', function () {
      wavesurfer.backend.gainNode.gain.value = audio.config.volume
      var player = {
        wavesurfer: wavesurfer,
        waveformContainer: waveformContainer
      }
      resolve(player)
    })
    wavesurfer.on('error', reject)
  })
}

Track.prototype.getChapterWithPlayers = function (chapter) {
  var that = this

  if (!this.waveformsContainer) {
    this.waveformsContainer = document.createElement('div')
    this.waveformsContainer.className = 'waveforms-container'
    this.waveformsContainer.id = 'waveforms-container-' + uniqueId()
    document.body.appendChild(this.waveformsContainer)
  }

  var waveformsChapterContainer = document.createElement('div')
  waveformsChapterContainer.className = 'waveforms-chapter-container'
  waveformsChapterContainer.id = 'waveforms-chapter-container-' + uniqueId()
  this.waveformsContainer.appendChild(waveformsChapterContainer)

  return Promise.all(chapter.channels.map(function (channel) {
    return that.getAudio(channel)
  }))
    .then(function (audios) {
      return Promise.all(audios.map(function (audio) {
        var waveformContainer = document.createElement('div')
        waveformContainer.className = 'waveform'
        waveformContainer.id = 'waveform-' + uniqueId()
        waveformsChapterContainer.dataset.width = Math.max.apply(Math, audios.map(function (audio) {
          return audio.size
        }))
        waveformsChapterContainer.appendChild(waveformContainer)
        return that.getWavesurfer(audio, waveformContainer)
      }))
    })
    .then(function (players) {
      return {chapter: chapter, players: players}
    })
}

Track.prototype.activatePlayer = function (player) {
  return new Promise(function (resolve) {
    player.wavesurfer.play()
    player.wavesurfer.on('finish', resolve)
  })
}

Track.prototype.playChapterWithPlayers = function (chapterWithPlayers) {
  var that = this
  return Promise.all(chapterWithPlayers.players.map(function (player) {
    return that.activatePlayer(player)
  }))
}

Track.prototype.initPlayers = function () {
  var that = this
  return Promise.all(this.chapters.map(function (chapter) {
    return that.getChapterWithPlayers(chapter)
  }))
    .then(function (chaptersWithPlayers) {
      that.chaptersWithPlayers = chaptersWithPlayers
    })
}

Track.prototype.loadChapters = function () {
  var that = this
  var script = Object.assign(document.createElement('script'), {src: this.src})
  return new Promise(function (resolve, reject) {
    script.onload = function () {
      document.body.removeChild(script)
    }
    script.onerror = function () {
      document.body.removeChild(script)
      reject()
    }
    document.body.appendChild(script)
    addEventListener('chaptersLoaded', function (e) {
      that.chapters = e.detail
      resolve()
    }, false)
  })
}

Track.prototype.zoomWavesurfers = function (pxPerSec) {
  this.chaptersWithPlayers.forEach(function (chapterWithPlayers) {
    chapterWithPlayers.players.forEach(function (player) {
      player.wavesurfer.zoom(pxPerSec)
    })
  })
}

Track.prototype.addStyleToWaveforms = function () {
  var waveformsChapterContainers = this.waveformsContainer.querySelectorAll('.waveforms-chapter-container')
  var fullWidth = Array.prototype.reduce.call(waveformsChapterContainers, function (fullWidth, waveformsChapterContainer) {
    return fullWidth + parseInt(waveformsChapterContainer.dataset.width, 10)
  }, 0)
  waveformsChapterContainers.forEach(function (waveformsChapterContainer) {
    var width = parseInt(waveformsChapterContainer.dataset.width, 10)
    width /= fullWidth
    width *= 100
    width = Math.round(width)
    width += '%'
    waveformsChapterContainer.style.width = width
  })
  var magicNumber = 3493023 / 1440 / 18.194 // ???
  var pxPerSec = fullWidth / document.body.offsetWidth / magicNumber
  this.zoomWavesurfers(pxPerSec)
  window.track = this
}

Track.prototype.initialize = function () {
  var that = this
  return this.loadChapters()
    .then(function () {
      return that.initPlayers()
    })
    .then(function () {
      that.addStyleToWaveforms()
      that.ready = true
    })
    .then(function () {
      that.onload()
    })
    .catch (function (e) {
      console.error(e, e.stack)
      alert(e)
    })
}

Track.prototype.start = function () {
  var that = this
  var playChapterPromise
  this.chaptersWithPlayers.forEach(function (chapterWithPlayers) {
    var playCertainChapterWithPlayers = function  () {
      that.activeChapter = chapterWithPlayers.chapter
      that.activePlayers = chapterWithPlayers.players
      return that.playChapterWithPlayers(chapterWithPlayers)
    }
    if (chapterWithPlayers.chapter.loop) {
      playCertainChapterWithPlayers = getLoopPromiseFunc(playCertainChapterWithPlayers)
    }

    if (playChapterPromise) {
      playChapterPromise.then(playCertainChapterWithPlayers)
    } else {
      playChapterPromise = playCertainChapterWithPlayers()
    }
  })
}

Track.prototype.resume = function () {
  this.activePlayers.forEach(function (player) {
    player.wavesurfer.play()
  })
}

Track.prototype.play = function () {
  if (!this.ready) {
    throw new Error('The Track is not ready yet!')
  }

  if (this.activePlayers.length) {
    this.resume()
  } else {
    this.start()
  }
}

Track.prototype.pause = function () {
  this.activePlayers.forEach(function (player) {
    player.wavesurfer.pause()
  })
}

Track.prototype.stop = function () {
  this.activePlayers.forEach(function (player) {
    player.wavesurfer.stop()
  })
  this.activePlayers = []
}

addEventListener('DOMContentLoaded', function () {
  var h = preact.h
  var render = preact.render
  var createClass = function (obj) {
    var F = function () {
      preact.Component.call(this)
    }
    var p = F.prototype = new preact.Component
    for (var i in obj) p[i] = obj[i]
    return p.constructor = F
  }
  var App = createClass({
    state: {
      titles: [
        'Circus Charlie - Stage 1',
        'Final Fantasy II - prelude',
        // 'Kunio Kun no Nekketsu Soccer League - main theme',
        // 'Ninja Gaiden - Ryu\'s Determination',
        'Super Mario Bros. - Ground Theme',
        // 'Super Mario Bros. 3 - Ending',
        // 'The Goonies - Stage 1',
        // 'The Legend of Zelda - Title Theme'
      ],
      trackDicts: {}
    },
    getTrackDict: function (title) {
      return this.state.trackDicts[title]
    },
    isTrackNotInited: function (title) {
      return !this.getTrackDict(title)
    },
    updateTrackDict: function (title, trackDict) {
      var that = this
      var oldTrackDict = this.getTrackDict(title) || {}
      var newTrackDict = Object.assign(oldTrackDict, trackDict)
      this.state.trackDicts[title] = newTrackDict
      return new Promise(function (resolve) {
        that.setState({trackDicts: that.state.trackDicts}, resolve)
      })
    },
    getTrack: function (title) {
      var trackDict = this.getTrackDict(title)
      if (trackDict) {
        return trackDict.track
      }
    },
    getTrackStatus: function (title) {
      return this.isTrackNotInited(title)
        ? null
        : this.getTrackDict(title).status
    },
    canclePendingAutoplay: function () {
      var that = this
      this.state.titles.map(function (title) {
        if (that.getTrackStatus(title) !== 'pending') return
        that.getTrackDict(title).autoplay = false
      })
    },
    pauseAllTracksExcept: function (except) {
      var that = this
      this.state.titles.forEach(function (title) {
        if (title === except) return
        if (that.getTrackStatus(title) === 'playing') {
          that.getTrackDict(title).track.pause()
        }
      })
    },
    loadTrack: function (title) {
      var that = this
      this.updateTrackDict(title, {
        autoplay: true,
        status: 'pending',
        track: null
      })

      track = new Track('./tracks/' + title + '/chapters.js')
      track.onload = function () {
        that.updateTrackDict(title, {
          status: 'stopping',
          track: track
        }).then(function () {
          if (that.getTrackDict(title).autoplay) {
            that.play(title)
          }
        })
      }
    },
    play: function (title) {
      var that = this
      app = that
      this.updateTrackDict(title, {
        status: 'playing',
      }).then(function () {
        that.pauseAllTracksExcept(title)
        that.getTrack(title).play()
      })
    },
    pause: function (title) {
      var that = this
      this.updateTrackDict(title, {
        status: 'pausing',
      }).then(function () {
        that.getTrack(title).pause()
      })
    },
    stop: function (title) {
      var that = this
      this.updateTrackDict(title, {
        status: 'stopping',
      }).then(function () {
        that.getTrack(title).stop()
      })
    },
    click: function (title) {
      var that = this
      that.canclePendingAutoplay()

      switch (that.getTrackStatus(title)) {
        case 'pending':
          break
        case 'playing':
          that.pause(title)
          break
        case 'pausing':
        case 'stopping':
          that.play(title)
          break
        default:
          that.loadTrack(title)
      }
    },
    render: function(props, state) {
      var that = this
      return h('div', {className: 'app'},
        h('ol', {className: 'list'}, state.titles.map(function (title) {
          return h('li', {onclick: that.click.bind(that, title)}, title + ',' + that.getTrackStatus(title))
        }))
      )
    }
  })
  render(h(App), document.body)
}, false)
