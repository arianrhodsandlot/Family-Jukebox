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


// sine
// yield A440 when input 0, yield a#(C4) when input is 1, etc
var getDataFromNoteCode = _.memoize(function(noteCode) {
  var hz = 440 * Math.pow(2, noteCode / 12)
  return _.range(0, sampleRateHz / 8)
    .map(
      _.compose(
        Math.floor,
        i => 128 + 127 * Math.sin(i * 2 * Math.PI * hz / sampleRateHz)
      )
    )
})

var audio = createAudio(getDataFromNoteCode())
document.body.appendChild(audio)
audio.play()
