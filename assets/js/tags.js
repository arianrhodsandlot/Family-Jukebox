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
      this.progress = 0.2

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
            that.status = 'canplaythrough'
          }

          if (that.progress >= 1) {
            _.each(that.audioEls, function (audio) {
              audio.removeEventListener('canplaythrough', oncanplaythrough, false)
            })
          }

          that.update()
        }

        that.status = 'loaded'
        that.audios = audios
        that.audioEls = that.root.getElementsByTagName('audio')
        that.progress = 0.8

        that.update()

        _.each(audios, function (audio, i) {
          _.assign(_.get(that.audioEls, i), audio)
            .addEventListener('canplaythrough', oncanplaythrough, false)
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
        return that
      }

      this.pause = function () {
        _.each(that.audioEls, function (audio) {
          audio.pause()
        })
        return that
      }

      this.stop = function () {
        return that.pause().syncAudioCurrentTime(0)
      }
    })
  ]
})
