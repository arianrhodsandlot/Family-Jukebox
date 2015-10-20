define(['_'], function() {
  return _.flatten(_.map(_.times(100), _.constant([
    [0, .5], [null, 5.5]
  ])))
})
