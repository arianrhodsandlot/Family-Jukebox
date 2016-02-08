define(['_', 'channels/square1.js'], function (_, square1) {
  var notes = [_.first(square1.notes)].concat(_.initial(square1.notes))

  return {
    name: 'square2',
    waveform: 'square',
    config: {
      instrument: {
        sampleRate: 44100,
        bpm: 400,
        fadeOut: {
          from: 0,
          to: 1.1
        }
      },
      audio: {
        volume: 0.1
      }
    },
    notes: notes
  }
})
