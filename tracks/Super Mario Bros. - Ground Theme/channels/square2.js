define(['_'], function (_) {
  var prelude = [
    7, 7, null,
    7, null,
    3, 7, null,
    10, [null, 3],
    -2, [null, 3]
  ]

  var section1 = [
    3, [null, 2], -2,
    [null, 2], -5, null,
    null, 0, null, 2, null, 1, 0, null,

    -2, [null, 0.5], 7, [null, 0.5], 10, 12, null,
    8, 10, null,
    7, null, 3, 5, 2, [null, 2]
  ]
  var section2 = [
    [null, 2], 10, 9, 8, 6, null, 7, null,
    -2, 0, 3, null,
    0, 3, 5, [null, 2],

    10, 9, 8, 6, null, 7, null,
    15, null, 15, 15, [null, 4],

    null, 10, 9, 8, 6, null, 7, null,
    -2, 0, 3, null,
    0, 3, 5, [null, 2],

    6, [null, 2],
    5, [null, 2],
    3, [null, 7]
  ]
  var section3 = [
    3, 3, null,
    3, null,
    3, 5, 7, 3, null, 0, -2, [null, 4],
    3, 3, null,
    3, null,
    3, 5, 7, [null, 8],

    3, 3, null,
    3, null,
    3, 5, 7, 3, null, 0, -2, [null, 4],
    7, 7, null, 7,
    null, 3, 7, null,
    10, [null, 3],
    -2, [null, 3]
  ]
  var section4 = [
    7, 3, null, -2, [null, 2],

    -1, null, 0, 8, null, 8, 0, [null, 3],
    2, [null, 1 / 3], 12, [null, 1 / 3], 12, [null, 1 / 3],
    12, [null, 1 / 3], 10, [null, 1 / 3], 8, [null, 1 / 3],
    7, 3, null,
    0, -2, [null, 3],

    7, 3, null, -2, [null, 2],
    -1, null, 0, 8, null, 8, 0, [null, 3],
    2, 8, null, 8, 8, null,
    7, 5, 3, -5, null,
    -5, -9, [null, 3]
  ]

  // do--9 re--7 mi--5 fa--4 so--2 la-0 xi-2
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
    name: 'square2',
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
