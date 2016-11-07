###
# RIFFWAVE.js v0.03 - Audio encoder for HTML5 <audio> elements.
# Copyleft 2011 by Pedro Ladaria <pedro.ladaria at Gmail dot com>
#
# Public Domain
#
# Changelog:
#
# 0.01 - First release
# 0.02 - New faster base64 encoding
# 0.03 - Support for 16bit samples
#
# Notes:
#
# 8 bit data is unsigned: 0..255
# 16 bit data is signed: âˆ’32,768..32,767
#
###

FastBase64 =
  chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  encLookup: []
  Init: ->
    i = 0
    while i < 4096
      @encLookup[i] = @chars[i >> 6] + @chars[i & 0x3F]
      i++
    return
  Encode: (src) ->
    len = src.length
    dst = ''
    i = 0
    while len > 2
      n = src[i] << 16 | src[i + 1] << 8 | src[i + 2]
      dst += @encLookup[n >> 12] + @encLookup[n & 0xFFF]
      len -= 3
      i += 3
    if len > 0
      n1 = (src[i] & 0xFC) >> 2
      n2 = (src[i] & 0x03) << 4
      if len > 1
        n2 |= (src[++i] & 0xF0) >> 4
      dst += @chars[n1]
      dst += @chars[n2]
      if len == 2
        n3 = (src[i++] & 0x0F) << 2
        n3 |= (src[i] & 0xC0) >> 6
        dst += @chars[n3]
      if len == 1
        dst += '='
      dst += '='
    dst
FastBase64.Init()

self.RIFFWAVE = (data) ->
  u32ToArray = (i) -> [i & 0xFF, i >> 8 & 0xFF, i >> 16 & 0xFF, i >> 24 & 0xFF]

  u16ToArray = (i) -> [i & 0xFF, i >> 8 & 0xFF]

  split16bitArray = (data) ->
    r = []
    j = 0
    len = data.length
    i = 0
    while i < len
      r[j++] = data[i] & 0xFF
      r[j++] = data[i] >> 8 & 0xFF
      i++
    r

  @data = []
  # Array containing audio samples
  @wav = []
  # Array containing the generated wave file
  @dataURI = ''
  # http://en.wikipedia.org/wiki/Data_URI_scheme
  @header =
    chunkId: [0x52, 0x49, 0x46, 0x46]
    chunkSize: 0
    format: [0x57, 0x41, 0x56, 0x45]
    subChunk1Id: [0x66, 0x6d, 0x74, 0x20]
    subChunk1Size: 16
    audioFormat: 1
    numChannels: 1
    sampleRate: 8000
    byteRate: 0
    blockAlign: 0
    bitsPerSample: 8
    subChunk2Id: [0x64, 0x61, 0x74, 0x61]
    subChunk2Size: 0

  @Make = (data) ->
    if data instanceof Array
      @data = data
    @header.blockAlign = @header.numChannels * @header.bitsPerSample >> 3
    @header.byteRate = @header.blockAlign * @sampleRate
    @header.subChunk2Size = @data.length * (@header.bitsPerSample >> 3)
    @header.chunkSize = 36 + @header.subChunk2Size
    @wav = @header.chunkId.concat(u32ToArray(@header.chunkSize), @header.format, @header.subChunk1Id, u32ToArray(@header.subChunk1Size), u16ToArray(@header.audioFormat), u16ToArray(@header.numChannels), u32ToArray(@header.sampleRate), u32ToArray(@header.byteRate), u16ToArray(@header.blockAlign), u16ToArray(@header.bitsPerSample), @header.subChunk2Id, u32ToArray(@header.subChunk2Size), if @header.bitsPerSample == 16 then split16bitArray(@data) else @data)
    @dataURI = 'data:audio/wav;base64,' + FastBase64.Encode(@wav)
    return

  if data instanceof Array
    @Make data
  return
