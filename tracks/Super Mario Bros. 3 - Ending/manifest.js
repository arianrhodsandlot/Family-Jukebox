define(
  ['channels/square1.js', 'channels/square2.js', 'channels/triangle.js', 'channels/noise.js'],
  function (square1, square2, triangle, noise) {
    return {
      game: 'Super Mario Bros. 3',
      title: 'Ending',
      year: '1988',
      company: 'Nintendo',
      channels: [square1, square2, noise]
    }
})
