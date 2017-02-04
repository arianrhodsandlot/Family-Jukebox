self.importScripts('https://cdn.jsdelivr.net/g/lodash@4.17.4')

/*
 * RIFFWAVE.js v0.03 - Audio encoder for HTML5 <audio> elements.
 * Copyleft 2011 by Pedro Ladaria <pedro.ladaria at Gmail dot com>
 *
 * Public Domain
 *
 * Changelog:
 *
 * 0.01 - First release
 * 0.02 - New faster base64 encoding
 * 0.03 - Support for 16bit samples
 *
 * Notes:
 *
 * 8 bit data is unsigned: 0..255
 * 16 bit data is signed: âˆ’32,768..32,767
 *
 */

var FastBase64 = {

    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encLookup: [],

    Init: function() {
        for (var i=0; i<4096; i++) {
            this.encLookup[i] = this.chars[i >> 6] + this.chars[i & 0x3F];
        }
    },

    Encode: function(src) {
        var len = src.length;
        var dst = '';
        var i = 0;
        while (len > 2) {
            n = (src[i] << 16) | (src[i+1]<<8) | src[i+2];
            dst+= this.encLookup[n >> 12] + this.encLookup[n & 0xFFF];
            len-= 3;
            i+= 3;
        }
        if (len > 0) {
            var n1= (src[i] & 0xFC) >> 2;
            var n2= (src[i] & 0x03) << 4;
            if (len > 1) n2 |= (src[++i] & 0xF0) >> 4;
            dst+= this.chars[n1];
            dst+= this.chars[n2];
            if (len == 2) {
                var n3= (src[i++] & 0x0F) << 2;
                n3 |= (src[i] & 0xC0) >> 6;
                dst+= this.chars[n3];
            }
            if (len == 1) dst+= '=';
            dst+= '=';
        }
        return dst;
    } // end Encode

}

FastBase64.Init();

var RIFFWAVE = function(data) {

    this.data = [];        // Array containing audio samples
    this.wav = [];         // Array containing the generated wave file
    this.dataURI = '';     // http://en.wikipedia.org/wiki/Data_URI_scheme

    this.header = {                         // OFFS SIZE NOTES
        chunkId      : [0x52,0x49,0x46,0x46], // 0    4    "RIFF" = 0x52494646
        chunkSize    : 0,                     // 4    4    36+SubChunk2Size = 4+(8+SubChunk1Size)+(8+SubChunk2Size)
        format       : [0x57,0x41,0x56,0x45], // 8    4    "WAVE" = 0x57415645
        subChunk1Id  : [0x66,0x6d,0x74,0x20], // 12   4    "fmt " = 0x666d7420
        subChunk1Size: 16,                    // 16   4    16 for PCM
        audioFormat  : 1,                     // 20   2    PCM = 1
        numChannels  : 1,                     // 22   2    Mono = 1, Stereo = 2...
        sampleRate   : 8000,                  // 24   4    8000, 44100...
        byteRate     : 0,                     // 28   4    SampleRate*NumChannels*BitsPerSample/8
        blockAlign   : 0,                     // 32   2    NumChannels*BitsPerSample/8
        bitsPerSample: 8,                     // 34   2    8 bits = 8, 16 bits = 16
        subChunk2Id  : [0x64,0x61,0x74,0x61], // 36   4    "data" = 0x64617461
        subChunk2Size: 0                      // 40   4    data size = NumSamples*NumChannels*BitsPerSample/8
    };

    function u32ToArray(i) {
        return [i&0xFF, (i>>8)&0xFF, (i>>16)&0xFF, (i>>24)&0xFF];
    }

    function u16ToArray(i) {
        return [i&0xFF, (i>>8)&0xFF];
    }

    function split16bitArray(data) {
        var r = [];
        var j = 0;
        var len = data.length;
        for (var i=0; i<len; i++) {
            r[j++] = data[i] & 0xFF;
            r[j++] = (data[i]>>8) & 0xFF;
        }
        return r;
    }

    this.Make = function(data) {
        if (data instanceof Array) this.data = data;
        this.header.blockAlign = (this.header.numChannels * this.header.bitsPerSample) >> 3;
        this.header.byteRate = this.header.blockAlign * this.sampleRate;
        this.header.subChunk2Size = this.data.length * (this.header.bitsPerSample >> 3);
        this.header.chunkSize = 36 + this.header.subChunk2Size;

        this.wav = this.header.chunkId.concat(
            u32ToArray(this.header.chunkSize),
            this.header.format,
            this.header.subChunk1Id,
            u32ToArray(this.header.subChunk1Size),
            u16ToArray(this.header.audioFormat),
            u16ToArray(this.header.numChannels),
            u32ToArray(this.header.sampleRate),
            u32ToArray(this.header.byteRate),
            u16ToArray(this.header.blockAlign),
            u16ToArray(this.header.bitsPerSample),
            this.header.subChunk2Id,
            u32ToArray(this.header.subChunk2Size),
            (this.header.bitsPerSample == 16) ? split16bitArray(this.data) : this.data
        );
        this.dataURI = 'data:audio/wav;base64,'+FastBase64.Encode(this.wav);
    };

    if (data instanceof Array) this.Make(data);

}; // end RIFFWAVE

