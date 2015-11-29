window.requirejs.config({
  paths: {
    _: 'https://cdn.jsdelivr.net/lodash/3.10.1/lodash.min'
  }
})(

  ['_', '../../assets/instrument', '../../assets/init-track', 'channels/square1', 'channels/triangle'],

  function (_, Instrument, initTrack, square1, triangle) {
    var sampleRate = 44100
    var bpm = 260

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
        .set('volume', 0.2)
        .perform(square1)
        .effect('fadeOut'),

      Instrument('triangle')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.3)
        .set('fadeOut', {
          from: 0.8,
          to: 1
        })
        .perform(triangle)
        .effect('fadeOut')
    ]

    initTrack(instruments)
  }
)
