define(['_'], function (_) {
  var prelude = [
    [null, 16],
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9],

    [0, 0.5], [0, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [null, 2], [0, 0.5], [null, 0.5], [0, 0.5], [null, 0.5],
    [null, 2], [0, 0.5], [null, 0.5], [null, 4], [0, 0.5], [null, 0.5], null, [0, 0.5], [null, 0.5], null,
    [0, 0.5], [null, 0.5], null, [0, 0.5], [null, 0.5], [0, 0.5], [null, 0.5],
    [null, 12]
  ]

  var overtune = [
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.5], [null, 0.5], [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.5], [null, 0.5], [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.5], [null, 0.5], [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.5], [null, 0.5], [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.5], [null, 0.5], [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.5], [null, 0.5], [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.5], [null, 0.5], [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.5], [null, 0.5], [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.5], [null, 0.5], [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.5], [null, 0.5], [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.5], [null, 0.5], [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9], [0, 0.1], [null, 0.9], [0, 0.5], [null, 0.5], [0, 0.1], [null, 0.9],
  ]

  var verse = [
  ]

  var chorus = [
  ]

  var notes = prelude
    .concat(overtune)
    .concat(verse)
    .concat(chorus)

  notes = notes.concat(notes)
  notes = prelude.concat(overtune)

  return {
    name: 'noise',
    waveform: 'noise',
    config: {
      instrument: {
        sampleRate: 44100,
        bpm: 300,
        fadeOut: {
          from: 0,
          to: 2
        }
      },
      audio: {
        volume: 0.2
      }
    },
    notes: notes
  }
})
