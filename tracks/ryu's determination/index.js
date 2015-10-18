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

    var instruments = [
      Instrument('sawtooth')
      .set('sampleRate', sampleRate)
      .set('bpm', bpm)
      .set('volume', .3)
      .perform(sawtooth),

      Instrument('pulse')
      .set('sampleRate', sampleRate)
      .set('bpm', bpm)
      .set('volume', .2)
      .perform(pulse),

      Instrument('noise')
      .set('sampleRate', sampleRate)
      .set('bpm', bpm)
      .set('volume', .1)
      .perform(noise)
    ]

    var audios = _.pluck(instruments, 'audio')

    var status = document.getElementById('status')
    var players = document.getElementById('players')

    _.map(audios, function(audio) {
      audio.style.display = 'block'
      players.appendChild(audio)
    })

    status.parentNode.removeChild(status)

    _.defer(function() {
      _.map(audios, function(audio) {
        audio.play()
      })
    })
  }

)
