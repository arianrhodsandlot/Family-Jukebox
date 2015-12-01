importScripts('https://cdn.jsdelivr.net/requirejs/2.1.20/require.min.js')

require.config({
  paths: {
    _: 'https://cdn.jsdelivr.net/lodash/3.10.1/lodash.min'
  }
})(

  ['_', '../../../assets/instrument', '../channels/square1'],

  function (_, Instrument, square1) {
    var square1wav = Instrument('square')
      .set('bpm', 300)
      .set('waveEndsBy', 0.75)
      .perform(square1)

      postMessage(square1wav.riffwave.dataURI)
  }
)
