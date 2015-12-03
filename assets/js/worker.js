self.importScripts('http://requirejs.org/docs/release/2.1.22/minified/require.js')
self.importScripts('/assets/js/require.config.js')

self.addEventListener('message', function (message) {
  require(['Instrument'],
    function (Instrument, channel) {
      var instrument = Instrument(message.data.channel.waveform)
        .set(message.data.channel.config)
        .perform(message.data.channel.notes)

      self.postMessage({
        status: 'done',
        source: instrument.riffwave.dataURI
      })
    }
  )
})
