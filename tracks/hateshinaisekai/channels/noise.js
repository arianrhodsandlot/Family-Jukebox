define(['_'], function() {
  return _.flatten(_.map(_.times(0), _.constant([
    [0, 5], [null, 4],
    [0, 5], [null, 10]
  ])))
})
