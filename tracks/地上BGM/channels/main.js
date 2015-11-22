window.define(function () {
  // do--9 re--7 mi--5 fa--4 so--2 la-0 xi-2
  var prelude = [
    7, 7, null,
    7, null,
    3, 7, null,
    10, [null, 3],
    -2, [null, 3]
  ]

  var section1 = [
    3, [null, 2], -2,
    [null, 2], -5, null,
    null, 0, null, 2, null, 1, 0, null,

    -2, [null, 0.5], 7, [null, 0.5], 10, 12, null,
    8, 10, null,
    7, null, 3, 5, 2, [null, 2]
  ]
  var section2 = [
    [null, 2], -2, -3, -4, -6, null, -5, null,
    -14, -12, -9, null,
    -12, -9, -7, [null, 2],

    -2, -3, -4, -6, null, -5, null,
    3, null, 3, 3, [null, 4],

    null, -2, -3, -4, -6, null, -5, null,
    -14, -12, -9, null,
    -12, -9, -7, [null, 2],

    -6, [null, 2],
    -7, [null, 2],
    -9, [null, 7]
  ]
  var section3 = [
    -9, -9, null,
    -9, null,
    -9, -7, -5, -9, null, -12, -14, [null, 4],
    -9, -9, null,
    -9, null,
    -9, -7, -5, [null, 8],

    -9, -9, null,
    -9, null,
    -9, -7, -5, -9, null, -12, -14, [null, 4],
    -5, -5, null, -5,
    null, -9, -5, null,
    -2, [null, 3],
    -14, [null, 3]
  ]
  var section4 = [
    -5, -9, null, -14, [null, 2],
    -13, null, -12, -4, null, -4, -12, [null, 3],
    -10, [null, 0.5], 0, [null, 0.5], 0, [null, 0.5], 0, [null, 0.5],
    -2, -4, -5, -9, null,
    -12, -14, [null, 3],

    -5, -9, null, -14, [null, 2],
    -13, null, -12, -4, null, -4, -12, [null, 3],
    -10, -4, null, -4, -4, null,
    -5, -7, -9, -17, null,
    -17, -21, [null, 3]
  ]

  // do--9 re--7 mi--5 fa--4 so--2 la-0 xi-2
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
})
