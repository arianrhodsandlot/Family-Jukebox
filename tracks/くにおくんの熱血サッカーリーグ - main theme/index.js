window.requirejs.config({
  paths: {
    _: 'https://cdn.jsdelivr.net/lodash/3.10.1/lodash.min'
  }
})(

  ['_', '../../assets/instrument', '../../assets/init-track',
  'channels/square1', 'channels/square2', 'channels/triangle', 'channels/noise'],

  function (_, Instrument, initTrack, square1, square2, triangle, noise) {
    var sampleRate = 44100
    var bpm = 300

    var instruments = [
      Instrument('square')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.2)
        .set('waveEndsBy', 0.8)
        .perform(square1),

      // Instrument('square')
      //   .set('sampleRate', sampleRate)
      //   .set('bpm', bpm)
      //   .set('volume', 0.2)
      //   .perform(square2),

      // Instrument('triangle')
      //   .set('sampleRate', sampleRate / 10)
      //   .set('bpm', bpm)
      //   .set('volume', 0.3)
      //   .set('fadeOut', {
      //     from: 0.8,
      //     to: 1
      //   })
      //   .perform(triangle),

      Instrument('noise')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.2)
        .perform(noise),
    ]

    initTrack(instruments)
  }
)
