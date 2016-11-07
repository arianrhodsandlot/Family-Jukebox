prelude = [-9, -7, -5, -4, -2, 0, 2]
overtune = [-9, -7, -5, -4, -2, 0, 2]
verse = [-9, -7, -5, -4, -2, 0, 2]
chorus = [-9, -7, -5, -4, -2, 0, 2]

notes = prelude.concat(overtune).concat(verse).concat(chorus)

triangle = {
  name: 'triangle'
  config:
    instrument:
      waveform: 'triangle'
      sampleRate: 44100
      bpm: 300
      fadeOut:
        from: 0.8
        to: 1
    audio: volume: 0.2
  notes: notes
}
