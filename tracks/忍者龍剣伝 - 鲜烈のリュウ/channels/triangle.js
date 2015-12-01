define(function () {
  var prelude = [-27, -20, -27, -20, -27, -20, -27, -20]
  var overtune = [
    -27, -15, -27, -15, -27, -15, -27, -15,
    -27, -19, -27, -19, -27, -19, -27, -19,
    -27, -17, -27, -17, -27, -17, -27, -17,
    -27, -20, -27, -20, -27, -20, -18, -17,

    -27, -15, -27, -15, -27, -15, -27, -15,
    -27, -19, -27, -19, -27, -19, -27, -19,
    -27, -17, -27, -17, -27, -17, -27, -17,
    -27, -20, -27, -20, -27, -20, -18, -17,
  ]
  var verse = [
    -27, -15, -27, -17, -27, -19, -27, -20, -27, -27, -27, -27, -27, [null, 3]
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
