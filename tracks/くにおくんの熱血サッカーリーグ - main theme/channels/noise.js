window.define(['_'], function (_) {
  var prelude = [
    [0, 0.5], [null, 2.5], [0, 0.5], [0, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [null, 1], [0, 0.5], [0, 0.5], [null, 2.5],
    [null, 3],
    [0, 0.5], [null, 2.5], [0, 0.5], [0, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [null, 4.5],
    [null, 2],
    [0, 0.5], [null, 2.5], [0, 0.5], [0, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [null, 1], [0, 0.5], [0, 0.5], [null, 2.5],
    [null, 3],
    [0, 0.5], [null, 2.5], [0, 0.5], [0, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [null, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [null, 4.5],
    [null, 2]
  ]

  var overtune = []

  var verse = []

  var chorus = []

  var main = overtune
    .concat(verse)
    .concat(chorus)

  return prelude
    .concat(main)
    .concat(main)
})
