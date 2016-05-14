define(
  ['channels/square.js', 'channels/triangle.js', 'channels/noise.js'],
  function (square, triangle, noise) {
    return {
      game: 'The Goonies',
      title: 'Stage 1',
      year: '1987',
      company: 'Konami',
      channels: [square,  noise]
    }
  })
