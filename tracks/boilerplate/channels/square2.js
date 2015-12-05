define(['_'], function (_) {
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

  return {
    name: 'square2',
    waveform: 'square',
    config: {
      instrument:{
        sampleRate: 44100,
        bpm: 300,
        fadeOut: {
          from: 0.8,
          to: 1
        }
      },
      audio: {
        volume: 0.2,
      }
    },
    notes: notes
  }
})
