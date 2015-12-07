<h1>{ opts.title }</h1>

<section class="cover { paused ? '' : 'moving' }">
  <img class="cover-img" src="cover.jpg" alt="cover">
</section>

<section class="status">
  <p if="{ status === 'loading' }">loading {100 * progress}% ...</p>
  <p if="{ status === 'error' }">error...</p>
</section>

<section class="players">
  <div if="{ progress >= 0.8 }">
  <audio each="{ audio in audios }" controls="{ status === 'canplaythrough' }"></audio>
  </div>
</section>

<section class="controllers" if="{ status === 'canplaythrough' }">
  <a class="play" href="#" if="{ paused }" onclick="{ play }">START</a>
  <a class="pause" href="#" if="{ !paused }" onclick="{ pause }">PAUSE</a>
  <a class="stop" href="#" if="{ started }" onclick="{ stop }">STOP</a>
  <a class="reset" href="../../">RESET</a>
</section>
