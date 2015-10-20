require.config({
  paths: {
    _: 'http://cdn.bootcss.com/lodash.js/3.10.1/lodash.min',
    Instrument: '../../libs/instrument'
  }
})(

  ['_', 'Instrument', 'channels/sawtooth', 'channels/square', 'channels/pulse', 'channels/noise'],

  function(_, Instrument, sawtooth, square, pulse, noise) {
    var sampleRate = 44100
    var bpm = 680

    var instruments = [
      Instrument('sawtooth')
      .set('sampleRate', sampleRate)
      .set('bpm', bpm)
      .set('volume', .2)
      .perform(sawtooth),

      Instrument('square')
      .set('sampleRate', sampleRate)
      .set('bpm', bpm)
      .set('volume', .3)
      .perform(square),

      Instrument('pulse')
      .set('sampleRate', sampleRate)
      .set('bpm', bpm)
      .set('volume', .3)
      .perform(pulse),

      Instrument('noise')
      .set('sampleRate', sampleRate)
      .set('bpm', bpm)
      .set('volume', .1)
      .perform(noise)
    ]

    var status = document.getElementById('status')
    var players = document.getElementById('players')

    _.map(instruments, function(instrument) {
      players.appendChild(instrument.audio)
    })

    status.parentNode.removeChild(status)

    _.defer(function() {
      _.map(instruments, function(instrument) {
        instrument.play()
        setTimeout(()=>console.log(instrument.audio.duration), 1000)
      })
    })
  }

)
