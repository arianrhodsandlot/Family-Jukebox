var getNoteCode = function(note, accidental, pitch) {
  var noteCode

  note = note.toLowerCase()
  pitch = _.isUndefined(pitch) ? 4 : pitch

  switch (note) {
    case 'c':
    case 'd':
    case 'e':
      noteCode = note.charCodeAt() * 2 - 138
      break
    case 'f':
    case 'g':
      noteCode = note.charCodeAt() * 2 - 139
      break
    case 'a':
    case 'b':
      noteCode = note.charCodeAt() * 2 - 125
      break
    case '0':
      return 0
  }

  switch (accidental) {
    case '#':
    case 'sharp':
      noteCode += 1
      break
    case 'b':
    case 'bemolle':
    case 'flat':
      noteCode -= 1
      break
  }

  noteCode += (pitch - 4) * 12

  return noteCode
}

var n1n1 = 'd # 2'
var n2n1 = 'f _ 2'
var n3n1 = 'g _ 2'
var n4n1 = 'g # 2'
var n5n1 = 'a # 2'
var n6n1 = 'c _ 3'
var n7n1 = 'd _ 3'

var n1 = 'd # 3'
var n2 = 'f _ 3'
var n3 = 'g _ 3'
var n4 = 'g # 3'
var n5 = 'a # 3'
var n6 = 'c'
var n7 = 'd'

var n11 = 'd #'
var n12 = 'f'
var n13 = 'g'
var n14 = 'g #'
var n15 = 'a #'

var notes = _.map([
  0,

  // verse
  n5, n5, 0, n5, n5, 0, n5, n5, n5, 0,
  n4, n4, n3, n3, n4, n4,

  n5, n5, 0, n5, n5, 0, n11, n11, n11, 0,
  n7, n7, n11, n11, n12, n12,

  n13, n13, 0, n13, n13, 0, n13, n13, n13, 0,
  n12, n12, n11, n11, n7, n7,

  n5, n5, n5, 0, n12, n12,
  n11, n11, n11, n11, n11, n11, 0, 0, 0, 0,


  n5, n5, 0, n5, n5, 0, n5, n5, n5, 0,
  n4, n4, n3, n3, n4, n4,

  n5, n5, 0, n5, n5, 0, n11, n11, n11, 0,
  n7, n7, n11, n11, n12, n12,

  n13, n13, 0, n13, n13, 0, n13, n13, n13, 0,
  n12, n12, n11, n11, n7, n7,

  n5, n5, n5, n12, n12, n12,
  n11, n11, n11, 0,


  // pre-chorus
  n7, n7, n11, n11, n12, n12,
  'f #', 'f #', 'f #', 'f #',
  'f #', 'f #', 'f #', 'f #', 'f #', 0,
  'f #', 'f #', n12, n12, n11, n11,
  n11, n11, n5, n5, n5, n5, n5,
  n5, n5, n5, n5, n5, n5, 0,
  n3, n3, n4, n4, n4, n4, n4, 0, n4, n4,
  n11, n11, n11, n11, n7, n7, n6, n6, n6, n6, n5, n5, n5, n5, n5, n5, n5, n5, n5, n5, n5, 0,

  n5, n5, n6, n6, n6, n6, n6, 0,
  n11, n11, n7, n7, n5, n5, n6, n6, n7, n7,
  n11, n11, n11, 0, n15, n15, n12, n12, n12, n12, n11, n11, n7, n7, n7, n7,
  n11, n11, 'b _ 3', 'b _ 3', 'c #', 'c #', n11, n11, n12, n12, n11, n11, n11, n11, n11, n11, n13, n13, n13, n13, n13, n13, n13, 0,


  // chorus
  n13, n13, n14, n14, n15, n15, n13, n11, n11, n11, n11, n11, n11, 0,
  n11, n11, n13, n13, n14, n14, n13, n13, n12, n11, n11, n11, n11, n11, n11, 0, n11, n11,

  n13, n13, n14, n14, n15, n15, n13, n11, n11, n11, n11, n11, n11, 0, n11, n11,
  n13, n13, n14, n14, n13, n13, n15, n15, n15, n15, 'a', 'a', n15, n15, n15, n15, n15, n15, n15, n15, n15, n15, 0,

  n11, n11, n15, n15, n15, n15, n11, n11, n11, n11, n11, 0,
  n7, n7, n11, n11, n12, n12, n13, n13, n13, n13, n12, n12, n12, n12, n11, n11, n11, n11, n11, 0,

  n11, n11, n6, n6, n6, n6, n6, 0,
  n6, n6, n13, n13, n12, n12, n11, n11, n7, n11, n11, n11, n11, n11, n11, n11, 0, 0,


  n13, n13, n14, n14, n15, n15, n13, n11, n11, n11, n11, n11, n11, 0,
  n11, n11, n13, n13, n14, n14, n13, n13, n12, n11, n11, n11, n11, n11, n11, 0, n11, n11,

  n13, n13, n14, n14, n15, n15, n13, n11, n11, n11, n11, n11, n11, 0, n11, n11,
  n13, n13, n14, n14, n13, n13, n15, n15, n15, n15, 'a', 'a', n15, n15, n15, n15, n15, n15, n15, n15, n15, n15, 0,

  n11, n11, n15, n15, n15, n15, n11, n11, n11, n11, n11, 0,
  n7, n7, n11, n11, n12, n12, n13, n13, n13, n13, n12, n12, n12, n12, n11, n11, n11, n11, n11, 0,

  n11, n11, n6, n6, n6, n6, n6, 0,
  n6, n6, n13, n13, n12, n12, n11, n11, n7, n11, n11, n11, n11, n11, n11, n11, n11, n11, n11, n11, 0, 0,

], _.memoize(function(note) {
  return getNoteCode.apply(null, (note + '').split(' '))
}))
