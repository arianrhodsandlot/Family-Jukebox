window.requirejs.config({
  paths: {
    jquery: 'https://cdn.jsdelivr.net/jquery/3.0.0-alpha1/jquery.min'
  }
})

window.define(

  ['_', 'jquery'],

  function (_, $) {
    return function (instruments) {
      var $players = $('#players')
      var $controllers = $('#controllers')
      var $audios = _(instruments)
        .pluck('audio')
        .map($)
        .reduce(function ($audios, audio) {
          return _.bind($.fn.add, $audios, audio)()
        })

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
          _.map(instruments, function (instrument) {
            instrument.play()
          })
        })
        .on('click', '#pause', function (e) {
          _.map(instruments, function (instrument) {
            instrument.pause()
          })
        })
        .on('click', '#stop', function (e) {
          _.map(instruments, function (instrument) {
            instrument.stop()
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
