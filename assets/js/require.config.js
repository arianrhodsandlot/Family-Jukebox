require.config({
  paths: {
    text: 'https://cdn.jsdelivr.net/requirejs.text/2.0.12/text.min',
    _: 'https://cdn.jsdelivr.net/lodash/3.10.1/lodash',
    riot: 'https://cdn.jsdelivr.net/riot/2.3.11/riot+compiler.min',
    RIFFWAVE: 'https://cdn.rawgit.com/arianrhodsandlot/218e74f35e5f3a848754/raw/28a27f75bdf21d36bea321c0e03d00b3e0fd6a89/riffwave',
    Instrument: '/assets/js/instrument',
    tags: '/assets/js/tags'
  },
  shim: {
    RIFFWAVE: {
      exports: 'RIFFWAVE'
    }
  }
})
