require.config({
  paths: {
    _: 'https://cdn.jsdelivr.net/lodash/3.10.1/lodash.min'
  }
})(

  ['_', '../../assets/instrument', '../../assets/init-track',
  'channels/square1', 'channels/square2', 'channels/triangle', 'channels/noise'],

  function (_, Instrument, initTrack, square1, square2, triangle, noise) {
    var sampleRate = 44100
    var bpm = 290

    var sawtooth = Instrument('sawtooth').getWaveform()

    var instruments = [
      Instrument(_.compose(
        function (y) {
          return y > 255 * 0.75 ? y : 0
        },
        Math.round,
        sawtooth
      ))
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.3)
        .set('waveEndsBy', 1)
        .set('fadeOut', {
          from: 0.6,
          to: 1.8
        })
        .perform(square1)
        .effect('fadeOut'),

      Instrument(_.compose(
        function (y) {
          return y > 255 * 0.875 ? y : 0
        },
        Math.round,
        sawtooth
      ))
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.3)
        .set('waveEndsBy', 0.3)
        .perform(square2)
        .effect('fadeOut'),

      Instrument('triangle')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.1)
        .perform(triangle)
        .effect('fadeOut'),

      Instrument('noise')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.1)
        .set('fadeOut', {
          from: 0,
          to: 0.7
        })
        .perform(noise)
        .effect('fadeOut')
    ]

    initTrack(instruments)
  }
)
