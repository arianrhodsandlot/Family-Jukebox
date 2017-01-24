window.addEventListener('channelsLoaded', function (e) {
  var channels = e.detail

  var getAudioUrlByChannel = function (channel) {
    return new Promise(function (resolve, reject) {
      var worker = new Worker('../../assets/track-worker.js')
      worker.postMessage(channel)
      worker.addEventListener('message', function (e) {
        resolve(e.data)
      }, false)
    })
  }

  Promise.all(channels.map(getAudioUrlByChannel))
    .then(function (audios) {
      var players = audios.map(function (audio) {
        return new Howl({
          src: [audio.url],
          format: ['wav'],
          autoplay: false,
          loop: true,
          volume: audio.config.volume
        })
      })

      document.querySelector('.play').addEventListener('click', function () {
        players.forEach(function (player) {
          player.play()
        })
      })

      document.querySelector('.pause').addEventListener('click', function () {
        players.forEach(function (player) {
          player.pause()
        })
      })

      document.querySelector('.stop').addEventListener('click', function () {
        players.forEach(function (player) {
          player.stop()
        })
      })

      console.log('hi')
    })
}, false)
