var demonotes = [-7, -5, -3, -2, 0, 2, 4, _]

document.body.appendChild(
  Instrument('sine')
  .set('bpm', 480)
  .enable('autoplay')
  .perform(demonotes)
  .getAudio()
)

_.delay(function() {
  document.body.appendChild(
    Instrument('square')
    .set('bpm', 480)
    .enable('autoplay')
    .perform(demonotes)
    .getAudio()
  )

  _.delay(function() {
    document.body.appendChild(
      Instrument('sawtooth')
      .set('bpm', 480)
      .enable('autoplay')
      .perform(demonotes)
      .getAudio()
    )

    _.delay(function() {
      document.body.appendChild(
        Instrument('pulse')
        .set('bpm', 480)
        .enable('autoplay')
        .perform(demonotes)
        .getAudio()
      )

      _.delay(function() {
        document.body.appendChild(
          Instrument('noise')
          .set('bpm', 480)
          .enable('autoplay')
          .perform(demonotes)
          .getAudio()
        )
      }, 1000)
    }, 1000)
  }, 1000)
}, 1000)
