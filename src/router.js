import { reactive, nextTick } from 'vue'

// Minimal client-side routing for the two kinds of pages: the home page and
// project pages (/work/:id). Navigating in-app keeps in-memory state, such as
// unlocked private work, that a full page load would reset.
export const route = reactive({ path: window.location.pathname })

// Async home sections can take a moment to exist, give up after this
const SCROLL_TARGET_TIMEOUT_MS = 2000

function isAppRoute(pathname) {
  return pathname === '/' || pathname.startsWith('/work/')
}

export function navigate(url) {
  const target = new URL(url, window.location.href)
  // Remember the position on the page we leave, so Back lands at the same spot
  history.replaceState({ ...history.state, scrollY: window.scrollY }, '')
  history.pushState({}, '', target.pathname + target.search + target.hash)
  route.path = target.pathname
  scrollAfterRender(target.hash, 0)
}

// Scrolls to the hash target (or to `top`) once the new page has rendered
function scrollAfterRender(hash, top) {
  const start = performance.now()

  const attempt = () => {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
    if (target) {
      target.scrollIntoView({ behavior: 'instant' })
      return
    }
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    if (!hash && scrollable >= top) {
      window.scrollTo({ top, behavior: 'instant' })
      return
    }
    if (performance.now() - start < SCROLL_TARGET_TIMEOUT_MS) {
      requestAnimationFrame(attempt)
    }
  }

  nextTick(attempt)
}

export function startRouter() {
  // Plain <a href> links to app routes stay in the app
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const link = event.target.closest('a[href]')
    if (!link || link.target || link.hasAttribute('download')) return

    const url = new URL(link.href)
    // Same-page links (#work, #top…) keep the browser's native behaviour
    if (url.origin !== window.location.origin || url.pathname === route.path) return
    if (!isAppRoute(url.pathname)) return

    event.preventDefault()
    navigate(url)
  })

  window.addEventListener('popstate', event => {
    // Hash-only history entries on the same page are handled by the browser
    if (window.location.pathname === route.path) return
    route.path = window.location.pathname
    // A remembered position wins over the hash: it's where the visitor actually was
    const scrollY = event.state?.scrollY
    scrollAfterRender(scrollY == null ? window.location.hash : '', scrollY ?? 0)
  })
}
