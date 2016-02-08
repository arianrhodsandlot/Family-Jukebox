define(['_'], function (_) {
  var base = [
    [0, 0.5], [null, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5]
  ]
  var repeatBase = function (times) {
    return _.flatten(_.map(_.times(times), _.constant(base)))
  }

  var prelude = repeatBase(2)

  var overtune = repeatBase(16)

  var verse = [
    [0, 0.5], [null, 0.5],
    [0, 0.5], [0, 0.5],
    [0, 0.5], [null, 0.5],
    [0, 0.5], [0, 0.5],
    [0, 0.5], [null, 0.5],
    [0, 0.5], [0, 0.5],
    [0, 0.5], [null, 0.5],
    [0, 0.5], [0, 0.5],
    [null, 8]
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
    name: 'noise',
    waveform: 'noise',
    config: {
      instrument: {
        sampleRate: 44100,
        bpm: 290,
        fadeOut: {
          from: 0,
          to: 0.7
        }
      },
      audio: {
        volume: 0.05
      }
    },
    notes: notes
  }
})