var Instrument = function (options) {
  this.options = options
  this.options = _.defaults(this.options, {
    waveform: null,
    sampleRate: 44100,
    bpm: 120,
    waveEndsBy: 0.95,
    fadeOut: null
  })
  this.baseTime = this.options.sampleRate * 60 / this.options.bpm
  this.waveform = this.getWaveform()
}

Instrument.prototype.baseFrequency = 440

Instrument.prototype.get = function (k) {
  return this[k]
}

Instrument.prototype.getWaveform = function () {
  var sampleRate, waveforms
  if (_.isFunction(this.options.waveform)) {
    return this.options.waveform
  }
  sampleRate = this.options.sampleRate
  waveforms = {
    sine: function (frequency, x) {
      return 128 - 127 * Math.sin((x - frequency / sampleRate / 4) * 2 * Math.PI * frequency / sampleRate)
    },
    sawtooth: function (frequency, x) {
      return 255 * (x % Math.round(sampleRate / frequency)) / Math.round(sampleRate / frequency)
    },
    noise: _.partial(_.random, 0, 255)
  }
  _.assign(waveforms, {
    'square?d=0.875': _.flow(waveforms.sawtooth, Math.round, function (y) {
      if (y > 255 * 0.875) {
        return y
      } else {
        return 0
      }
    }),
    'square?d=0.75': _.flow(waveforms.sawtooth, Math.round, function (y) {
      if (y > 255 * 0.75) {
        return y
      } else {
        return 0
      }
    }),
    'square?d=0.5': _.flow(waveforms.sawtooth, Math.round, function (y) {
      if (y > 255 * 0.5) {
        return y
      } else {
        return 0
      }
    }),
    'square?d=0.25': _.flow(waveforms.sawtooth, Math.round, function (y) {
      if (y > 255 * 0.25) {
        return y
      } else {
        return 0
      }
    }),
    'square?d=0.125': _.flow(waveforms.sawtooth, Math.round, function (y) {
      if (y > 255 * 0.125) {
        return y
      } else {
        return 0
      }
    }),
    triangle: _.flow(waveforms.sawtooth, Math.round, function (y) {
      if (y < 255 / 2) {
        return y * 2
      } else {
        return (255 - y) * 2
      }
    })
  })
  _.assign(waveforms, {
    square: waveforms['square?d=0.5']
  })
  if (_.isFunction(this.options.waveform)) {
    return this.options.waveform
  } else {
    return _.get(waveforms, this.options.waveform) || waveforms.noise
  }
}

Instrument.prototype.createWave = function () {
  var riffwave = new RIFFWAVE
  riffwave.header.sampleRate = this.options.sampleRate
  riffwave.Make(this.data)
  this.riffwave = riffwave
  return this
}

Instrument.prototype.createBlob = function () {
  var splited = this.riffwave.dataURI.split(',')
  var byteString = atob(splited[1])
  var mimeString = splited[0].split(':')[1].split('')[0]
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)
  var i = 0
  while (i < byteString.length) {
    ia[i] = byteString.charCodeAt(i)
    i++
  }
  var blob = new Blob([ab], {
    type: mimeString
  })
  this.blob = blob
  return this
}

Instrument.prototype.createUrl = function () {
  this.url = URL.createObjectURL(this.blob)
  return this
}

Instrument.prototype.processWaveform = function (note) {
  if (!_.isArray(note)) note = [note, 1]
  var number = note[0]
  if (_.isNull(number)) return _.constant(0)
  var frequency = this.baseFrequency * Math.pow(2, number / 12)
  return _.partial(this.waveform, frequency)
}

Instrument.prototype.getMoments = function (note) {
  var length, time
  if (typeof note === 'number') note = [note, 1]
  length = note && note[1] ? note[1] : 1
  time = length * this.baseTime
  return _.range(0, time)
}

Instrument.prototype.createData = function (notes) {
  var end = this.baseTime * (1 - this.options.waveEndsBy)
  this.data = _(notes).map(_.memoize((function (_this) {
    return function (note) {
      var f, moments
      moments = _this.getMoments(note)
      f = _.flow(_this.processWaveform(note), Math.round)
      return _.map(moments, function (__, x) {
        var from, remain, time, to, xPos, y
        y = f(x)
        if (_this.options.fadeOut) {
          from = _this.options.fadeOut.from
          to = _this.options.fadeOut.to
          xPos = x / moments.length
          if (xPos > from && xPos < to) {
            y *= (to - xPos) / (to - from)
          }
        }
        time = moments.length
        remain = time - x
        if (remain >= end) {
          return y
        } else {
          return y * remain / time
        }
      })
    }
  })(this)))
  .flatten()
  .value()
  this.size = this.data.length
  return this
}

Instrument.prototype.perform = function (notes) {
  this.createData(notes).createWave().createBlob().createUrl()
  return this
}

self.addEventListener('message', function(e) {
  var channel = e.data
  var audio = new Instrument(channel.config.instrument).perform(channel.notes)
  self.postMessage({
    url: audio.get('url'),
    blob: audio.get('blob'),
    size: audio.get('size'),
    config: channel.config.audio
  })
}, false)
