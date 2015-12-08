define(
  ['channels/square1.js', 'channels/square2.js', 'channels/triangle.js', 'channels/noise.js', 'channels/fakedpcm.js'],
  function (square1, fakedpcm, square2, triangle, noise) {
    return {
      game: 'Ninja Gaiden',
      title: 'Ryu\'s Determination',
      year: '1988',
      company: 'TECMO',
      channels: [square1, square2, triangle, noise, fakedpcm]
    }
})
