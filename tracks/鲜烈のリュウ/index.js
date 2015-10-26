require.config({
  paths: {
    _: 'https://cdn.jsdelivr.net/lodash/3.10.1/lodash.min.js',
    Instrument: '../../libs/instrument'
  }
})(

  ['_', 'Instrument', 'channels/primary', 'channels/secondary', 'channels/drum'],

  function (_, Instrument, primary, secondary, drum) {
    var sampleRate = 44100
    var bpm = 290

    var main = _.compose(
      function (x) {
        return x > 190 ? x : 0
      },
      Math.round,
      Instrument('sawtooth').getWaveform()
    )

    var zanmai = _.compose(
      function (x) {
        return x > 220 ? x : 0
      },
      Math.round,
      Instrument('sawtooth').getWaveform()
    )

    var instruments = [
      Instrument(main)
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.4)
        .perform(primary)
        .effect('fadeOut'),

      Instrument(zanmai)
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.2)
        .perform(secondary)
        .effect('fadeOut'),

      Instrument('noise')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.2)
        .perform(drum)
        .effect('fadeOut')
    ]

    var audios = _.pluck(instruments, 'audio')

    var status = document.getElementById('status')
    var players = document.getElementById('players')

    _.map(audios, function (audio) {
      players.appendChild(audio)
    })

    status.parentNode.removeChild(status)

    _.defer(function () {
      _.map(instruments, function (instrument) {
        instrument.play()
      })
    })
  }
)
