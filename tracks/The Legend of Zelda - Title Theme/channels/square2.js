define(['_'], function (_) {
  var prelude = [
    [1, 5], -4, -4, 1, [-1, 0.5], [-3, 0.5], [-1, 6.5],
    [1, 5], -3, -3, 1, [0, 0.5], [-2, 0.5], [0, 6.5]
  ]

  var overtune = [
    [-20, 2], [null, 6],
    [-20, 2], [null, 6]
  ]

  var verse = [
  ]

  var notes = prelude
    .concat(overtune)
    .concat(verse)
    .concat(prelude)
    .concat(overtune)
    .concat(verse)

  return {
    name: 'square2',
    waveform: 'square',
    config: {
      instrument: {
        sampleRate: 44100,
        bpm: 190,
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
