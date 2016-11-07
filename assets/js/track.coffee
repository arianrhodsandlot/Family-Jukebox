---
---
audios = []

getAudioSrcByChannel = (channel) ->
  return new Promise (resolve, reject) ->
    worker = new Worker('/assets/js/worker.js')
    worker.postMessage channel: channel
    worker.addEventListener 'message', (message) ->
      audios.push message.data
      resolve()
    worker.addEventListener 'error', (error) ->
      reject error


$ ->
  Promise.all(_.map window.channels, getAudioSrcByChannel).then(->
    $audios = null
    _.each audios, (audio) ->
      $audio = $('<audio>')
      if $audios
        $audios.add $audio
      else
        $audios = $audio
      $audio.attr
        'src': audio
        controls: 'controls'
      return

    $('.players').append $audios
  )
