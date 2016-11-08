prelude = [-27, -20, -27, -20, -27, -20, -27, -20]
overtune = [
  -27, -15, -27, -15, -27, -15, -27, -15,
  -27, -19, -27, -19, -27, -19, -27, -19,
  -27, -17, -27, -17, -27, -17, -27, -17,
  -27, -20, -27, -20, -27, -20, -18, -17,

  -27, -15, -27, -15, -27, -15, -27, -15,
  -27, -19, -27, -19, -27, -19, -27, -19,
  -27, -17, -27, -17, -27, -17, -27, -17,
  -27, -20, -27, -20, -27, -20, -18, -17
]
verse = [
  -27, -15, -27, -17, -27, -19, -27, -20, -27, -27, -27, -27, -27, [null, 3]
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

@triangle = {
  name: 'triangle',
  config: {
    instrument: {
      waveform: 'triangle',
      sampleRate: 44100,
      bpm: 290,
      fadeOut: {
        from: 0.8,
        to: 1
      }
    },
    audio: {
      volume: 0.2
    }
  },
  notes: notes
}
