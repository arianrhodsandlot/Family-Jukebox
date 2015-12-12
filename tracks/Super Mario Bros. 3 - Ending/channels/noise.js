define(['_'], function (_) {
  var prelude = [[null, 192]]

  var overtune = [
    // [0, 0.2], [null, 0.8], [0, 0.2], [null, 0.3], [0, 0.2], [null, 0.3], [0, 0.2], [null, 0.8], [0, 0.2], [null, 0.8],
    // [0, 0.2], [null, 0.8], [0, 0.2], [null, 0.8], [0, 0.2], [null, 0.8], [0, 0.2], [null, 0.8],
    [0, 0.5], [0, 0.25], [0, 0.25], [0, 0.5],
    [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5],
    [0, 0.5], [0, 0.25], [0, 0.25], [0, 0.5],
    [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5],
    [0, 0.5], [0, 0.25], [0, 0.25], [0, 0.5],
    [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5],
    [0, 0.5], [0, 0.25], [0, 0.25], [0, 0.5],
    [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5],
    [0, 0.5], [0, 0.25], [0, 0.25], [0, 0.5],
    [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5],
    [0, 0.5], [0, 0.25], [0, 0.25], [0, 0.5],
    [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5],
    [0, 0.5], [0, 0.25], [0, 0.25], [0, 0.5],
    [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5],
  ]

  var verse = [
  ]

  var chorus = [
  ]

  var notes = overtune;prelude
    .concat(overtune)
    .concat(verse)
    .concat(chorus)

  return {
    name: 'noise',
    waveform: 'noise',
    config: {
      instrument:{
        sampleRate: 44100,
        bpm: 233
      },
      audio: {
        volume: 0.2,
      }
    },
    notes: notes
  }
})