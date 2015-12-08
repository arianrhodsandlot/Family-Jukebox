define(
  ['channels/square1.js', 'channels/square2.js', 'channels/triangle.js', 'channels/noise.js'],
  function (square1, square2, triangle, noise) {
    return {
      game: 'Super Mario Bros.',
      title: '地上BGM',
      year: '1985',
      desc: '',
      channels: [square1, square2, triangle, noise]
    }
})
