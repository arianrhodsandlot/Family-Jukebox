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

var waves = {}
waves.sine = (frequency, x) => 128 + 127 * Math.sin(x * 2 * Math.PI * frequency / sampleRateHz)
waves.square = (frequency, x) => 128 + 127 * Math.round(Math.sin(x * 2 * Math.PI * frequency / sampleRateHz))
waves.sawtooth = (frequency, x) => 255 / 100 * (x % (sampleRateHz / frequency))
waves.noise = _.partial(_.random, 0, 255)
waves.pulse = _.compose(x => x === 255 ? x : 0, Math.round, waves.sawtooth)

// yield A440 when input 0, yield a#(C4) when input is 1, etc
var getDataFromNoteCode = _.memoize(function(noteCode) {
  var frequency = 440 * Math.pow(2, noteCode / 12)
  return _.range(0, sampleRateHz / 8).map(_.compose(Math.floor, _.partial(waves.pulse, frequency)))
})

var data = getDataFromNoteCode(0)
var audio = createAudio(data)
document.body.appendChild(audio)
audio.play()
