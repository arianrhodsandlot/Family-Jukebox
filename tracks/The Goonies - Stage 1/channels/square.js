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
  ]

  var verse = [
  ]

  var chorus = [
    [null, 100]
  ]

  var notes = verse.concat(chorus);prelude
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
          from: 0,
          to: 2.5
        }
      },
      audio: {
        volume: 0.2
      }
    },
    notes: notes
  }
})
