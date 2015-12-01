importScripts('https://cdn.jsdelivr.net/requirejs/2.1.20/require.min.js')

require.config({
  paths: {
    _: 'https://cdn.jsdelivr.net/lodash/3.10.1/lodash.min'
  }
})(

  ['_', '../../../assets/instrument', '../channels/triangle'],

  function (_, Instrument, triangle) {
    var square1wav = Instrument('triangle')
      .set('bpm', 300)
      .set('waveEndsBy', 0.75)
      .perform(triangle)

      postMessage(square1wav.riffwave.dataURI)
  }
)
