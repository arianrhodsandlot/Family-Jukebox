self.importScripts('https://cdn.jsdelivr.net/requirejs/2.1.20/require.min.js')
self.importScripts('require.config.js')

self.addEventListener('message', function (message) {
  require(['Instrument'],
    function (Instrument) {
      var channel = message.data.channel
      var config = channel.config

      var instrument = Instrument(channel.waveform)
        .set(config.instrument)
        .perform(channel.notes)

      var audio = _.merge({
          channelId: channel.id,
          src: instrument.riffwave.dataURI
        }, config.audio)

      self.postMessage({
        status: 'done',
        audio: audio
      })
    }
  )
})
