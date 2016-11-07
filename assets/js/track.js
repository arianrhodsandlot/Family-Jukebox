var channels = _.map(manifest.channels, function (channel) {
  channel.id = _.uniqueId()
  return channel
})

var audios = []

$(function () {
  _.each(channels, function (channel) {
    var worker = new Worker('/assets/js/worker.js')
    worker.id = channel.id

    worker.postMessage({
      channel: channel
    })

    worker.addEventListener('message', function (message) {
      audios.push(message.data.audio)
    })

    worker.addEventListener('message', function (message) {
      if (_.size(audios) === _.size(manifest.channels)) {
        var $audios
        _.each(audios, function (audio) {
          var $audio = $('<audio>')
          if ($audios) {
            $audios.add($audio)
          } else {
            $audios = $audio
          }
          $audio.attr({'src': audio.src, controls: 'controls'})
        })
        $('.players').append($audios)
      }
    })

    worker.addEventListener('error', function (error) {
      console.error(error)
      console.error(error.message)
      // that.error = error
    })
  })
}, false)
