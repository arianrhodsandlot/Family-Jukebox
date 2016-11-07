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
    src: getSrc(instrument.riffwave.dataURI)
  }, config.audio)

  self.postMessage({
    status: 'done',
    audio: audio
  })
})

function getSrc(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return URL.createObjectURL(blob);

  // Old code
  // var bb = new BlobBuilder();
  // bb.append(ab);
  // return bb.getBlob(mimeString);
}
