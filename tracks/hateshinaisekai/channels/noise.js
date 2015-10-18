define(['_'], function() {
  return _.flatten(_.map(_.times(4), _.constant([
    [0, .2], [null, 11.3]
  ])))
})
