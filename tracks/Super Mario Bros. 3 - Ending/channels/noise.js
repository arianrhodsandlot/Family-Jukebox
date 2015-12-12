define(['_'], function (_) {
  var x75p = function (notes) {
    return _.map(notes, function (note) {
      return _.isArray(note) ? [note[0], note[1] * 0.75] : [note, 0.75]
    })
  }

  var prelude = [[null, 128]]

  var overtune = x75p([
    [0, 0.2], [null, 0.8], [0, 0.1], [null, 0.4], [0, 0.1], [null, 0.4], [0, 0.2], [null, 0.8], [0, 0.2], [null, 0.8],
    [0, 0.2], [null, 0.8], [0, 0.2], [null, 0.8], [0, 0.2], [null, 0.8], [0, 0.2], [null, 0.8]
  ])

  var verse = _.flatten(_.map(_.times(16), _.constant(overtune)))

  var chorus = _.flatten(_.map(_.times(17), _.constant(overtune)))

  var notes = prelude
    .concat(overtune)
    .concat(verse)
    .concat(chorus)
    .concat(verse)
    .concat(chorus)

  return {
    name: 'noise',
    waveform: 'noise',
    config: {
      instrument: {
        sampleRate: 44100,
        bpm: 233
      },
      audio: {
        volume: 0.2,
      }
    },
    notes: notes
  }
})
