window.requirejs.config({
  paths: {
    _: 'https://cdn.jsdelivr.net/lodash/3.10.1/lodash.min'
  }
})(

  ['_', '../../assets/instrument', 'channels/demo'],

  function (_, Instrument, demo) {
    var sampleRate = 44100
    var bpm = 280

    var accordion = _.compose(
      function (x) {
        return x > 123 ? x : 0
      },
      Math.round,
      Instrument('sawtooth').getWaveform()
    )

    var instruments = [
      Instrument('square')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .perform(demo),

      Instrument('sawtooth')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .perform(demo),

      Instrument('pulse')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .perform(demo),

      Instrument(accordion)
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .perform(demo)
    ]

    var audios = _.pluck(instruments, 'audio')

    var status = document.getElementById('status')
    var players = document.getElementById('players')

    _.map(audios, function (audio) {
      players.appendChild(audio)
    })

    status.parentNode.removeChild(status)
  }

)
