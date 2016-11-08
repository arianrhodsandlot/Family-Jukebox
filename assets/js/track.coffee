---
---

getAudioByChannel = (channel) ->
  return new Promise (resolve, reject) ->
    worker = new Worker('/assets/js/worker.js')
    worker.postMessage channel: channel
    worker.addEventListener 'message', (message) ->
      resolve channel: channel, src: message.data
    worker.addEventListener 'error', (error) ->
      reject error


$ ->
  $audios = null
  $('.play').on 'click', ->
    _.each $audios, (audio) ->
      audio.play()
  $('.pause').on 'click', ->
    _.each $audios, (audio) ->
      audio.pause()
  $('.stop').on 'click', ->
    _.each $audios, (audio) ->
      audio.pause()
      audio.currentTime = 0

  Promise.all(_.map window.channels, (channel) ->
    getAudioByChannel(channel)
    .then (audio) ->
      $audio = $('<audio>')
      if $audios
        $audios.add $audio
      else
        $audios = $audio
      console.log audio
      _.assign $audio.get(0), audio.channel.config.audio, src: audio.src, controls: 'controls'
    ).then(->
      $('.players').append $audios

  )
