# Family Jukebox

## Website

http://arianrhodsandlot.github.io/Family-Jukebox/

## About

Create chiptune (8-bit music) with JavaScript in your browser!

Try [this example](http://arianrhodsandlot.github.io/Family-Jukebox/tracks/Super%20Mario%20Bros.%20-%20Ground%20Theme/) if you are still confused by what it is.

## Details

Generated audios sources are some WAVs, which can be played by modern browsers when it's wrapped with HTML5 `audio` tag.

Audios' waveforms are just those ever used in Nintendo's <abbr title="Family Computer">Famicom</abbr>, which also known as <abbr title="Nintendo Entertainment System">NES</abbr> in North America, such as square wave, trangle wave, and noise. The DPCM channel is not suported yet.

For those who want to have a try, here are some tips.

+ The easiest way to get started is making a copy of the [`./tracks/boilerplate`](https://github.com/arianrhodsandlot/Family-Jukebox/tree/master/tracks/boilerplate/) folder. Give the folder an awesome name like "melody" and enter it. The only things you need to do is modifing the `channels.js`. Serve the project folder with any HTTP server you are similar with such as [http-server](https://github.com/indexzero/http-server), then open your `http://localhost[:PORT]/tracks/melody/` with your browser.

 A *track* is composed by some different *channels*. You can fill a *channel* with an array in JavaScript.

 Each value of this array represents a note of the sheet music. The browser generates an [A](https://en.wikipedia.org/wiki/A440_%28pitch_standard%29) when here is a `0` in the array, and an A♭ for `-1`, a G for `-2`, a [rest](https://en.wikipedia.org/wiki/Rest_%28music%29) for `null`, etc.

+ For technical details...

  - take a look at the `Instrument` Class in [`./assets/track.js`](https://github.com/arianrhodsandlot/Family-Jukebox/tree/master/assets/track.js).

  - Take a look at [Pedro Ladaria](https://twitter.com/pladaria)'s project [riffwave.js](http://codebase.es/riffwave/), without which our tracks cannot even be performed as expected. It transforms our waves data to WAVs. Since [the original homepage of this project](http://codebase.es/riffwave/) has been not available for a long time, you can get it's source from [my backup Gist](https://gist.github.com/arianrhodsandlot/218e74f35e5f3a848754).

## License

MIT
