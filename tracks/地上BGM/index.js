window.requirejs.config({
  paths: {
    _: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.min.js',
    Instrument: '../../libs/instrument'
  }
})(

  ['_', 'Instrument', 'channels/main', 'channels/noise'],

  function (_, Instrument, main, noise) {
    var sampleRate = 44100
    var bpm = 400

    var instruments = [
      Instrument(_.compose(
        function (x) {
          return x > 190 ? x : 0
        },
        Math.round,
        Instrument('sawtooth').getWaveform()
      ))
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.4)
        .perform(main)
        .effect('fadeOut'),

      Instrument('noise')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.2)
        .perform(noise)
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
