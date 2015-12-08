define(
  ['channels/square1.js', 'channels/square2.js', 'channels/triangle.js', 'channels/noise.js'],
  function (square1, square2, triangle, noise) {
    return {
      game: 'Kunio Kun no Nekketsu Soccer League',
      title: 'main theme',
      year: '1993',
      company: 'Technōs Japan',
      channels: [square1, square2, triangle, noise]
    }
})
