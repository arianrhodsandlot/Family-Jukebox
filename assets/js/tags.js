define(['_', 'riot', 'text!/assets/html/track.tag!strip'], function (_, riot, track) {
  return [
    riot.tag('title', '{ opts.title }'),

    riot.tag('track', track, function (title) {
      var that = this

      this.title = title
      this.status = 'loading'
      this.sources = []
      this.audios = null
      this.progress = 0.2

      this.error = function () {
        that.status = 'error'
        that.update()
        return that
      }

      this.load = function (sources) {
        var loadedAudioCount = 0

        var oncanplaythrough = function (e) {
          loadedAudioCount += 1
          that.progress = 0.8 + loadedAudioCount * (1 - 0.8) / that.audios.length

          if (loadedAudioCount === that.audios.length) {
            that.status = 'canplaythrough'
          }

          if (that.progress >= 1) {
            _.each(that.audios, function (audio) {
              audio.removeEventListener('canplaythrough', oncanplaythrough, false)
            })
          }

          that.update()
        }

        that.status = 'loaded'
        that.sources = sources
        that.audios = that.root.getElementsByTagName('audio')
        that.progress = 0.8

        that.update()

        _.each(that.audios, function (audio) {
          audio.addEventListener('canplaythrough', oncanplaythrough, false)
        })

        return that
      }

      this.syncAudioCurrentTime = function (currentTime) {
        var currentTime = _.isUndefined(currentTime)
          ? _.first(that.audios).currentTime
          : currentTime
        _.each(that.audios, function (audio) {
          audio.currentTime = currentTime
        })
        return that
      }

      this.play = function () {
        that.syncAudioCurrentTime()
        _.each(that.audios, function (audio) {
          audio.play()
        })
        return that
      }

      this.pause = function () {
        _.each(that.audios, function (audio) {
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
