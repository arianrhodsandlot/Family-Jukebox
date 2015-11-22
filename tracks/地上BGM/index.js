window.requirejs.config({
  paths: {
    _: 'https://cdn.jsdelivr.net/lodash/3.10.1/lodash.min'
  }
})(

  ['_', '../../assets/instrument', '../../assets/init-track', 'channels/main', 'channels/noise'],

  function (_, Instrument, initTrack, main, noise) {
    var sampleRate = 44100
    var bpm = 400

    var sawtooth = Instrument('sawtooth').getWaveform()

    var instruments = [
      Instrument('square')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.4)
        .perform(main)
        .effect('fadeOut'),

      // Instrument('noise')
      //   .set('sampleRate', sampleRate)
      //   .set('bpm', bpm)
      //   .set('volume', 0.2)
      //   .perform(noise)
      //   .effect('fadeOut')
    ]

    initTrack(instruments)
  }
)
