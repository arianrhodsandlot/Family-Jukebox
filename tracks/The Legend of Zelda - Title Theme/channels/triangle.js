define(['_'], function (_) {
  var prelude = [
    [-23, 2], [-16, 2], [-11, 4],
    [-25, 2], [-18, 2], [-13, 4],
    [-27, 2], [-20, 2], [-15, 4],
    [-28, 2], [-21, 2], [-16, 4]
  ]

  var overtune = [
    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],

    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],

    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],

    -25, [-25, 0.5], [-25, 0.5],
    -25, [-25, 0.5], [-25, 0.5],
    -25, [-25, 0.5], [-25, 0.5],
    -25, [-25, 0.5], [-25, 0.5],

    -27, [-27, 0.5], [-27, 0.5],
    -27, [-27, 0.5], [-27, 0.5],
    -27, [-27, 0.5], [-27, 0.5],
    -27, [-27, 0.5], [-27, 0.5],

    -28, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],

    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],

    -25, [-25, 0.5], [-25, 0.5],
    -25, [-25, 0.5], [-25, 0.5],
    -25, [-25, 0.5], [-25, 0.5],
    -25, [-25, 0.5], [-25, 0.5]
  ]

  var verse = [
    -27, [-27, 0.5], [-27, 0.5],
    -27, [-27, 0.5], [-27, 0.5],
    -27, [-27, 0.5], [-27, 0.5],
    -27, [-27, 0.5], [-27, 0.5],

    -20, [-20, 0.5], [-20, 0.5],
    -20, [-20, 0.5], [-20, 0.5],
    -20, [-20, 0.5], [-20, 0.5],
    -20, [-20, 0.5], [-20, 0.5],

    -22, [-22, 0.5], [-22, 0.5],
    -22, [-22, 0.5], [-22, 0.5],
    -22, [-22, 0.5], [-22, 0.5],
    -22, [-22, 0.5], [-22, 0.5],

    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],

    -21, [-21, 0.5], [-21, 0.5],
    -21, [-21, 0.5], [-21, 0.5],
    -21, [-21, 0.5], [-21, 0.5],
    -21, [-21, 0.5], [-21, 0.5],

    -16, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],
    -28, [-26, 0.5], [-24, 0.5],

    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],

    -25, [-25, 0.5], [-25, 0.5],
    -25, [-25, 0.5], [-25, 0.5],
    -25, [-25, 0.5], [-25, 0.5],
    -25, [-25, 0.5], [-25, 0.5],

    -27, [-27, 0.5], [-27, 0.5],
    -27, [-27, 0.5], [-27, 0.5],
    -27, [-27, 0.5], [-27, 0.5],
    -27, [-27, 0.5], [-27, 0.5],

    -28, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],

    -29, [-29, 0.5], [-29, 0.5],
    -29, [-29, 0.5], [-29, 0.5],
    -29, [-29, 0.5], [-29, 0.5],
    -29, [-29, 0.5], [-29, 0.5],

    -28, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],

    -29, [-29, 0.5], [-29, 0.5],
    -29, [-29, 0.5], [-29, 0.5],
    -29, [-29, 0.5], [-29, 0.5],
    -29, [-29, 0.5], [-29, 0.5],

    -28, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],

    -22, [-22, 0.5], [-22, 0.5],
    -22, [-22, 0.5], [-22, 0.5],
    -22, [-22, 0.5], [-22, 0.5],
    -22, [-22, 0.5], [-22, 0.5],

    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],
    -23, [-23, 0.5], [-23, 0.5],

    -21, [-21, 0.5], [-21, 0.5],
    -21, [-21, 0.5], [-21, 0.5],
    -21, [-21, 0.5], [-21, 0.5],
    -21, [-21, 0.5], [-21, 0.5],

    -16, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],
    -28, [-28, 0.5], [-28, 0.5],
    -28, [-26, 0.5], [-24, 0.5]
  ]

  var notes = prelude
    .concat(overtune)
    .concat(verse)
    .concat(prelude)
    .concat(overtune)
    .concat(verse)

  return {
    name: 'triangle',
    waveform: 'triangle',
    config: {
      instrument: {
        sampleRate: 44100,
        bpm: 190,
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
