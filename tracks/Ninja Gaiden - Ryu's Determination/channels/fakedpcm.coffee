base1 = [
  [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4],
  [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4]
]

base2 = base1.concat(base1).concat(base1).concat([
  [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4],
  [0, 0.4], [null, 0.1], [0, 0.4], [null, 0.6], [0, 0.4], [null, 0.1],
  [0, 0.4], [null, 0.1], [0, 0.4], [null, 0.1],
  [0, 0.4], [null, 0.1], [0, 0.4], [null, 0.1]
])

base2 = base2.concat(base2)

prelude = base1
overtune = base2
verse = [
  [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4],
  [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4],
  [0, 0.4], [null, 0.6], [0, 0.4], [null, 0.6],
  [0, 0.4], [null, 0.6], [0, 0.4], [null, 0.6],
  [0, 0.4], [null, 0.6], null,
  [0, 0.4], [null, 0.6], [0, 0.4], [null, 0.1], [0, 0.4], [null, 0.1]
].concat(base2)
chorus = base2

notes = prelude
  .concat(overtune)
  .concat(verse)
  .concat(chorus)
  .concat(overtune)
  .concat(verse)
  .concat(chorus)
  .concat(overtune)

@fakedpcm = {
  name: 'fakedpcm',
  config: {
    instrument: {
      sampleRate: 44100,
      bpm: 290,
      fadeOut: {
        from: 0.4,
        to: 0.9
      }
    },
    audio: {
      volume: 0.1
    }
  },
  notes: notes
}
