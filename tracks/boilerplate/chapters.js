(function () {
  var prelude = {
    channels: [{
      name: 'square1',
      notes: []
    }, {
      name: 'square2',
      notes: []
    }, {
      name: 'triangle',
      notes: []
    }, {
      name: 'noise',
      notes: []
    }],
    loop: false
  }

  var main = {
    channels: [{
      name: 'square1',
      notes: (function () {
      })()
    }, {
      name: 'square2',
      notes: (function () {
      })()
    }, {
      name: 'triangle',
      notes: (function () {
      })()
    }, {
      name: 'noise',
      notes: (function () {
      })()
    }],
    loop: true
  }

  var chapters = [prelude, main]
  dispatchEvent(new CustomEvent('chaptersLoaded', {detail: chapters}))
})()

(function () {

var channels = []

;(function () {
  var prelude = [
    -9, -7, -5, -4, -2, 0, 2
  ]

  var overtune = [
    2, 0, -2, -4, -5, -7, -9
  ]

  var verse = [
    -9, -7, -5, -4, -2, 0, 2
  ]

  var chorus = [
    2, 0, -2, -4, -5, -7, -9
  ]

  var notes = prelude
    .concat(overtune)
    .concat(verse)
    .concat(chorus)

  var square1 = {
    name: 'square1',
    config: {
      instrument: {
        waveform: 'square',
        sampleRate: 44100,
        bpm: 300,
        fadeOut: {
          from: 0.8,
          to: 1
        }
      },
      audio: {
        volume: 0.2
      }
    },
    notes: notes
  }
  channels.push(square1)
})()

;(function () {
  var prelude = [
    -9, -7, -5, -4, -2, 0, 2
  ]

  var overtune = [
    -9, -7, -5, -4, -2, 0, 2
  ]

  var verse = [
    -9, -7, -5, -4, -2, 0, 2
  ]

  var chorus = [
    -9, -7, -5, -4, -2, 0, 2
  ]

  var notes = prelude
    .concat(overtune)
    .concat(verse)
    .concat(chorus)

  var square2 = {
    name: 'square2',
    waveform: 'square',
    config: {
      instrument: {
        sampleRate: 44100,
        bpm: 300,
        fadeOut: {
          from: 0.8,
          to: 1
        }
      },
      audio: {
        volume: 0.2
      }
    },
    notes: notes
  }

  channels.push(square2)
})()

;(function () {
  var prelude = [
    -9, -7, -5, -4, -2, 0, 2
  ]

  var overtune = [
    -9, -7, -5, -4, -2, 0, 2
  ]

  var verse = [
    -9, -7, -5, -4, -2, 0, 2
  ]

  var chorus = [
    -9, -7, -5, -4, -2, 0, 2
  ]

  var notes = prelude
    .concat(overtune)
    .concat(verse)
    .concat(chorus)

  var triangle = {
    name: 'triangle',
    waveform: 'triangle',
    config: {
      instrument: {
        sampleRate: 44100,
        bpm: 300,
        fadeOut: {
          from: 0.8,
          to: 1
        }
      },
      audio: {
        volume: 0.2
      }
    },
    notes: notes
  }
  channels.push(triangle)
})()

;(function () {
  var prelude = [
    -9, -7, -5, -4, -2, 0, 2
  ]

  var overtune = [
    -9, -7, -5, -4, -2, 0, 2
  ]

  var verse = [
    -9, -7, -5, -4, -2, 0, 2
  ]

  var chorus = [
    -9, -7, -5, -4, -2, 0, 2
  ]

  var notes = prelude
    .concat(overtune)
    .concat(verse)
    .concat(chorus)

  var noise = {
    name: 'noise',
    config: {
      instrument: {
        waveform: 'noise',
        sampleRate: 44100,
        bpm: 300
      },
      audio: {
        volume: 0.2
      }
    },
    notes: notes
  }

  channels.push(noise)
})()

window.dispatchEvent(new CustomEvent('channelsLoaded', {detail: channels}))
})()
