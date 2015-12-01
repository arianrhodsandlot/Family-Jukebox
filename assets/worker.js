self.importScripts('https://cdn.jsdelivr.net/requirejs/2.1.20/require.min.js')

require.config({
  paths: {
    _: 'https://cdn.jsdelivr.net/lodash/3.10.1/lodash.min',
    RIFFWAVE: 'riffwave.amd',
    Instrument: 'instrument'
  }
})

self.addEventListener('message', function (message) {
  var config = message.data.config
  var track = message.data.track
  var channel = message.data.channel

  require(
    ['Instrument', '../tracks/' + track + '/notes/' + channel.name],
    function (Instrument, notes) {
      var instrument = Instrument(channel.waveform).set(config).perform(notes)

      self.postMessage({
        status: 'done',
        source: instrument.riffwave.dataURI
      })
    }
  )
})
