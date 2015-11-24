require.config({
  paths: {
    _: 'https://cdn.jsdelivr.net/lodash/3.10.1/lodash.min'
  }
})(

  ['_', '../../assets/instrument', '../../assets/init-track', 'channels/primary', 'channels/secondary', 'channels/drum'],

  function (_, Instrument, initTrack, primary, secondary, drum) {
    var sampleRate = 44100
    var bpm = 290

    var sawtooth = Instrument('sawtooth').getWaveform()

    var main = _.compose(
      function (y) {
        return y > 255 * 0.75 ? y : 0
      },
      Math.round,
      Instrument('sawtooth').getWaveform()
    )

    var zanmai = _.compose(
      function (y) {
        return y > 255 * 0.875 ? y : 0
      },
      Math.round,
      Instrument('sawtooth').getWaveform()
    )

    var instruments = [
      Instrument(main)
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.3)
        .set('waveEndsBy', 1)
        .set('fadeOut', {
          from: 0,
          to: 1.5
        })
        .perform(primary)
        .effect('fadeOut'),

      Instrument(zanmai)
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.23)
        .set('waveEndsBy', 0.6)
        .perform(secondary)
        .effect('fadeOut'),

      Instrument('noise')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.2)
        .perform(drum)
        .effect('fadeOut')
    ]

    initTrack(instruments)
  }
)
