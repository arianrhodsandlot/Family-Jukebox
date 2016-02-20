define(['_'], function (_) {
  var prelude = [
    [null, 32]
  ]

  var overtune = _.flatten(_.map(_.times(16), _.constant([
    [0, 1 / 5], [null, 4 / 5], [0, 1 / 10], [null, 2 / 5], [0, 1 / 10], [null, 2 / 5]
  ])))

  var verse = _.flatten(_.map(_.times(88), _.constant([
    [0, 1 / 5], [null, 4 / 5], [0, 1 / 10], [null, 2 / 5], [0, 1 / 10], [null, 2 / 5]
  ])))

  var notes = prelude
    .concat(overtune)
    .concat(verse)
    .concat(prelude)
    .concat(overtune)
    .concat(verse)

  return {
    name: 'noise',
    waveform: 'noise',
    config: {
      instrument: {
        sampleRate: 44100,
        bpm: 190
      },
      audio: {
        volume: 0.1
      }
    },
    notes: notes
  }
})
