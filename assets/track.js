window.addEventListener('DOMContentLoaded', function (e) {
  document.body.innerHTML = `
  <section class="cover">
    <img class="cover-img" src="cover.jpg"/>
  </section>
  <div class="loading">loading...</div>
  <section class="controllers" hidden>
    <button class="play" disabled>START</button>
    <button class="pause" disabled>PAUSE</button>
    <button class="stop" disabled>STOP</button>
    <a class="reset" href="../../">RESET</a>
  </section>
  <p class="info">Family Jukebox - arianrhod 2016</p>
  `

  document.body.appendChild(Object.assign(document.createElement('script'), {
    src: 'channels.js'
  }))

  window.addEventListener('channelsLoaded', function (e) {
    var channels = e.detail

    var getAudioUrlByChannel = function (channel) {
      return new Promise(function (resolve, reject) {
        var worker = new Worker('../../assets/track-worker.js')
        worker.postMessage(channel)
        worker.addEventListener('message', function (e) {
          setTimeout(function () {
            resolve(e.data)
          }, 0)
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

        var playButton = document.querySelector('.play')
        var pauseButton = document.querySelector('.pause')
        var stopButton = document.querySelector('.stop')

        playButton.disabled = false
        pauseButton.disabled = false
        stopButton.disabled = false

        playButton.addEventListener('click', function () {
          players.forEach(function (player) {
            player.play()
          })
        })

        pauseButton.addEventListener('click', function () {
          players.forEach(function (player) {
            player.pause()
          })
        })

        stopButton.addEventListener('click', function () {
          players.forEach(function (player) {
            player.stop()
          })
        })

        document.querySelector('.loading').hidden = true
        document.querySelector('.controllers').hidden = false
      })
  }, false)

})
