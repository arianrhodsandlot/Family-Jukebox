$(function() {
  var $audios, getAudioByChannel
  $('.play').on('click', function() {
    _.each($audios, function(audio) {
      audio.play()
    })
  })
  $('.pause').on('click', function() {
    _.each($audios, function(audio) {
      audio.pause()
    })
  })
  $('.stop').on('click', function() {
    _.each($audios, function(audio) {
      audio.pause()
      audio.currentTime = 0
    })
  })
  getAudioByChannel = function(channel) {
    new Promise(function(resolve, reject) {
      var worker
      worker = new Worker('/assets/js/worker.js')
      worker.postMessage({
        channel: channel
      })
      worker.addEventListener('message', function(message) {
        resolve({
          channel: channel,
          src: message.data
        })
      })
      worker.addEventListener('error', function(error) {
        reject(error)
      })
    })
  }
  $audios = null
  return Promise.all(_.map(window.channels, function(channel) {
    return getAudioByChannel(channel).then(function(audio) {
      var $audio
      $audio = $('<audio>')
      if ($audios) {
        $audios.add($audio)
      } else {
        $audios = $audio
      }
      return _.assign($audio.get(0), audio.channel.config.audio, {
        src: audio.src,
        controls: 'controls'
      })
    }).then(function() {
      return $('.players').append($audios)
    })
  }))
})
