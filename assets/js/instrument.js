define(['_', 'RIFFWAVE'], function (_, RIFFWAVE) {
  var Instrument = function (waveform) {
    var instrument = this.constructor === Instrument
      ? this
      : new Instrument(waveform)

    return _.assign(instrument, {
      waveform: waveform,
      options: {
        sampleRate: 44100,
        bpm: 120,
        waveEndsBy: 0.95,
        fadeOut: null
      }
    })
  }

  _.assign(Instrument.prototype, {
    baseFrequency: 440,

    getWaveform: function () {
      var sampleRate = this.options.sampleRate

      var waveforms = {
        sine: function (frequency, x) {
          return 128 - 127 * Math.sin((x - frequency / sampleRate / 4) * 2 * Math.PI * frequency / sampleRate)
        },
        square: function (frequency, x) {
          return 128 - 127 * Math.round(Math.sin(x * 2 * Math.PI * frequency / sampleRate))
        },
        sawtooth: function (frequency, x) {
          return 255 * (x % Math.round(sampleRate / frequency)) / Math.round(sampleRate / frequency)
        },
        noise: _.partial(_.random, 0, 255)
      }
      waveforms.triangle = _.compose(
        function (y) {
          return (y < 255 / 2) ? y * 2 : (255 - y) * 2
        },
        Math.round,
        waveforms.sawtooth
      )
      waveforms.pulse = _.compose(
        function (y) {
          return y > 254 ? y : 0
        },
        Math.round,
        waveforms.square
      )

      return _.isFunction(this.waveform)
        ? this.waveform
        : _.get(waveforms, this.waveform) || waveforms.noise
    },

    get: function (key) {
      return _.get(this, key)
    },

    getAudio: function () {
      return _.get(this, 'audio')
    },

    set: function () {
      var options = _.isString(_.first(arguments))
        ? _.set({}, _.first(arguments), _.last(arguments))
        : _.first(arguments)
      _.assign(this.options, options)
      return this
    },

    enable: function (option) {
      return this.set(option, true)
    },

    disable: function (option) {
      return this.set(option, false)
    },

    effect: function (effect) {
      var effectFunction
      var that = this

      if (!this.audio) {
        console.error('cannot process audio in web worker...')
      } else if (_.isArray(effect)) {
        _.forEach(effect, function (effect) {
          that.effect(effect)
        })
      } else if (_.isFunction(effect)) {
        this.audio.addEventListener('timeupdate', _.bind(effect, this), false)
      } else if (_.isString(effect)) {
        switch (effect) {
          case 'fadeOut':
            effectFunction = function () {
              var volume = this.options.volume
              var remain = this.audio.duration - this.audio.currentTime
              var mutePoint = 2
              var muteTime = 5

              this.audio.volume = remain < mutePoint + muteTime
                ? _.max([
                  volume * (remain - mutePoint) / muteTime,
                  0
                ])
                : volume
            }
            break
        }

        this.effect(effectFunction)
      }

      return this
    },

    createWave: function (data) {
      this.riffwave = new RIFFWAVE()
      this.riffwave.header.sampleRate = this.options.sampleRate
      this.riffwave.Make(data)

      if (typeof Audio === 'function') {
        this.audio = new Audio()
        _.assign(this.audio, {
          src: this.riffwave.dataURI,
          controls: true,
          loop: this.options.loop,
          volume: this.options.volume,
          autoplay: this.options.autoplay
        })
      }

      return this
    },

    // yield A440 when input 0, yield a#(C4) when input is 1, etc
    perform: function (notes) {
      var that = this
      var baseTime = this.options.sampleRate * 60 / this.options.bpm
      var getMoments = _.memoize(function (note) {
        if (_.isNumber(note)) {
          note = [note, 1]
        }
        var length = _.last(note) || 1
        var time = length * baseTime
        return _.range(0, time)
      })

      var processWaveform = function (note) {
        if (!_.isArray(note)) {
          note = [note, 1]
        }

        if (_.isNull(note[0])) {
          return _.constant(0)
        }

        var waveform = that.getWaveform()
        var number = _.first(note)
        var frequency = that.baseFrequency * Math.pow(2, number / 12)

        return _.partial(waveform, frequency)
      }

      var data = _(notes)
        .map(_.memoize(function (note) {
          var moments = getMoments(note)
          var f = _.compose(Math.round, processWaveform(note))
          return _.map(moments, function (x) {
            var xPos = x / moments.length
            var y = f(x)

            if (that.options.fadeOut) {
              var from = that.options.fadeOut.from
              var to = that.options.fadeOut.to
              if (xPos > from && xPos < to) {
                y *= (to - xPos) / (to - from)
              }
            }

            y = moments.length - x >= baseTime * (1 - that.options.waveEndsBy)
              ? y
              : y * (moments.length - x) / moments.length

            return y
          })
        }))
        .flatten()
        .value()

      this.createWave(data)

      return this
    },

    play: function () {
      this.audio.play()
      return this
    },

    pause: function () {
      this.audio.pause()
      return this
    },

    stop: function () {
      this.pause().audio.currentTime = 0
      return this
    }

  })

  return Instrument
})
