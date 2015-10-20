define(['_'], function() {
  return _.flatten(_.map(_.times(212), _.constant([
    [0, .2],
    [null, 1.8]
  ])))
})
