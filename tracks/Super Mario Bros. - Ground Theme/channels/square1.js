define(['_'], function (_) {
  var prelude = [
    -3, -3, null,
    -3, null,
    -3, -3, null,
    2, [null, 3],
    -2, [null, 3]
  ]

  var section1 = [
    -5, [null, 2], -9,
    [null, 2], -14, null,
    null, -9, null, -7, null, -8, -9, null,

    -9, [null, 0.5], -2, [null, 0.5], 2, 3, null,
    0, 2, null,
    0, null, -5, -4, -7, [null, 2]
  ]
  var section2 = [
    [null, 2], 7, 6, 5, 2, null, 3, null,
    -5, -4, -2, null,
    -9, -5, -4, [null, 2],

    7, 6, 5, 2, null, 3, null,
    8, null, 8, 8, [null, 4],

    null, 7, 6, 5, 2, null, 3, null,
    -5, -4, -2, null,
    -9, -5, -4, [null, 2],

    -1, [null, 2],
    -4, [null, 2],
    -5, [null, 7]
  ]
  var section3 = [
    // do 3 re 5 mi 7 fa 8 so 10 la 12 xi 14
    -1, -1, null,
    -1, null,
    -1, 1, -2, -5, null, -5, -9, [null, 4],
    -1, -1, null,
    -1, null,
    -1, 1, -2, [null, 8],

    -1, -1, null,
    -1, null,
    -1, 1, -2, -5, null, -5, -9, [null, 4],
    -3, -3, null,
    -3, null,
    -3, -3, null,
    2, [null, 3],
    -2, [null, 3]
  ]
  var section4 = [
    3, 0, null, -5, [null, 2],

    -5, null, -4, 3, null, 3, -4, [null, 3],
    -2, [null, 1 / 3], 8, [null, 1 / 3], 8, [null, 1 / 3],
    8, [null, 1 / 3], 7, [null, 1 / 3], 5, [null, 1 / 3],
    3, 0, null,
    -4, -5, [null, 3],

    3, 0, null, -5, [null, 2],
    -5, null, -4, 3, null, 3, -4, [null, 3],
    -2, 5, null, 5, 5, null,
    3, 2, -2, -5, null,
    -5, -9, [null, 3]
  ]

  // do 3 re 5 mi 7 fa 8 so 10 la 12 xi 14
  var notes = prelude
    .concat(section1)
    .concat(section1)
    .concat(section2)
    .concat(section2)
    .concat(section3)
    .concat(section1)
    .concat(section1)
    .concat(section4)
    .concat(section4)
    .concat(section3)
    .concat(section1)

  return {
    name: 'square1',
    waveform: 'square',
    config: {
      instrument: {
        sampleRate: 44100,
        bpm: 400,
        waveEndsBy: 0.8
      },
      audio: {
        volume: 0.2
      }
    },
    notes: notes
  }
})
