---
---
importScripts 'https://unpkg.com/lodash@4.16.6/lodash.min.js'

{% include_relative riffwave.coffee %}
{% include_relative instrument.coffee %}

self.addEventListener 'message', (message) ->
  channel = message.data.channel
  config = channel.config
  instrument = new Instrument config.instrument
  instrument.perform channel.notes
  self.postMessage instrument.riffwave.dataURI
  return
