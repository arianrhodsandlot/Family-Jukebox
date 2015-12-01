window.requirejs.config({
  paths: {
    jquery: 'https://cdn.jsdelivr.net/jquery/3.0.0-alpha1/jquery.min'
  }
})

define(

  ['_', 'jquery'],

  function (_, $) {
    return function (sources) {
      var $audios = _(sources)
        .map(function (source) {
          return _.assign(new Audio(), {
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

      console.log($audios)

      var $players = $('#players')
      var $controllers = $('#controllers')

      $audios
        .bind('play', function () {
          $controllers.addClass('playing')
        })
        .bind('pause', function () {
          $controllers.removeClass('playing')
        })

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

      $('#players').append($audios)

      $('#status').remove()

      var playerHeight = $('#players').height()
      $controllers
        .addClass('loaded')
    }
  }
)
