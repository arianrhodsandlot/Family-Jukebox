(function () {
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
    -1, 1, null, -2, -5, null, -5, -9, [null, 3],
    -1, -1, null,
    -1, null,
    -1, 1, -2, [null, 8],

    -1, -1, null,
    -1, null,
    -1, 1, null, -2, -5, null, -5, -9, [null, 3],
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

  window.channels.push({
    name: 'square1',
    config: {
      instrument: {
        waveform: 'square',
        sampleRate: 44100,
        bpm: 400,
        waveEndsBy: 0.8
      },
      audio: {
        volume: 0.2
      }
    },
    notes: notes
  })
})()

;(function () {
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
    3, 5, null, 7, 3, null, 0, -2, [null, 3],
    3, 3, null,
    3, null,
    3, 5, 7, [null, 8],

    3, 3, null,
    3, null,
    3, 5, null, 7, 3, null, 0, -2, [null, 3],
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

  window.channels.push({
    name: 'square2',
    config: {
      instrument: {
        waveform: 'square',
        sampleRate: 44100,
        bpm: 400,
        waveEndsBy: 0.8
      },
      audio: {
        volume: 0.2
      }
    },
    notes: notes
  })
})()

;(function () {
  var prelude = [
    -19, -19, null,
    -19, null,
    -19, -19, null,
    -2, [null, 3],
    -14, [null, 3]
  ]

  var section1 = [
    -14, [null, 2], -17,
    [null, 2], -21, null,
    null, -16, null, -14, null, -15, -16, null,

    -17, [null, 0.5], -9, [null, 0.5], -5, -4, null,
    -7, -5, null,
    -9, null, -12, -10, -14, [null, 2]
  ]
  var section2 = [
    -21, [null, 2], -14, [null, 2], -9, null,
    -16, [null, 2], -9, -9, null, -16, null,
    -21, [null, 2], -17, null, -14, -9, [null, 2],
    10, null, 10, 10, null, -14, null,

    -21, [null, 2], -14, [null, 2], -9, null,
    -16, [null, 2], -9, -9, null, -16, null,
    -21, [null, 1.5], -13, [null, 1.5], -11, [null, 2], -9,
    [null, 7]
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
  // do--9 re--7 mi--5 fa--4 so--2 la-0 xi-2
  section3 = [
    -25, [null, 2], -18, [null, 2], -13, null,
    -14, [null, 2], -21, [null, 2], -26, null,
    -25, [null, 2], -18, [null, 2], -13, null,
    -14, [null, 2], -21, [null, 2], -26, null,

    -25, [null, 2], -18, [null, 2], -13, null,
    -14, [null, 2], -21, [null, 2], -26, null,
    -19, -19, null,
    -19, null,
    -19, -19, null,
    -2, [null, 3],
    -14, [null, 3]
  ]
  var section4 = [
    -21, [null, 2], -15, -14, null, -9, null,
    -16, null, -16, null, -9, -9, -16, null,
    -19, [null, 2], -16, -14, null, -10, null,
    -14, null, -14, null, -9, -9, -14, null,

    -21, [null, 2], -15, -14, null, -9, null,
    -16, null, -16, null, -9, -9, -16, null,
    -14, [null, 2], -14, -14, -12, -10, -9,
    null, -14, null, -21, [null, 4]
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

  window.channels.push({
    name: 'triangle',
    config: {
      instrument: {
        waveform: 'triangle',
        sampleRate: 44100,
        bpm: 400,
        fadeOut: {
          from: 0.8,
          to: 1
        }
      },
      audio: {
        volume: 0.3
      }
    },
    notes: notes
  })
})()

;(function () {
  var prelude = [
    [0, 0.5], [null, 0.5], [0, 0.2], [null, 0.8], null, [0, 0.5], [null, 0.5],
    null, [0, 0.2], [null, 0.8], [0, 0.5], [null, 0.5], null,
    [0, 0.5], [null, 0.5], null, null, null,
    [0, 0.5], [null, 0.5],
    [0, 0.3], [null, 0.7],
    [0, 0.2], [null, 0.8],
    [0, 0.1], [null, 0.9]
  ]
  var base = [
    [0, 0.1], [null, 1.9],
    [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9],
    [0, 0.4], [null, 1.6],
    [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9]
  ]
  var section1 = base.concat(base).concat(base).concat(base)
  var section2 = section1.concat(section1)
  var section3 = prelude.concat(prelude).concat(prelude).concat(prelude)
  var section4 = section2

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

  window.channels.push({
    name: 'noise',
    config: {
      instrument: {
        waveform: 'noise',
        sampleRate: 44100,
        bpm: 400
      },
      audio: {
        volume: 0.2
      }
    },
    notes: notes
  })
})()
