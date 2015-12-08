define(['_', 'riot', 'text!/assets/html/track.tag!strip', location.pathname + 'manifest.js'],
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
          if (that.paused) {
            clearInterval(timer)
          } else {
            timer = setInterval(function() {
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

          var oncanplaythrough = function (e) {
            loadedAudioCount += 1
            that.progress = 0.8 + loadedAudioCount * (1 - 0.8) / that.audioEls.length

            if (loadedAudioCount === that.audioEls.length) {
              that.status = 'loaded'
            }

            if (that.progress >= 1) {
              _.each(that.audioEls, function (audioEl) {
                audioEl.removeEventListener('canplaythrough', oncanplaythrough, false)
              })
              that.status = 'canplaythrough'
            }

            that.update()
          }

          var onended = function() {
            that.stop()
            _.defer(function () {
              that.update()
            })
          }

          that.audios = audios
          that.audioEls = that.root.getElementsByTagName('audio')
          that.progress = 0.8

          that.update()

          _.each(audios, function (audio, i) {
            var audioEl = _.get(that.audioEls, i)

            _.assign(audioEl, audio)
            audioEl.addEventListener('canplaythrough', oncanplaythrough, false)
            audioEl.addEventListener('ended', onended, false)
          })

          return that
        }

        this.syncAudioCurrentTime = function (currentTime) {
          var currentTime = _.isUndefined(currentTime)
            ? _.first(that.audioEls).currentTime
            : currentTime
          _.each(that.audioEls, function (audio) {
            audio.currentTime = currentTime
          })
          return that
        }

        this.play = function () {
          that.syncAudioCurrentTime()
          _.each(that.audioEls, function (audio) {
            audio.play()
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
          if (this.started || this.status !== 'canplaythrough') {
            if (confirm('Leave this page and go home?') === false) {
              e.preventDefault()
            }
          }

          return true
        }
      })
    ]
  })
