class Instrument
  baseFrequency: 440

  constructor: (@options) ->
    @options = _.defaults @options,
      waveform: null
      sampleRate: 44100
      bpm: 120
      waveEndsBy: 0.95
      fadeOut: null

    @baseTime = @options.sampleRate * 60 / @options.bpm
    @waveform = @getWaveform()

  getWaveform: ->
    return @.options.waveform if _.isFunction(@.options.waveform)

    sampleRate = @options.sampleRate

    waveforms =
      sine: (frequency, x) ->
        128 - 127 * Math.sin((x - frequency / sampleRate / 4) * 2 * Math.PI * frequency / sampleRate)
      sawtooth: (frequency, x) ->
        255 * (x % Math.round(sampleRate / frequency)) / Math.round(sampleRate / frequency)
      noise: _.partial(_.random, 0, 255)

    _.assign waveforms,
      'square?d=0.875': _.flow waveforms.sawtooth, Math.round, (y) ->
        if y > 255 * 0.875 then y else 0
      'square?d=0.75': _.flow waveforms.sawtooth, Math.round, (y) ->
        if y > 255 * 0.75 then y else 0
      'square?d=0.5': _.flow waveforms.sawtooth, Math.round, (y) ->
        if y > 255 * 0.5 then y else 0
      'square?d=0.25': _.flow waveforms.sawtooth, Math.round, (y) ->
        if y > 255 * 0.25 then y else 0
      'square?d=0.125': _.flow waveforms.sawtooth, Math.round, (y) ->
        if y > 255 * 0.125 then y else 0
      triangle: _.flow waveforms.sawtooth, Math.round, (y) ->
        if y < 255 / 2 then y * 2 else (255 - y) * 2

    _.assign waveforms,
      square: waveforms['square?d=0.5']

    if _.isFunction(@options.waveform) then @options.waveform else _.get(waveforms, @options.waveform) or waveforms.noise

  createWave: (data) ->
    @riffwave = new RIFFWAVE
    @riffwave.header.sampleRate = @options.sampleRate
    @riffwave.Make data
    @

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
    @

  processWaveform: (note) ->
    note = [note, 1] if !_.isArray(note)
    return _.constant(0) if _.isNull(note[0])
    number = _.first(note)
    frequency = @baseFrequency * 2 ** (number / 12)
    _.partial @waveform, frequency

  getMoments: (note) ->
    note = [note, 1] if typeof note is 'number'
    length = if note and note[1] then note[1] else 1
    time = length * @baseTime
    _.range(0, time)

  perform: (notes) ->
    end = @baseTime * (1 - @options.waveEndsBy)

    data = _(notes).map _.memoize (note) =>
      moments = @getMoments note
      f = _.flow(@processWaveform(note), Math.round)
      _.map moments, (__, x) =>
        y = f(x)
        if @options.fadeOut
          from = @options.fadeOut.from
          to = @options.fadeOut.to
          xPos = x / moments.length
          if xPos > from and xPos < to
            y *= (to - xPos) / (to - from)

        time = moments.length
        remain = time - x
        if remain >= end then y else y * remain / time
    .flatten().value()
    @createWave data
    @createUrl()

@Instrument = Instrument
