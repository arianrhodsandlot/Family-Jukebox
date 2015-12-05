define(
  ['channels/square1.js', 'channels/square2.js', 'channels/triangle.js', 'channels/noise.js'],
  function (square1, square2, triangle, noise) {
    return {
      game: 'くにおくんの熱血サッカーリーグ',
      title: 'main theme',
      year: '1989',
      desc: '',
      channels: [square1, square2, triangle, noise]
    }
})
