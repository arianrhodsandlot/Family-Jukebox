define(['_'], function() {
  return _.flatten(_.map(_.times(4), _.constant([
    [0, .4], [null, 23.6]
  ])))
})
