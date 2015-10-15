var sine = Instrument('square')
  .set('bpm', 480)
  .enable('autoplay')
  .perform(notes)

document.body.appendChild(sine.audio)
