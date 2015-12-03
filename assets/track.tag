
<nav><a href="../.."><i class="fa fa-chevron-left"></i></a></nav>
<h1>{ opts.title }</h1>
<section class="cover"><img class="cover-img" src="cover.jpg" alt="cover"></section>
<section class="controllers" if="{ status === 'loaded' }">
  <a class="play" href="#" onclick="{ play }"><span class="fa fa-play"></span></a>
  <a class="pause" href="#" onclick="{ pause }"><span class="fa fa-pause"></span></a>
  <a class="stop" href="#" onclick="{ stop }"><span class="fa fa-stop"></span></a>
</section>
<section class="players">
  <p class="status" if="{ status === 'loading' }">loading...</p>
  <p class="status" if="{ status === 'error' }">error...</p>
  <p class="status" if="{ status === 'loaded' }">loaded!</p>
  <div if="{ status === 'loaded' }">
  <audio each="{ source in sources }" controls="{ status === 'loaded' }" riot-src="{ source }"></audio>
  </div>
</section>
