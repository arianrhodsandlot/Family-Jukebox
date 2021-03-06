(function () {
  var prelude = {
    channels: [{
      name: 'square1',
      config: {
        instrument: {
          waveform: 'square?d=0.75',
          sampleRate: 44100,
          bpm: 290,
          fadeOut: {
            from: 0.7,
            to: 1.5
          }
        },
        audio: {
          volume: 0.2
        }
      },
      notes: [[null, 8]]
    }, {
      name: 'square2',
      config: {
        instrument: {
          waveform: 'square?d=0.875',
          sampleRate: 44100,
          bpm: 290,
          waveEndsBy: 0.3
        },
        audio: {
          volume: 0.2
        }
      },
      notes: [[null, 8]]
    }, {
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
      notes: [-27, -20, -27, -20, -27, -20, -27, -20]
    }, {
      name: 'noise',
      config: {
        instrument: {
          waveform: 'noise',
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
      notes: [
        [0, 0.5], [null, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5],
        [0, 0.5], [null, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5]
      ]
    }, {
      name: 'fakedpcm',
      config: {
        instrument: {
          waveform: 'noise',
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
      notes: [
        [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4],
        [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4]
      ]
    }],
    loop: false
  }

  var main = {
    channels: [{
      name: 'square1',
      config: {
        instrument: {
          waveform: 'square?d=0.75',
          sampleRate: 44100,
          bpm: 290,
          fadeOut: {
            from: 0.7,
            to: 1.5
          }
        },
        audio: {
          volume: 0.2
        }
      },
      notes: (function () {
        var overtune = [
          -3, 0, -3, 2, [-5, 0.5], -3, [-5, 0.5], -3, 4, [-3, 0.5], -3, [-3, 0.5], -3, -1, 0, -1, -3, null,
          -1, -3, 2, -1, [-3, 0.5], -1, [-3, 0.5], -1, 4, [-1, 0.5], -1, [-1, 0.5], -1, 0, 2, 0, -1, null,

          -3, 0, -3, 2, [-5, 0.5], -3, [-5, 0.5], -3, 4, [-3, 0.5], -3, [-3, 0.5], -3, -1, 0, -1, -3, null,
          -1, -3, 2, -1, [-3, 0.5], -1, [-3, 0.5], -1, 4, [-1, 0.5], -1, [-1, 0.5], -1, 0, 2, 0, -1, null
        ]
        var verse = [
          -3, null, -5, null, -7, null, -8, [null, 2], -8, -8, -8, null, -8,

          -3, -1, 0, -1, 0, -3, null,
          4, 2, 0, 2, 0, 2, -3, null,
          0, -1, -3, -5, -3, -1, 7, null,
          5, 4, 2, 4,
          [null, 4],

          -8, -3, -1, 0, -1, 0, -3, null,
          4, 2, 0, 2, 0, 2, -3, null,
          0, -1, -3, -5, -3, -1, 7, null,
          5, 4, 2, 4,
          [null, 4]
        ]
        var chorus = [
          [-8, 0.5], [-5, 0.5], [-3, 0.5], [-1, 0.5], [0, 0.5], [2, 0.5],

          0, [-1, 0.5], 0, [-3, 0.5], 0, [-1, 0.5], 0, [-3, 0.5], [2, 0.5], [0, 0.5], [-1, 0.5], [0, 0.5],
          0, [-1, 0.5], 0, [-3, 0.5], 0, [-1, 0.5], 0, [-3, 0.5], [2, 0.5], [0, 0.5], [-1, 0.5], [-3, 0.5],
          2, [0, 0.5], 2, [-1, 0.5], 2, [0, 0.5], 2, [-1, 0.5], [4, 0.5], [2, 0.5], [0, 0.5], [-1, 0.5], [-3, 0.5], [-5, 0.5], [-8, 0.5], [-7, 0.5],
          [-3, 0.5], [-8, 0.5], [-5, 0.5], [-3, 0.5], [0, 0.5], [-1, 0.5], [-3, 0.5], [-5, 0.5], 4, 2,

          0, [-1, 0.5], 0, [-3, 0.5], 0, [-1, 0.5], 0, [-3, 0.5], [2, 0.5], [0, 0.5], [-1, 0.5], [0, 0.5],
          0, [-1, 0.5], 0, [-3, 0.5], 0, [-1, 0.5], 0, [-3, 0.5], [2, 0.5], [0, 0.5], [-1, 0.5], [-3, 0.5],
          2, [0, 0.5], 2, [-1, 0.5], 2, [0, 0.5], 2, [-1, 0.5], [4, 0.5], [2, 0.5], [0, 0.5], [-1, 0.5], [-3, 0.5], [-5, 0.5], [-8, 0.5], [-7, 0.5],
          [-3, 0.5], [-8, 0.5], [-5, 0.5], [-3, 0.5], [0, 0.5], [-1, 0.5], [-3, 0.5], [-5, 0.5], 4, 2
        ]
        return overtune
          .concat(verse)
          .concat(chorus)
      })()
    }, {
      name: 'square2',
      config: {
        instrument: {
          waveform: 'square?d=0.875',
          sampleRate: 44100,
          bpm: 290,
          waveEndsBy: 0.3
        },
        audio: {
          volume: 0.2
        }
      },
      notes: (function () {
        var overtune = [
          -20, [-3, 0.5], [-8, 0.5], [null, 0.5], [-8, 0.5], -3,
          [-20, 0.5], [-3, 0.5], -8, -3, -8,
          -19, [-3, 0.5], [-7, 0.5], [null, 0.5], [-7, 0.5], -3,
          [-19, 0.5], [-3, 0.5], -7, -3, -7,
          -17, [-3, 0.5], [-5, 0.5], [null, 0.5], [-5, 0.5], -3,
          [-17, 0.5], [-3, 0.5], -5, -3, -5,
          -20, [-3, 0.5], [-8, 0.5], -3, [-3, 0.5], [-3, 0.5],
          -3, -3, -4, null,

          -20, [-3, 0.5], [-8, 0.5], [null, 0.5], [-8, 0.5], -3,
          [-20, 0.5], [-3, 0.5], -8, -3, -8,
          -19, [-3, 0.5], [-7, 0.5], [null, 0.5], [-7, 0.5], -3,
          [-19, 0.5], [-3, 0.5], -7, -3, -7,
          -17, [-3, 0.5], [-5, 0.5], [null, 0.5], [-5, 0.5], -3,
          [-17, 0.5], [-3, 0.5], -5, -3, -5,
          -20, [-3, 0.5], [-8, 0.5], -3, [-3, 0.5], [-3, 0.5],
          -3, -3, -4, null
        ]
        var verse = [
          -20, [-3, 0.5], [-8, 0.5],
          -17, [-5, 0.5], [-11, 0.5],
          -19, [-7, 0.5], [-12, 0.5],
          -20, [-20, 0.5], [-8, 0.5],
          -20, -20, -20, -20,
          -20, [null, 3],

          -20, [-3, 0.5], [-8, 0.5], [null, 0.5], [-8, 0.5], -3,
          [-20, 0.5], [-3, 0.5], -8, -3, -8,
          -19, [-3, 0.5], [-7, 0.5], [null, 0.5], [-7, 0.5], -3,
          [-19, 0.5], [-3, 0.5], -7, -3, -7,
          -17, [-3, 0.5], [-5, 0.5], [null, 0.5], [-5, 0.5], -3,
          [-17, 0.5], [-3, 0.5], -5, -3, -5,
          -20, [-3, 0.5], [-8, 0.5], -3, [-3, 0.5], [-3, 0.5],
          0, -1, -3, null,

          -20, [-3, 0.5], [-8, 0.5], [null, 0.5], [-8, 0.5], -3,
          [-20, 0.5], [-3, 0.5], -8, -3, -8,
          -19, [-3, 0.5], [-7, 0.5], [null, 0.5], [-7, 0.5], -3,
          [-19, 0.5], [-3, 0.5], -7, -3, -7,
          -17, [-3, 0.5], [-5, 0.5], [null, 0.5], [-5, 0.5], -3,
          [-17, 0.5], [-3, 0.5], -5, -3, -5,
          -20, [-3, 0.5], [-8, 0.5], -3, [-3, 0.5], [-3, 0.5],
          0, -1, -3, null
        ]
        var chorus = overtune

        return overtune
          .concat(verse)
          .concat(chorus)
      })()
    }, {
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
      notes: (function () {
        var overtune = [
          -27, -15, -27, -15, -27, -15, -27, -15,
          -27, -19, -27, -19, -27, -19, -27, -19,
          -27, -17, -27, -17, -27, -17, -27, -17,
          -27, -20, -27, -20, -27, -20, -18, -17,

          -27, -15, -27, -15, -27, -15, -27, -15,
          -27, -19, -27, -19, -27, -19, -27, -19,
          -27, -17, -27, -17, -27, -17, -27, -17,
          -27, -20, -27, -20, -27, -20, -18, -17
        ]
        var verse = [
          -27, -15, -27, -17, -27, -19, -27, -20, -27, -27, -27, -27, -27, [null, 3]
        ].concat(overtune)

        var chorus = overtune

        return overtune
          .concat(verse)
          .concat(chorus)
      })()
    }, {
      name: 'noise',
      config: {
        instrument: {
          waveform: 'noise',
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
      notes: (function () {
        var repeatBase = function (times) {
          return _.flatten(_.map(_.times(times), _.constant(prelude.channels[4].notes)))
        }

        var overtune = repeatBase(8)

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

        return overtune
          .concat(verse)
          .concat(chorus)
      })()
    }, {
      name: 'fakedpcm',
      config: {
        instrument: {waveform: 'noise', sampleRate: 44100, bpm: 290, fadeOut: { from: 0.4, to: 0.9 }},
        audio: {volume: 0.1}
      },
      notes: (function () {
        var base1 = [
          [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4],
          [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4]
        ]

        var base2 = base1.concat(base1).concat(base1).concat([
          [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4],
          [0, 0.4], [null, 0.1], [0, 0.4], [null, 0.6], [0, 0.4], [null, 0.1],
          [0, 0.4], [null, 0.1], [0, 0.4], [null, 0.1],
          [0, 0.4], [null, 0.1], [0, 0.4], [null, 0.1]
        ])

        base2 = base2.concat(base2)

        var overtune = base2
        var verse = [
          [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4],
          [0, 0.4], [null, 1.6], [0, 0.6], [null, 1.4],
          [0, 0.4], [null, 0.6], [0, 0.4], [null, 0.6],
          [0, 0.4], [null, 0.6], [0, 0.4], [null, 0.6],
          [0, 0.4], [null, 0.6], null,
          [0, 0.4], [null, 0.6], [0, 0.4], [null, 0.1], [0, 0.4], [null, 0.1]
        ].concat(base2)
        var chorus = base2

        return overtune
          .concat(verse)
          .concat(chorus)
      })()
    }],
    loop: true
  }

  var chapters = [prelude, main]
  dispatchEvent(new CustomEvent('chaptersLoaded', {detail: chapters}))
})()
