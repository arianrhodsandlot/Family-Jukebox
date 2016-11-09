var Instrument


var Instrument = function (options) {
  this.options = options
  this.options = _.defaults(this.options, {
    waveform: null,
    sampleRate: 44100,
    bpm: 120,
    waveEndsBy: 0.95,
    fadeOut: null
  })
  this.baseTime = this.options.sampleRate * 60 / this.options.bpm
  this.waveform = this.getWaveform()
}

Instrument.prototype.baseFrequency = 440

Instrument.prototype.getWaveform = function() {
  var sampleRate, waveforms
  if (_.isFunction(this.options.waveform)) {
    return this.options.waveform
  }
  sampleRate = this.options.sampleRate
  waveforms = {
    sine: function(frequency, x) {
      return 128 - 127 * Math.sin((x - frequency / sampleRate / 4) * 2 * Math.PI * frequency / sampleRate)
    },
    sawtooth: function(frequency, x) {
      return 255 * (x % Math.round(sampleRate / frequency)) / Math.round(sampleRate / frequency)
    },
    noise: _.partial(_.random, 0, 255)
  }
  _.assign(waveforms, {
    'square?d=0.875': _.flow(waveforms.sawtooth, Math.round, function(y) {
      if (y > 255 * 0.875) {
        return y
      } else {
        return 0
      }
    }),
    'square?d=0.75': _.flow(waveforms.sawtooth, Math.round, function(y) {
      if (y > 255 * 0.75) {
        return y
      } else {
        return 0
      }
    }),
    'square?d=0.5': _.flow(waveforms.sawtooth, Math.round, function(y) {
      if (y > 255 * 0.5) {
        return y
      } else {
        return 0
      }
    }),
    'square?d=0.25': _.flow(waveforms.sawtooth, Math.round, function(y) {
      if (y > 255 * 0.25) {
        return y
      } else {
        return 0
      }
    }),
    'square?d=0.125': _.flow(waveforms.sawtooth, Math.round, function(y) {
      if (y > 255 * 0.125) {
        return y
      } else {
        return 0
      }
    }),
    triangle: _.flow(waveforms.sawtooth, Math.round, function(y) {
      if (y < 255 / 2) {
        return y * 2
      } else {
        return (255 - y) * 2
      }
    })
  })
  _.assign(waveforms, {
    square: waveforms['square?d=0.5']
  })
  if (_.isFunction(this.options.waveform)) {
    return this.options.waveform
  } else {
    return _.get(waveforms, this.options.waveform) || waveforms.noise
  }
}

Instrument.prototype.createWave = function(data) {
  this.riffwave = new RIFFWAVE
  this.riffwave.header.sampleRate = this.options.sampleRate
  this.riffwave.Make(data)
  return this
}

Instrument.prototype.createUrl = function() {
  var ab, blob, byteString, i, ia, mimeString, splited
  splited = this.riffwave.dataURI.split(',')
  byteString = atob(splited[1])
  mimeString = splited[0].split(':')[1].split('')[0]
  ab = new ArrayBuffer(byteString.length)
  ia = new Uint8Array(ab)
  i = 0
  while (i < byteString.length) {
    ia[i] = byteString.charCodeAt(i)
    i++
  }
  blob = new Blob([ab], {
    type: mimeString
  })
  this.url = URL.createObjectURL(blob)
  return this
}

Instrument.prototype.processWaveform = function(note) {
  var frequency, number
  if (!_.isArray(note)) {
    note = [note, 1]
  }
  if (_.isNull(note[0])) {
    return _.constant(0)
  }
  number = _.first(note)
  frequency = this.baseFrequency * Math.pow(2, number / 12)
  return _.partial(this.waveform, frequency)
}

Instrument.prototype.getMoments = function(note) {
  var length, time
  if (typeof note === 'number') {
    note = [note, 1]
  }
  length = note && note[1] ? note[1] : 1
  time = length * this.baseTime
  return _.range(0, time)
}

Instrument.prototype.perform = function(notes) {
  var data, end
  end = this.baseTime * (1 - this.options.waveEndsBy)
  data = _(notes).map(_.memoize((function(_this) {
    return function(note) {
      var f, moments
      moments = _this.getMoments(note)
      f = _.flow(_this.processWaveform(note), Math.round)
      return _.map(moments, function(__, x) {
        var from, remain, time, to, xPos, y
        y = f(x)
        if (_this.options.fadeOut) {
          from = _this.options.fadeOut.from
          to = _this.options.fadeOut.to
          xPos = x / moments.length
          if (xPos > from && xPos < to) {
            y *= (to - xPos) / (to - from)
          }
        }
        time = moments.length
        remain = time - x
        if (remain >= end) {
          return y
        } else {
          return y * remain / time
        }
      })
    }
  })(this))).flatten().value()
  this.createWave(data)
  return this.createUrl()
}

this.Instrument = Instrument
