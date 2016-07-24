define(['_'], function (_) {
  var prelude = [
    [-7, 0.5], [null, 1.5],
    [5, 0.5], [null, 0.5], [-7, 0.5], [null, 0.5],
    [-2, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [3, 0.5], [null, 0.5], [5, 0.5], [null, 1.5],

    [-7, 0.5], [-7, 0.5],
    [5, 0.5], [null, 0.5], [-7, 0.5], [null, 0.5],
    [-2, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [3, 0.5], [null, 0.5], [5, 0.5], [null, 0.5],

    [-7, 0.5], [null, 1.5],
    [5, 0.5], [null, 0.5], [-7, 0.5], [null, 0.5],
    [-2, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [3, 0.5], [null, 0.5], [5, 0.5], [null, 1.5],

    -7, 5, -7, -2, 0, 10, 8, [12, 3],
    [14, 0.5], [16, 0.5], [17, 12],

    [9, 3], [7, 3], [9, 10]
  ]

  var overtune = [
    [null, 2],
    [0, 2], -4, [0, 2], -4,
    [1, 2], [0, 2], [-2, 2], -4, [-2, 0.5], [0, 6.5],

    -9, -7, null,
    -7, -7, -7, -5, -4, -2, -4,

    [null, 2],
    0, 0, [0, 2], [0, 2],
    [1, 2], [0, 2], [-2, 2], [-4, 2], null,

    -4, -4, -4, -2, [0, 2],
    [-5, 2], -5, [-4, 2], [-2, 2], [0, 2],

    [null, 2],

    [3, 2], [1, 2], [0, 2], [-2, 2], [-4, 2], -5, [-4, 3], [null, 2],
    [0, 2], [-2, 2], [-4, 2], [-5, 2], [-7, 2], -8, [-7, 3], [null, 2],
    [3, 2], [1, 2], [0, 2], [-2, 2], -4, [0, 2], 0, -2, -4
  ]

  var verse = [
    [null, 2],
    [0, 1.5], [0, 0.5], [0, 2], [-12, 1.5], [-12, 0.5], [-12, 2],
    [0, 2], [0, 2], [0, 2], [null, 2],
    [0, 1.5], [0, 0.5], 0, -2, -4,
    [-12, 0.5], [-14, 0.5], [-16, 1], null,
    [1, 2], [1, 3.5], [3, 0.5], [5, 3], 3, [3, 8],

    0, 3, 3, [3, 2], [3, 2], 5, null,
    -16, -12, -9, [8, 1.5], [7, 1.5], [5, 1], [3, 2], [3, 0.5], [5, 1.5],
  ]

  var chorus = [
  ]

  var notes = prelude
    .concat(overtune)
    .concat(verse)
    .concat(chorus)

  notes = notes.concat(notes)

  return {
    name: 'square1',
    waveform: 'square',
    config: {
      instrument: {
        sampleRate: 44100,
        bpm: 300,
        fadeOut: {
          from: 0,
          to: 5
        }
      },
      audio: {
        volume: 0.2
      }
    },
    notes: notes
  }
})
