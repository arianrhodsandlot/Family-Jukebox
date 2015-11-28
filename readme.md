# Family Jukebox

## Website

http://arianrhodsandlot.github.io/Family-Jukebox/

## About

Create chiptune (8-bit music) with JavaScript in your browser!

Try [this example](http://arianrhodsandlot.github.io/Family-Jukebox/tracks/Super%20Mario%20Bros.%20-%20%E5%9C%B0%E4%B8%8ABGM/) if you are still confused by what it is.

## Details

Generated audios sources are in format WAV, which can be played by almost all modern browsers when it's wrapped with HTML5 `<audio>` tag.

Audios' waveforms are just those ever used in Nintendo's <abbr title="Family Computer">Famicom</abbr>, which also known as <abbr title="Nintendo Entertainment System">NES</abbr> in North America, such as square wave, trangle wave, and noise. The DPCM channel is not suported yet.

For those who want to take a try, here are some tips.

+ A *track* is composed by 4 different *channels*. You can fill a *channel* with an array in JavaScript.

 Each value of this array represents a note of the sheet music. The browser will generate an [A](https://en.wikipedia.org/wiki/A440_%28pitch_standard%29) when here is an `0` in the array, and an A♭ for `-1`, a G for `-2`, a [rest](https://en.wikipedia.org/wiki/Rest_%28music%29) for `null`, etc.

 Demo notes: [`./tracks/demo/channels/`](https://github.com/arianrhodsandlot/Family-Jukebox/tree/master/tracks/demo/channels).
+ For technical details, take a look at the [`index.js`](https://github.com/arianrhodsandlot/Family-Jukebox/tree/master/tracks/demo/index.js)  in [`./tracks/demo/`](https://github.com/arianrhodsandlot/Family-Jukebox/tree/master/tracks/demo) or any other single track project folders in [`./tracks/`](https://github.com/arianrhodsandlot/Family-Jukebox/tree/master/tracks).

 It's easy to create a new track based on one of these completed tracks.

+ For even more advanced technical details...
  - Take a look at the codes in [`./assets/instrument.js`](https://github.com/arianrhodsandlot/Family-Jukebox/tree/master/assets/instrument.js).

  - Take a look at [Pedro Ladaria](https://twitter.com/pladaria)'s lovely project [RIFFWAVE.js](http://codebase.es/riffwave/). Since [the original homepage of this project](http://codebase.es/riffwave/) may be not available at this time, you can find out it's source code from [my backup Gist](https://gist.github.com/arianrhodsandlot/218e74f35e5f3a848754).

## License

MIT
