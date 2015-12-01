require(['_', 'jquery', 'Instrument', 'initTrack'],
  function (_, $, Instrument, initTrack) {
    var channels = [{
      name: 'square1',
      waveform: 'square'
    }, {
      name: 'square2',
      waveform: 'square'
    }, {
      name: 'triangle',
      waveform: 'triangle'
    }, {
      name: 'noise',
      waveform: 'noise'
    }]

    var sources = []

    var sampleRate = 44100
    var bpm = 300

    var workers = _.map(channels, function (channel) {
      var worker = new Worker('../../assets/worker.js')

      worker.postMessage({
        track: _.trim(location.pathname, '/tracks'),
        channel: channel,
        config: {
          sampleRate: sampleRate,
          bpm: bpm
        }
      })

      return worker
    })

    _.forEach(workers, function (worker) {
      worker.addEventListener('message', function (message) {
        sources.push(message.data.source)
      })

      worker.addEventListener('message', function (message) {
        if (sources.length === channels.length) {
          initTrack(sources)
        }
      })

      worker.addEventListener('error', function (error) {
        console.error(error)
        console.error(error.message)
      })

      return worker
    })

    $('.title').html(decodeURIComponent(_.trim(location.pathname, '/tracks')))
  }
)
