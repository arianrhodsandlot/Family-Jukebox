define(['_'], function (_) {
  var prelude = [-27, -20, -27, -20, -27, -20, -27, -20]
  var overtune = [
    -27, -15, -27, -15, -27, -15, -27, -15,
    -27, -19, -27, -19, -27, -19, -27, -19,
    -27, -17, -27, -17, -27, -17, -27, -17,
    -27, -20, -27, -20, -27, -20, -18, -17,

    -27, -15, -27, -15, -27, -15, -27, -15,
    -27, -19, -27, -19, -27, -19, -27, -19,
    -27, -17, -27, -17, -27, -17, -27, -17,
    -27, -20, -27, -20, -27, -20, -18, -17
  ]
  var verse = [
    -27, -15, -27, -17, -27, -19, -27, -20, -27, -27, -27, -27, -27, [null, 3]
  ].concat(overtune)

  var chorus = overtune

  var notes = prelude
    .concat(overtune)
    .concat(verse)
    .concat(chorus)
    .concat(overtune)
    .concat(verse)
    .concat(chorus)
    .concat(overtune)

  return {
    name: 'triangle',
    waveform: 'triangle',
    config: {
      instrument: {
        sampleRate: 44100,
        bpm: 290,
        fadeOut: {
          from: 0.8,
          to: 1
        }
      },
      audio: {
        volume: 0.2
      }
    },
    notes: notes
  }
})
