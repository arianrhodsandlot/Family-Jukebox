define(['_'], function (_) {
  var base1 = [
    [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4],
    [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4],
  ]

  var base2 = base1.concat(base1).concat(base1).concat([
    [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4],
    [0, 0.4], [null, 0.1], [0, 0.4], [null, 0.6], [0, 0.4], [null, 0.1],
    [0, 0.4], [null, 0.1], [0, 0.4], [null, 0.1],
    [0, 0.4], [null, 0.1], [0, 0.4], [null, 0.1],
  ])

  base2 = base2.concat(base2)

  var prelude = base1
  var overtune = base2
  var verse = [
    [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4],
    [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4],
    [0, 0.4], [null, 0.6], [0, 0.4], [null, 0.6],
    [0, 0.4], [null, 0.6], [0, 0.4], [null, 0.6],
    [0, 0.4], [null, 0.6], null,
    [0, 0.4], [null, 0.6], [0, 0.4], [null, 0.1], [0, 0.4], [null, 0.1]
  ].concat(base2)
  var chorus = base2

  var notes = prelude
    .concat(overtune)
    .concat(verse)
    .concat(chorus)
    .concat(overtune)
    .concat(verse)
    .concat(chorus)
    .concat(overtune)

  return {
    name: 'fakedpcm',
    waveform: 'noise',
    config: {
      instrument:{
        sampleRate: 44100,
        bpm: 290,
        fadeOut: {
          from: 0.4,
          to: 0.9
        }
      },
      audio: {
        volume: 0.1,
      }
    },
    notes: notes
  }
})
