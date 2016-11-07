---
---
Instrument = (waveform) ->
  instrument = if @constructor == Instrument then this else new Instrument(waveform)
  _.assign instrument,
    waveform: waveform
    options:
      sampleRate: 44100
      bpm: 120
      waveEndsBy: 0.95
      fadeOut: null

_.assign Instrument.prototype,
  baseFrequency: 440
  getWaveform: ->
    sampleRate = @options.sampleRate
    waveforms =
      sine: (frequency, x) ->
        128 - (127 * Math.sin((x - (frequency / sampleRate / 4)) * 2 * Math.PI * frequency / sampleRate))
      sawtooth: (frequency, x) ->
        255 * x % Math.round(sampleRate / frequency) / Math.round(sampleRate / frequency)
      noise: _.partial(_.random, 0, 255)
    _.assign waveforms,
      'square?d=0.875': _.flowRight(((y) ->
        if y > 255 * 0.875 then y else 0
      ), Math.round, waveforms.sawtooth)
      'square?d=0.75': _.flowRight(((y) ->
        if y > 255 * 0.75 then y else 0
      ), Math.round, waveforms.sawtooth)
      'square?d=0.5': _.flowRight(((y) ->
        if y > 255 * 0.5 then y else 0
      ), Math.round, waveforms.sawtooth)
      'square?d=0.25': _.flowRight(((y) ->
        if y > 255 * 0.25 then y else 0
      ), Math.round, waveforms.sawtooth)
      'square?d=0.125': _.flowRight(((y) ->
        if y > 255 * 0.125 then y else 0
      ), Math.round, waveforms.sawtooth)
      triangle: _.flowRight(((y) ->
        if y < 255 / 2 then y * 2 else (255 - y) * 2
      ), Math.round, waveforms.sawtooth)
    _.set waveforms, 'square', waveforms['square?d=0.5']
    if _.isFunction(@waveform) then @waveform else _.get(waveforms, @waveform) or waveforms.noise
  get: (key) ->
    _.get this, key
  set: ->
    options = if _.isString(_.first(arguments)) then _.set({}, _.first(arguments), _.last(arguments)) else _.first(arguments)
    _.assign @options, options
    this
  enable: (option) ->
    @set option, true
  disable: (option) ->
    @set option, false
  createWave: (data) ->
    @riffwave = new RIFFWAVE
    @riffwave.header.sampleRate = @options.sampleRate
    @riffwave.Make data
    this
  createUrl: ->
    splited = @riffwave.dataURI.split(',')
    byteString = atob(splited[1])
    mimeString = splited[0].split(':')[1].split(';')[0]
    ab = new ArrayBuffer(byteString.length)
    ia = new Uint8Array(ab)
    i = 0
    while i < byteString.length
      ia[i] = byteString.charCodeAt(i)
      i++
    blob = new Blob([ ab ], type: mimeString)
    @url = URL.createObjectURL(blob)
    this
  perform: (notes) ->
    that = this
    baseTime = @options.sampleRate * 60 / @options.bpm
    getMoments = _.memoize((note) ->
      if _.isNumber(note)
        note = [
          note
          1
        ]
      length = _.last(note) or 1
      time = length * baseTime
      _.range 0, time
    )

    processWaveform = (note) ->
      if !_.isArray(note)
        note = [
          note
          1
        ]
      if _.isNull(note[0])
        return _.constant(0)
      waveform = that.getWaveform()
      number = _.first(note)
      frequency = that.baseFrequency * 2 ** (number / 12)
      _.partial waveform, frequency

    data = _(notes).map(_.memoize((note) ->
      moments = getMoments(note)
      f = _.flowRight(Math.round, processWaveform(note))
      _.map moments, (x) ->
        xPos = x / moments.length
        y = f(x)
        if that.options.fadeOut
          from = that.options.fadeOut.from
          to = that.options.fadeOut.to
          if xPos > from and xPos < to
            y *= (to - xPos) / (to - from)
        y = if moments.length - x >= baseTime * (1 - (that.options.waveEndsBy)) then y else y * (moments.length - x) / moments.length
        y
    )).flatten().value()
    @createWave(data).createUrl()
    this

@Instrument = Instrument
