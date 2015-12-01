define(['_'], function (_) {
  var base = [
    [0, 0.5], [null, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5],
  ]
  var repeatBase = function (times) {
    return _.flatten(_.map(_.times(times), _.constant(base)))
  }

  var prelude = repeatBase(2)

  var overtune = repeatBase(16)

  var verse = [
    [0, 0.5], [null, 0.5],
    [0, 0.5], [0, 0.5],
    [0, 0.5], [null, 0.5],
    [0, 0.5], [0, 0.5],
    [0, 0.5], [null, 0.5],
    [0, 0.5], [0, 0.5],
    [0, 0.5], [null, 0.5],
    [0, 0.5], [0, 0.5],
    [null, 8],
  ].concat(overtune)

  var chorus = overtune

  return prelude
    .concat(overtune)
    .concat(verse)
    .concat(chorus)
    .concat(overtune)
    .concat(verse)
    .concat(chorus)
    .concat(overtune)
})
