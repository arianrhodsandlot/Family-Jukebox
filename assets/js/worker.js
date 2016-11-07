importScripts('https://unpkg.com/lodash@4.16.6/lodash.min.js')
importScripts('/assets/js/instrument.js')
importScripts('/assets/js/riffwave.js')

self.addEventListener('message', function (message) {
  var channel = message.data.channel
  var config = channel.config

  var instrument = Instrument(channel.waveform)
    .set(config.instrument)
    .perform(channel.notes)

  var audio = Object.assign({
    channelId: channel.id,
    src: instrument.riffwave.dataURI
  }, config.audio)

  self.postMessage({
    status: 'done',
    audio: audio
  })
})
