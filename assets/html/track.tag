<section class="status">
  <p if="{ status === 'loading' }">loading...</p>
  <p if="{ status === 'error' }">
    There are some error... { error.message }
  </p>
</section>

<section class="players { status } { started ? 'started' : '' }">
  <div if="{ progress >= 0.8 }">
  <audio each="{ audio in audios }" controls="{ status === 'loaded' }"></audio>
  </div>
</section>

<section class="controllers" if="{ status === 'loaded' }">
  <a class="play" href="#" if="{ paused }" onclick="{ play }">START</a>
  <a class="pause" href="#" if="{ !paused }" onclick="{ pause }">PAUSE</a>
  <a class="stop" href="#" if="{ started }" onclick="{ stop }">STOP</a>
  <a class="reset" href="../../" onclick="{ reset }">RESET</a>
</section>

<section class="controllers" if="{ status !== 'loaded' }">
  <a class="reset" href="../../" onclick="{ reset }">RESET</a>
</section>

<section class="info">
  <p><i>{ opts.manifest.game }</i> - { opts.manifest.company } { opts.manifest.year }</p>
</section>
