define(['_'], function (_) {
  var prelude = [
    [null, 32]
  ] && []

  var overtune = _.flatten(_.map(_.times(16), _.constant([
    [0, 0.2], [null, 0.8], [0, 0.1], [null, 0.4], [0, 0.1], [null, 0.4]
  ]))) && []

  var verse = _.flatten(_.map(_.times(88), _.constant([
    [0, 0.2], [null, 0.8], [0, 0.1], [null, 0.4], [0, 0.1], [null, 0.4]
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
        volume: 0.05
      }
    },
    notes: notes
  }
})
