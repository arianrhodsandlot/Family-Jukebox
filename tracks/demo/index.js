require.config({
  paths: {
    _: 'http://cdn.bootcss.com/lodash.js/3.10.1/lodash.min',
    Instrument: '../../libs/instrument'
  }
})(

  ['_', 'Instrument', 'channels/sawtooth', 'channels/pulse', 'channels/noise'],

  function(_, Instrument, sawtooth, pulse, noise) {
    var sampleRate = 44100
    var bpm = 280

    var accordion = _.compose(
      function(x) {
        return x > 123 ? x : 0
      },
      Math.round,
      Instrument('sawtooth').getWaveform()
    )

    var instruments = [
      Instrument('square')
      .set('sampleRate', sampleRate)
      .set('bpm', bpm)
      .perform(pulse)
    ]

    var audios = _.pluck(instruments, 'audio')

    var status = document.getElementById('status')
    var players = document.getElementById('players')

    _.map(audios, function(audio) {
      players.appendChild(audio)
    })

    status.parentNode.removeChild(status)

    _.defer(function() {
      _.map(instruments, function(instrument) {
        instrument.play()
      })
    })
  }

)
