self.importScripts('http://requirejs.org/docs/release/2.1.22/minified/require.js')
self.importScripts('/assets/js/require.config.js')

self.addEventListener('message', function (message) {
  require(['Instrument'],
    function (Instrument, channel) {
      var instrument = Instrument(message.data.channel.waveform)
        .set(message.data.channel.config.instrument)
        .perform(message.data.channel.notes)

      var audio = _.merge({
          channelId: message.data.channel.id,
          src: instrument.riffwave.dataURI
        }, message.data.channel.config.audio)

      self.postMessage({
        status: 'done',
        audio: audio
      })
    }
  )
})
