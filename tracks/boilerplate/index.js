require(['_', 'riot', 'text!/assets/track.tag!strip'],
  function (_, riot, track) {
    var title = decodeURIComponent(_.trim(location.pathname, '/tracks'))
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

    riot.tag('title', title)
    riot.tag('track', track, function (opts) {
      this.status = 'loading'
      this.sources = []
      this.audios = null

      this.error = _.bind(function () {
        this.status = 'error'
        this.update()
        return this
      }, this)

      this.load = _.bind(function (sources) {
        this.status = 'loaded'
        this.sources = sources
        this.update()
        this.audios = this.root.getElementsByTagName('audio')
        return this
      }, this)

      this.syncAudioCurrentTime = function (currentTime) {
        var currentTime = _.isUndefined(currentTime)
          ? _.first(this.audios).currentTime
          : currentTime
        _.each(this.audios, function (audio) {
          audio.currentTime = currentTime
        })
        return this
      }

      this.play = _.bind(function () {
        this.syncAudioCurrentTime()
        _.each(this.audios, function (audio) {
          audio.play()
        })
        return this
      }, this)

      this.pause = _.bind(function () {
        _.each(this.audios, function (audio) {
          audio.pause()
        })
        return this
      }, this)

      this.stop = _.bind(function () {
        return this.pause().syncAudioCurrentTime(0)
      }, this)
    })

    riot.mount('title')

    var trackInstance = _.first(riot.mount('track', {
      title: title
    }))

    _.each(workers, function (worker) {
      worker.addEventListener('message', function (message) {
        sources.push(message.data.source)
      })

      worker.addEventListener('message', function (message) {
        if (sources.length === channels.length) trackInstance.load(sources)
      })

      worker.addEventListener('error', function (error) {
        console.error(error)
        console.error(error.message)
      })
    })
  }
)
