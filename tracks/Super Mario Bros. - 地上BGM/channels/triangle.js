define(function () {
  // do--9 re--7 mi--5 fa--4 so--2 la-0 xi-2
  var prelude = [
    -19, -19, null,
    -19, null,
    -19, -19, null,
    -2, [null, 3],
    -14, [null, 3]
  ]

  var section1 = [
    -14, [null, 2], -17,
    [null, 2], -21, null,
    null, -16, null, -14, null, -15, -16, null,

    -17, [null, 0.5], -9, [null, 0.5], -5, -4, null,
    -7, -5, null,
    -9, null, -12, -10, -14, [null, 2]
  ]
  var section2 = [
    -21, [null, 2], -14, [null, 2], -9, null,
    -16, [null, 2], -9, -9, null, -16, null,
    -21, [null, 2], -17, null, -14, -9, [null, 2],
    10, null, 10, 10, null, -14, null,

    -21, [null, 2], -14, [null, 2], -9, null,
    -16, [null, 2], -9, -9, null, -16, null,
    -21, [null, 1.5], -13, [null, 1.5], -11, [null, 2], -9,
    [null, 7]
  ]
  var section3 = [
    3, 3, null,
    3, null,
    3, 5, 7, 3, null, 0, -2, [null, 4],
    3, 3, null,
    3, null,
    3, 5, 7, [null, 8],

    3, 3, null,
    3, null,
    3, 5, 7, 3, null, 0, -2, [null, 4],
    7, 7, null, 7,
    null, 3, 7, null,
    10, [null, 3],
    -2, [null, 3]
  ]
  // do--9 re--7 mi--5 fa--4 so--2 la-0 xi-2
  section3 = [
    -25, [null, 2], -18, [null, 2], -13, null,
    -14, [null, 2], -21, [null, 2], -26, null,
    -25, [null, 2], -18, [null, 2], -13, null,
    -14, [null, 2], -21, [null, 2], -26, null,

    -25, [null, 2], -18, [null, 2], -13, null,
    -14, [null, 2], -21, [null, 2], -26, null,
    -19, -19, null,
    -19, null,
    -19, -19, null,
    -2, [null, 3],
    -14, [null, 3]
  ]
  var section4 = [
    -21, [null, 2], -15, -14, null, -9, null,
    -16, null, -16, null, -9, -9, -16, null,
    -19, [null, 2], -16, -14, null, -10, null,
    -14, null, -14, null, -9, -9, -14, null,

    -21, [null, 2], -15, -14, null, -9, null,
    -16, null, -16, null, -9, -9, -16, null,
    -14, [null, 2], -14, -14, -12, -10, -9,
    null, -14, null, -21, [null, 4]
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
    .concat(section1)
})
