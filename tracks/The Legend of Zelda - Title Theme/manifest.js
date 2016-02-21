define(
  ['channels/square1.js', 'channels/square2.js', 'channels/triangle.js', 'channels/noise.js'],
  function (square1, square2, triangle, noise) {
    return {
      game: 'The Legend of Zelda',
      title: 'Title Theme',
      year: '1986',
      company: 'Nintendo',
      channels: [square1, triangle, noise]
    }
  })
