define(
  ['channels/square1.js', 'channels/triangle.js'],
  function (square1, triangle) {
    return {
      game: 'Circus Charlie',
      title: 'Stage 1',
      year: '1984',
      company: 'Konami',
      channels: [square1, triangle]
    }
  })
