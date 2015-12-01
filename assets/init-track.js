define(
  ['_', 'jquery'],
  function (_, $) {
    return function (sources) {
      var $audios = _(sources)
        .map(function (source) {
          var audio = new Audio()
          return _.assign(audio, {
            src: source,
            controls: true,
            loop: false,
            volume: 0.2,
            autoplay: false
          })
        })
        .map($)
        .reduce(function ($audios, audio) {
          return _.bind($.fn.add, $audios, audio)()
        })

      var $controllers = $('#controllers')

      $audios
        .bind('play', function () {
          $controllers.addClass('playing')
        })
        .bind('pause', function () {
          $controllers.removeClass('playing')
        })
        .bind('canplaythrough', _.attempt(function () {
          var loadedAudioCount = 0
          return function () {
            loadedAudioCount += 1
            if (loadedAudioCount === $audios.length) {
              $('#players').append($audios)
              $('#status').remove()
              $controllers.addClass('loaded')
            }
          }
        }))

      $controllers
        .on('click', 'a', function (e) {
          e.preventDefault()
        })
        .on('click', '#play', function (e) {
          _.map($audios, function (audio) {
            audio.play()
          })
        })
        .on('click', '#pause', function (e) {
          _.map($audios, function (audio) {
            audio.pause()
          })
        })
        .on('click', '#stop', function (e) {
          _.map($audios, function (audio) {
            audio.pause()
            audio.currentTime = 0
          })
        })
    }
  }
)
