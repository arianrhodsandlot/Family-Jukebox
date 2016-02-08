define(
  ['channels/square1.js', 'channels/square2.js'],
  function (square1, square2, triangle, noise) {
    return {
      game: 'Final Fantasy II',
      title: 'prelude',
      year: '1988',
      company: 'Square',
      channels: [square1, square2]
    }
  })
