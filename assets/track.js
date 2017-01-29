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

var Track = function (src) {
  this.ready = false
  this.src = src
  this.activeChapter = null
  this.activePlayers = []
  this.chapters = []
  this.chaptersWithPlayers = []
  this.initialize()
  return this
}

Track.prototype.getAudio = function (channel) {
  return new Promise(function (resolve, reject) {
    var worker = new Worker('../../assets/track-worker.js')
    worker.postMessage(channel)
    worker.addEventListener('message', function (e) {
      resolve(e.data)
    }, false)
    worker.addEventListener('error', reject, false)
  })
}

Track.prototype.getChapterWithPlayers = function (chapter) {
  var that = this
  return Promise.all(chapter.channels.map(function (channel) {
    return that.getAudio(channel)
  }))
    .then(function (audios) {
      var players = audios.map(function (audio) {
        var player = WaveSurfer.create({
          container: '#waveform',
          waveColor: 'violet',
          progressColor: 'purple'
        })
        player.load(audio.url)
        return player
        return new Howl({
          src: [audio.url],
          format: ['wav'],
          autoplay: false,
          loop: false,
          volume: audio.config.volume
        })
      })
      return {chapter: chapter, audios: audios, players: players}
    })
}

Track.prototype.activatePlayer = function (player, loop) {
  return new Promise(function (resolve) {
    player.play()
    player.on('finish', function () {
      resolve()
    })
  })
}

Track.prototype.playChapterWithPlayers = function (chapterWithPlayers) {
  var that = this
  return Promise.all(chapterWithPlayers.players.map(function (player) {
    return that.activatePlayer(player, chapterWithPlayers.chapter.loop)
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

Track.prototype.initialize = function () {
  var that = this
  return this.loadChapters()
    .then(function () {
      return that.initPlayers()
    })
    .then(function () {
      that.ready = true
    })
    .then(function () {
      that.onload()
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
    player.play()
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
    player.pause()
  })
}

Track.prototype.stop = function () {
  this.activePlayers.forEach(function (player) {
    player.stop()
  })
  this.activePlayers = []
}

addEventListener('DOMContentLoaded', function () {
  track = new Track('channels.js')
  track.onload = function () {
    track.play()
  }
}, false)
