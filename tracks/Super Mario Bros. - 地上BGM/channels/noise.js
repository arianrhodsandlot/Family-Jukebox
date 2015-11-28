window.define(function () {
  var prelude = [
    [0, 0.5], [null, 0.5], [0, 0.2], [null, 0.8], null, [0, 0.5], [null, 0.5],
    null, [0, 0.2], [null, 0.8], [0, 0.5], [null, 0.5], null,
    [0, 0.5], [null, 0.5], null, null, null,
    [0, 0.5], [null, 0.5],
    [0, 0.3], [null, 0.7],
    [0, 0.2], [null, 0.8],
    [0, 0.1], [null, 0.9]
  ]
  var base = [
    [0, 0.1], [null, 1.9],
    [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9],
    [0, 0.4], [null, 1.6],
    [0, 0.1], [null, 0.9],
    [0, 0.1], [null, 0.9]
  ]
  var section1 = base.concat(base).concat(base).concat(base)
  var section2 = section1.concat(section1)
  var section3 = prelude.concat(prelude).concat(prelude).concat(prelude)
  var section4 = section2
  return prelude
    .concat(section1)
    .concat(section1)
    .concat(section2)
    .concat(section2)
    .concat(section3)
    .concat(section1)
    .concat(section1)
    .concat(section4)
    .concat(section4)
    .concat(section3)
    .concat(section1)
})
