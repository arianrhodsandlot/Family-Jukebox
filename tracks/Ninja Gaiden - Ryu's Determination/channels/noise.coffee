base = [
  [0, 0.5], [null, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5]
]
repeatBase = (times) ->
  _.flatten(_.map(_.times(times), _.constant(base)))

prelude = repeatBase(2)

overtune = repeatBase(16)

verse = [
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

chorus = overtune

notes = prelude
  .concat(overtune)
  .concat(verse)
  .concat(chorus)
  .concat(overtune)
  .concat(verse)
  .concat(chorus)
  .concat(overtune)

@noise = {
  name: 'noise',
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
