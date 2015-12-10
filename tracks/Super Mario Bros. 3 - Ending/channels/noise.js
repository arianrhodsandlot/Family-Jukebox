define(['_'], function (_) {
  var prelude = [[null, 162]]

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
    name: 'noise',
    waveform: 'noise',
    config: {
      instrument:{
        sampleRate: 44100,
        bpm: 300
      },
      audio: {
        volume: 0.2,
      }
    },
    notes: notes
  }
})
