define(
  ['channels/square1.js', 'channels/square2.js', 'channels/triangle.js', 'channels/noise.js'],
  function (square1, square2, triangle, noise) {
    return {
      game: '忍者龍剣伝',
      title: '鲜烈のリュウ',
      year: '1985',
      desc: '',
      channels: [square1, square2, triangle, noise]
    }
})
