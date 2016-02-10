define(['_'], function (_) {
  var prelude = [
    [1, 5], -4, -4, 1, [-1, 1 / 2], [-3, 1 / 2], [-1, 1 / 2 + 6],
    [1, 5], -3, -3, 1, [0, 1 / 2], [-2, 1 / 2], [0, 1 / 2 + 6]
  ]

  var overtune = [
    -16, [-16, 1 / 2], [-23, 1 / 2],
    -16, [-16, 1 / 2], [-23, 1 / 2],
    -16, [-16, 1 / 2], [-23, 1 / 2],
    [-16, 1 / 2], [-23, 1 / 2], [-16, 1 / 2], [-23, 1 / 2],
    -16, [-16, 1 / 2], [-23, 1 / 2],
    -16, [-16, 1 / 2], [-23, 1 / 2],
    -16, [-16, 1 / 2], [-23, 1 / 2],
    [-16, 1 / 2], [-23, 1 / 2], [-16, 1 / 2], [-23, 1 / 2]
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
    name: 'square1',
    waveform: 'square',
    config: {
      instrument: {
        sampleRate: 44100,
        bpm: 250,
        fadeOut: {
          from: 0.4,
          to: 1.4
        }
      },
      audio: {
        volume: 0.2
      }
    },
    notes: notes
  }
})
