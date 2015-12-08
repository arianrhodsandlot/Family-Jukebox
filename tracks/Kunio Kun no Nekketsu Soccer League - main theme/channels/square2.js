define(['_'], function (_) {
  var prelude = [
    [9, 3], [9, 0.5], [9, 0.5], 9, 4, 4, 9, [11, 1.5], [7, 0.5], [7, 3],
    7, 7, 7,
    [9, 3], [9, 0.5], [9, 0.5], 9, 4, 4, 9, [7, 0.5], [9, 0.5], [11, 5],
    [11, 2],
    [9, 3], [9, 0.5], [9, 0.5], 9, 4, 4, 9, [11, 1.5], [7, 0.5], [7, 3],
    7, 7, 7,
    [9, 3], [9, 0.5], [9, 0.5], 9, 4, 4, 9, [7, 0.5], [9, 0.5], [11, 5],
    [11, 2]
  ]

  var overtune = [
    [1, 0.5], [1, 0.5], [1, 0.5], [6, 0.5], [6, 0.5], [1, 0.5], [null, 0.5], [1, 0.5],
    [1, 0.5], [1, 0.5], [1, 0.5], [6, 0.5], [6, 0.5], [1, 0.5], [null, 0.5], [1, 0.5],
    [1, 0.5], [1, 0.5], [1, 0.5], [6, 0.5], [6, 0.5], [1, 0.5], [null, 0.5], [1, 0.5],
    [6, 2], [4, 2],
    [1, 0.5], [1, 0.5], [1, 0.5], [6, 0.5], [6, 0.5], [1, 0.5], [null, 0.5], [1, 0.5],
    [1, 0.5], [1, 0.5], [1, 0.5], [6, 0.5], [6, 0.5], [1, 0.5], [null, 0.5], [1, 0.5],
    [1, 0.5], [1, 0.5], [1, 0.5], [6, 0.5], [6, 0.5], [1, 0.5], [null, 0.5], [1, 0.5],
    [6, 2], [4, 2],
    [1, 0.5], [1, 0.5], [1, 0.5], [6, 0.5], [6, 0.5], [1, 0.5], [null, 0.5], [1, 0.5],
    [1, 0.5], [1, 0.5], [1, 0.5], [6, 0.5], [6, 0.5], [1, 0.5], [null, 0.5], [1, 0.5],
    [1, 0.5], [1, 0.5], [1, 0.5], [6, 0.5], [6, 0.5], [1, 0.5], [null, 0.5], [1, 0.5],
    [6, 2], [4, 2],
    [1, 0.5], [1, 0.5], null, null, [4, 0.5], [4, 0.5], null, null, [6, 0.5], [6, 0.5], null, null,
    [8, 0.5], [null, 0.5], [8, 0.5], [8, 0.5], [8, 0.5], [8, 0.5], [8, 0.5], [null, 1.5], [8, 2],
  ]

  var verse = _.flatten(_.map(_.times(6), _.constant([
    [-11, 0.5], [null, 0.5], [-11, 0.5], [-11, 0.5],
    [-11, 0.5], [null, 0.5], [-11, 0.5], [-11, 0.5],
    [-13, 0.5], [null, 0.5], [-13, 0.5], [-13, 0.5],
    [-13, 0.5], [null, 0.5], [-13, 0.5], [-13, 0.5],
    [-15, 0.5], [null, 0.5], [-15, 0.5], [-15, 0.5],
    [-15, 0.5], [null, 0.5], [-15, 0.5], [-15, 0.5],
    [-13, 0.5], [null, 0.5], [-13, 0.5], [-13, 0.5],
    [-13, 0.5], [null, 0.5], [-13, 0.5], [-13, 0.5],
  ])))

  var chorus = [
    [-6, 0.5], null, [-6, 0.5], [null, 2],
    [-6, 0.5], null, [-6, 0.5], [null, 2],
    [-6, 0.5], null, [-6, 0.5], [null, 2],
    [-8, 0.5], null, [-8, 2.5],
    [-6, 0.5], null, [-6, 0.5], [null, 2],
    [-6, 0.5], null, [-6, 0.5], [null, 2],
    [-6, 0.5], null, [-6, 0.5], [null, 2],
    [-8, 0.5], null, [-8, 2.5],

    [-10, 2], [-10, 2], [-8, 2], [-8, 2], [-8, 2], [-8, 2], [-8, 2], [-8, 2],
    [-10, 2], [-10, 2], [-8, 2], [-8, 2],
    [-4, 1], [null, 2.5], [-4, 0.5], [-4, 0.5],
    [-4, 0.5], [null, 1.5], [-4, 2],
  ]

  var main = overtune
    .concat(verse)
    .concat(chorus)

  var notes = prelude
    .concat(main)
    .concat(main)

  return {
    id: _.uniqueId(),
    name: 'square2',
    config: {
      instrument: {
        sampleRate: 44100,
        bpm: 300,
        waveEndsBy: 0.7
      },
      audio: {
        volume: 0.2,
      }
    },
    notes: notes,
    waveform: 'square'
  }
})