(function () {
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
window.channels.push(square1)
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

window.channels.push(square2)
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
window.channels.push(triangle)
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

window.channels.push(noise)
})()
