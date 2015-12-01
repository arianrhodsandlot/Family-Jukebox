importScripts('https://cdn.jsdelivr.net/requirejs/2.1.20/require.min.js')

require.config({
  paths: {
    _: 'https://cdn.jsdelivr.net/lodash/3.10.1/lodash.min'
  }
})(

  ['_', '../../../assets/instrument', '../channels/noise'],

  function (_, Instrument, noise) {
    var square1wav = Instrument('noise')
      .set('bpm', 300)
      .set('waveEndsBy', 0.75)
      .perform(noise)

      postMessage(square1wav.riffwave.dataURI)
  }
)
