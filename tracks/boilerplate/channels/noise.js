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

  return {
    name: 'square1',
    config: {
      sampleRate: 44100,
      bpm: 300,
      volume: 0.2,
    },
    notes: prelude
      .concat(overtune)
      .concat(verse)
      .concat(chorus),
    waveform: 'noise'
  }
})
