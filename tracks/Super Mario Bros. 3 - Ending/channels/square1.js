define(['_'], function (_) {
  var prelude = [
    -10, -10, -9, -9, [null, 2],
    -7, -7, -6, -6, -5, -5, -9, -9,
    0, 0, -2, -2, -4, -4, -5, -5,
    -7, -7, -4, -4, -2, -2,
    -14, -14, -9, -9,

    -10, -10, -9, -9, [null, 2],
    -7, -7, -6, -6, -5, -5, -9, -9,
    0, 0, -2, -2, -4, -4, -5, -5,
    -7, -7, -4, -4, -2, -2,

    -14, -14, -9, -9, -10, -10, -5, -5,
    -3, -3, -1, -1, 2, 2, 0, 0,
    -1, -1, 0, 0, -2, -2, -4, -4,
    -2, -2, -1, -1, -4, -4, -2, -2,
    -9, -9, -4, -4,

    -10, -10, -9, -9, [null, 2],
    -7, -7, -6, -6, -5, -5, -9, -9,
    0, 0, -2, -2, -4, -4, -5, -5,
    -7, -7, -4, -4, -2, -2,
    -10, -10, -9, -9,
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
      instrument:{
        sampleRate: 44100,
        bpm: 233,
        fadeOut: {
          from: 0,
          to: 1.2
        }
      },
      audio: {
        volume: 0.2,
      }
    },
    notes: notes
  }
})
