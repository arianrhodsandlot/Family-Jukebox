(function () {
  var up = function (notes) {
    return notes.map(function (note) {
      return note + 12
    })
  }
  var gen = function () {
    var notes = Array.prototype.map.call(arguments, function (x) {
      return x
    })
    var notes1 = up(notes)
    var notes2 = up(notes1)
    var notes3 = up(notes2)
    var notes4 = up(notes3)
    return notes
      .concat(notes1)
      .concat(notes2)
      .concat(notes3)
      .concat([notes4[0]])
      .concat(notes3.reverse())
      .concat(notes2.reverse())
      .concat(notes1.reverse())
      .concat(notes.slice(1, notes.length).reverse())
  }

  var repeat = gen(-21, -19, -17, -14).concat(gen(-24, -22, -21, -17))
  var square1 = {
    name: 'square1',
    config: {
      instrument: {
        waveform: 'square',
        sampleRate: 44100,
        bpm: 400,
        fadeOut: {
          from: 0,
          to: 1.1
        }
      },
      audio: {
        volume: 0.2
      }
    },
    notes: repeat.concat(repeat)
      .concat(gen(-24, -21, -16, -14))
      .concat(gen(-22, -19, -14, -12))
      .concat(gen(-25, -21, -18, -14))
      .concat(gen(-23, -19, -16, -12))
  }
  var square2 = {
    name: 'square2',
    config: {
      instrument: {
        waveform: 'square',
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
    notes: [square1.notes[0]].concat(square1.notes.slice(0, -1))
  }
  var chapters = [{
    channels: [square1, square2],
    loop: true
  }]
  dispatchEvent(new CustomEvent('chaptersLoaded', {detail: chapters}))
})()
