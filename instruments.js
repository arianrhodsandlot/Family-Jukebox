var sampleRateHz = 44100

var createAudio = function(data) {
  var audio = new Audio()
  var wave = new RIFFWAVE()
  wave.header.sampleRate = sampleRateHz
  wave.Make(data)
  _.assign(audio, {
    src: wave.dataURI,
    controls: true,
    loop: true
  })
  return audio
}

var getDataFromNoteCode = function(noteCode) {
  return _.range(0, sampleRateHz / 8)
    .map(
      _.compose(
        Math.floor,
        i => 128 + 127 * Math.sin(i * 2 * Math.PI * noteCode / sampleRateHz)
      )
    )
}

var Instruments = function(baseFreq) {
  var speed = 8

  var getDataFromNotes = function(notes) {
    return _.range(0, notes.length / speed * sampleRateHz)
      .map(_.flow(
        x => x / (notes.length / speed * sampleRateHz / notes.length),
        Math.round,
        baseFreq
      ))
      .map(function(x, i) {
        return x * i
      })
      .map(_.flow(
        Math.sin,
        Math.round,
        x => x * 32 + 64
      ))
  }
  this.play = _.compose(createAudio, getDataFromNotes)
}

Instruments.wood = new Instruments(_.memoize(function(index) {
  return Math.PI * 880 * Math.pow(2, (notes[index] - 69) / 12) / sampleRateHz
}))

Instruments.keyboard = new Instruments(_.memoize(function(index) {
  return Math.PI * 1000 * Math.pow(2, (notes[index] - 69) / 12) / sampleRateHz
}))
