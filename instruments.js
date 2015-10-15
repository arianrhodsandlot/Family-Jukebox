var Instrument = function(type) {
  var instrument = this.constructor === Instrument ?
    this :
    new Instrument(type)

  return _.assign(instrument, {
    type,
    options: {
      sampleRate: 44100,
      bpm: 120,
      volume: .5,
      loop: false,
      autoplay: false
    }
  })
}

_.assign(Instrument.prototype, {
  getWave: function() {
    var sampleRate = this.options.sampleRate

    var waves = {
      sine: (frequency, x) => 128 + 127 * Math.sin(x * 2 * Math.PI * frequency / sampleRate),
      square: (frequency, x) => 128 + 127 * Math.round(Math.sin(x * 2 * Math.PI * frequency / sampleRate)),
      sawtooth: (frequency, x) => 255 / 100 * (x % (sampleRate / frequency)),
      noise: _.partial(_.random, 0, 255)
    };
    waves.pulse = _.compose(x => x === 255 ? x : 0, Math.round, waves.sawtooth)

    return _.get(waves, this.type) || waves.noise
  },

  set: function() {
    var options = _.isString(_.first(arguments)) ?
      _.set({}, _.first(arguments), _.last(arguments)) : _.first(arguments)
    _.assign(this.options, options)
    return this
  },

  enable: function(option) {
    return this.set(option, true)
  },

  disable: function(option) {
    return this.set(option, false)
  },

  createAudio: function(data) {
    var wave = new RIFFWAVE()
    wave.header.sampleRate = this.options.sampleRate
    wave.Make(data)

    this.audio = new Audio()

    return _.assign(this.audio, {
      src: wave.dataURI,
      controls: true,
      loop: this.options.loop,
      volume: this.options.volume,
      autoplay: this.options.autoplay
    })
  },

  // yield A440 when input 0, yield a#(C4) when input is 1, etc
  perform: function(notes) {
    var data = _(notes)
      .map(_.memoize(noteCode => {
        var x = _.range(0, this.options.sampleRate * 60 / this.options.bpm)

        var y = noteCode || noteCode === 0 ?
          _.compose(
            Math.floor,
            _.partial(
              this.getWave(),
              frequency = 440 * Math.pow(2, noteCode / 12)
            )
          ) :
          _.constant(0)

        return _.map(x, y)
      }))
      .flatten()
      .value()

    this.createAudio(data)

    return this
  }

})
