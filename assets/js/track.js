require(['_', 'riot', 'tags', location.pathname + 'manifest.js'],
  function (_, riot, tags, manifest) {
    var title = decodeURIComponent(_.trim(location.pathname, '/tracks'))

    var track = _.first(riot.mount('track', {
      title: title
    }))

    riot.mount('title', {
      title: title
    })

    var workers = _.map(manifest.channels, function (channel) {
      var worker = new Worker('../../assets/js/worker.js')

      worker.postMessage({
        channel: channel
      })

      return worker
    })

    var sources = []

    _.each(workers, function (worker) {
      worker.addEventListener('message', function (message) {
        sources.push(message.data.source)
      })

      worker.addEventListener('message', function (message) {
        if (sources.length === manifest.channels.length) {
          console.log(track)
          track.load(sources)
        }
      })

      worker.addEventListener('error', function (error) {
        console.error(error)
        console.error(error.message)
      })
    })
  }
)
