# Family Jukebox

## Website

http://arianrhodsandlot.github.io/Family-Jukebox/

## About

Create chiptune (8-bit music) with JavaScript in your browser!

Try [this example](http://arianrhodsandlot.github.io/Family-Jukebox/#Super%20Mario%20Bros.%20-%20Ground%20Theme/) if you are still confused by what it is.

## Dive into it

Generated audios sources are some WAVs, which can be played by modern browsers'  Web Audio API.

Audios' waveforms are just those ever used in Nintendo's <abbr title="Family Computer">Famicom</abbr>, which also known as <abbr title="Nintendo Entertainment System">NES</abbr> in North America, such as square wave, trangle wave, and noise. The DPCM channel is not suported yet.

A *chapter* is composed by some different *channels*. You can fill a *channel* with an array in JavaScript. And a *Track* is a list with some *chapters*, which can have a loop attribute.

Each value of this array represents a note of the sheet music. The browser generates an [A](https://en.wikipedia.org/wiki/A440_%28pitch_standard%29) when here is a `0` in the array, and an A♭ for `-1`, a G for `-2`, a [rest](https://en.wikipedia.org/wiki/Rest_%28music%29) for `null`, etc.

For technical details...

- take a look at the `Instrument` Class in [`./assets/track-worker.js`](https://github.com/arianrhodsandlot/Family-Jukebox/tree/master/assets/track.js).

- Take a look at [Pedro Ladaria](https://twitter.com/pladaria)'s project [riffwave.js](http://codebase.es/riffwave/), without which our tracks cannot even be performed as expected. It transforms our waves data to WAVs. Since [the original homepage of this project](http://codebase.es/riffwave/) has been not available for a long time, you can get it's source from [my backup Gist](https://gist.github.com/arianrhodsandlot/218e74f35e5f3a848754).

- We are using [wavesurfer.js](https://wavesurfer-js.org/) for play audios with the Web Audio API easily.

## License

MIT
