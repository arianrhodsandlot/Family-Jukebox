define(['_'], function (_) {
  var prelude = [
    -7, 0, 5, -7, -2, 0, 4, 5
  ]

  var overtune = [
  ]

  var verse = [
  ]

  var chorus = [
  ]

  var notes = prelude
    .concat(overtune)
    .concat(verse)
    .concat(chorus)

  return {
    name: 'square1',
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
})
