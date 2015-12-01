window.requirejs.config({
  paths: {
    _: 'https://cdn.jsdelivr.net/lodash/3.10.1/lodash.min'
  }
})(

  ['_', '../../assets/instrument', '../../assets/init-track',
  'channels/square1', 'channels/square2', 'channels/triangle', 'channels/noise'],

  function (_, Instrument, initTrack, square1, square2, triangle, noise) {
    var sampleRate = 44100
    var bpm = 300

    var workers = [
      new Worker('workers/square1.js'),
      new Worker('workers/square2.js'),
      new Worker('workers/triangle.js'),
      new Worker('workers/noise.js')
    ]

    var sources = []

    _.map(workers, function (worker) {
      worker.addEventListener('message', function (message) {
        sources.push(message.data)
        if (sources.length === workers.length) {
          initTrack(sources)
        }
      })
    })
    return

    var instruments = [
      Instrument('square')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.2)
        .set('waveEndsBy', 0.75)
        .perform(square1)
        .effect('fadeOut'),

      Instrument('square')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.2)
        .set('waveEndsBy', 0.7)
        .perform(square2)
        .effect('fadeOut'),

      Instrument('triangle')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.2)
        .set('fadeOut', {
          from: 0.8,
          to: 1
        })
        .perform(triangle)
        .effect('fadeOut'),

      Instrument('noise')
        .set('sampleRate', sampleRate)
        .set('bpm', bpm)
        .set('volume', 0.1)
        .set('waveEndsBy', 0.8)
        .perform(noise)
        .effect('fadeOut'),
    ]

    initTrack(instruments)
  }
)
