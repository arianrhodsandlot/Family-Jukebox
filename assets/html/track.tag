<nav><a href="../.."><i class="fa fa-chevron-left"></i></a></nav>
<h1>{ opts.title }</h1>
<section class="cover"><img class="cover-img" src="cover.jpg" alt="cover"></section>
<section class="controllers" if="{ status === 'canplaythrough' }">
  <a class="play" href="#" onclick="{ play }"><span class="fa fa-play"></span></a>
  <a class="pause" href="#" onclick="{ pause }"><span class="fa fa-pause"></span></a>
  <a class="stop" href="#" onclick="{ stop }"><span class="fa fa-stop"></span></a>
</section>

<section class="players">
  <p class="status" if="{ status === 'loading' }">loading {100 * progress}% ...</p>
  <p class="status" if="{ status === 'error' }">error...</p>
  <div if="{ progress >= 0.8 }">
  <audio each="{ source in sources }" controls="{ status === 'canplaythrough' }" riot-src="{ source }"></audio>
  </div>
</section>
