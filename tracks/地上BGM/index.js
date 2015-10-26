window.requirejs.config({
  paths: {
    _: 'https://cdn.jsdelivr.net/lodash/3.10.1/lodash.min',
    jquery: 'https://cdn.jsdelivr.net/jquery/3.0.0-alpha1/jquery.min',
    Instrument: '../../libs/instrument'
  }
})(

  ['_', 'jquery', 'Instrument', 'channels/main', 'channels/noise'],

  function (_, $, Instrument, main, noise) {
    var sampleRate = 44100
    var bpm = 400

    var instruments = [
      Instrument(_.compose(
        function (x) {
          return x > 190 ? x : 0
        },
        Math.round,
        Instrument('sawtooth').getWaveform()
      ))
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.4)
        .perform(main)
        .effect('fadeOut'),

      Instrument('noise')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.2)
        .perform(noise)
        .effect('fadeOut')
    ]

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
      .css({
        height: playerHeight + 'px',
        lineHeight: playerHeight + 'px',
        marginTop: -playerHeight + 'px'
      })
      .addClass('loaded')
  }
)
