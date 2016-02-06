define(['_', 'riot', 'text!../html/track.tag!strip', location.pathname + 'manifest.js'],
  function (_, riot, track, manifest) {
    return [
      riot.tag('title', '{ opts.title }'),

      riot.tag('track', track, function (title) {
        var that = this

        this.title = title
        this.status = 'loading'
        this.sources = []
        this.audioEls = null
        this.progress = 0.6
        this.started = false
        this.paused = true
        this.audioEls = null

        var timer
        var cover

        this.on('updated', _.debounce(function () {
          if (that.paused) clearInterval(timer)
          else {
            timer = setInterval(function () {
              cover = cover || document.body.querySelector('.cover')
              var pos = cover.style.backgroundPosition
              pos = parseInt(pos, 10)
              pos = _.isNaN(pos) ? 0 : pos
              pos -= 1
              cover.style.backgroundPosition = pos + 'px center'
            }, 1000 / 60)
          }
        }, 100))

        this.error = function () {
          that.status = 'error'
          that.update()
          return that
        }

        this.load = function (audios) {
          var loadedAudioCount = 0

          var onload = function (e) {
            loadedAudioCount += 1
            console.log(loadedAudioCount + ' audios are now in status ' + e.type + '...')
            that.progress = 0.8 + loadedAudioCount * (1 - 0.8) / that.audioEls.length

            if (loadedAudioCount === that.audioEls.length) {
              that.status = 'loaded'
            }

            if (that.progress >= 1) {
              _.each(that.audioEls, function (audioEl) {
                audioEl.removeEventListener('load', onload, false)
                audioEl.removeEventListener('canplaythrough', onload, false)
              })
            }

            that.update()
          }

          var onended = function () {
            that.stop()
            _.defer(function () {
              that.update()
            })
          }

          var onerror = function (e) {
            var error = new Error("Some audios can not be loaded... Pleas refresh the page. If it does not work, clear your browser's cache.")
            console.error(error)
            console.error(error.message)
            that.error = error
            that.status = 'error'
            that.update()
          }

          var ontimeupdate = function (e) {
            var audioEl = e.target
            var originVolume = audioEl.originVolume ? audioEl.originVolume : 0.2
            var remain = audioEl.duration - audioEl.currentTime
            var mutePoint = 2
            var muteTime = 5
            var volume

            if (remain < mutePoint + muteTime) {
              volume = originVolume * (remain - mutePoint) / muteTime
              volume = _.max([volume, 0])
              audioEl.volume = volume
            } else if (remain && audioEl.volume) {
              audioEl.originVolume = audioEl.volume
            }
          }

          that.audios = audios
          that.audioEls = that.root.getElementsByTagName('audio')
          that.progress = 0.8

          that.update()

          _.each(audios, function (audio, i) {
            var audioEl = _.get(that.audioEls, i)

            _.assign(audioEl, audio)
            audioEl.originVolume = audioEl.volume
            audioEl.addEventListener('load', onload, false)
            audioEl.addEventListener('canplaythrough', onload, false)
            audioEl.addEventListener('error', onerror, false)
            audioEl.addEventListener('ended', onended, false)
            audioEl.addEventListener('timeupdate', ontimeupdate, false)
          })

          _.delay(function () {
            if (that.status === 'loading') {
              console.warn('Force to make all audios shown...')
              that.status = 'loaded'
              that.update()
            }
          }, 8000)

          return that
        }

        this.syncAudioCurrentTime = function (currentTime) {
          currentTime = _.isUndefined(currentTime)
            ? _.first(that.audioEls).currentTime
            : currentTime
          _.each(that.audioEls, function (audio) {
            audio.currentTime = currentTime
          })
          return that
        }

        this.play = function () {
          _.defer(function () {
            that.syncAudioCurrentTime()
          })
          _.defer(function () {
            _.each(that.audioEls, function (audio) {
              audio.volume = audio.originVolume || audio.volume
              audio.play()
            })
          })
          that.started = true
          that.paused = false
          return that
        }

        this.pause = function () {
          _.each(that.audioEls, function (audio) {
            audio.pause()
          })
          that.started = true
          that.paused = true
          return that
        }

        this.stop = function () {
          that.pause().syncAudioCurrentTime(0)
          that.started = false
          that.paused = true
          return that
        }

        this.reset = function (e) {
          if (that.started || that.status !== 'loaded') {
            if (confirm('Leave this page and go home?') === false) {
              e.preventDefault()
            }
          }

          return true
        }
      })
    ]
  })
