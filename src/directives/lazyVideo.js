// v-lazy-video="src": a muted looping video that only downloads once it nears the viewport,
// and only plays while visible. `autoplay` alone would fetch every video on page load.
//
// Use on a <video muted loop playsinline preload="none"> without a :src.

const MARGIN = '300px' // start fetching a bit before it scrolls in

function load(el) {
  if (el.dataset.lazySrc && el.getAttribute('src') !== el.dataset.lazySrc) {
    el.src = el.dataset.lazySrc
  }
}

function play(el) {
  // Rejected when the browser blocks autoplay (e.g. low power mode): the poster stays, no harm done
  el.play()?.catch(() => {})
}

export const lazyVideo = {
  mounted(el, { value }) {
    el.dataset.lazySrc = value
    if (!('IntersectionObserver' in window)) {
      load(el)
      play(el)
      return
    }
    el._lazyVideoObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        load(el)
        play(el)
      } else if (!el.paused) {
        el.pause()
      }
    }, { rootMargin: MARGIN })
    el._lazyVideoObserver.observe(el)
  },
  updated(el, { value, oldValue }) {
    if (value === oldValue) return
    el.dataset.lazySrc = value
    // Already fetched: swap now. Otherwise the observer picks it up when it scrolls in
    if (el.getAttribute('src')) {
      load(el)
      play(el)
    }
  },
  unmounted(el) {
    el._lazyVideoObserver?.disconnect()
  },
}
