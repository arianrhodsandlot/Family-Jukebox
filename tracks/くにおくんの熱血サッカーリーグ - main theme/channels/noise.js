window.define(['_'], function (_) {
  return _.flatten(_.map(_.times(100), _.constant([
    [0, 0.2], [null, 1.8]
  ])))
})
