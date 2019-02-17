/* global location */
import Router from 'next/router'
import fetch from 'unfetch'
import SimplePeer from 'simple-peer'

export default async ({ assetPrefix }) => {
  Router.ready(() => {
    Router.events.on('routeChangeComplete', ping)
  })
  let peer, usePeer
  const onDemandEntriesURL = `${assetPrefix || ''}/_next/on-demand-entries-ping`

  // Use WebRTC if available
  if (SimplePeer.WEBRTC_SUPPORT) {
    peer = new SimplePeer({
      initiator: true,
      trickle: false
    })

    peer.on('connect', () => {
      usePeer = true
    })

    peer.on('error', err => {
      usePeer = false
      console.error('Error encountered with on-demand-entries-ping:', err)
    })

    peer.on('disconnect', () => {
      usePeer = false
    })

    peer.on('signal', offer => {
      fetch(onDemandEntriesURL, {
        method: 'GET',
        headers: {
          'offer': JSON.stringify(offer)
        }
      }).then(res => {
        res.json().then(data => {
          peer.signal(data)
        })
      }).catch(err => {
        console.error('Error setting up on-demand-entries-ping:', err)
      })
    })
  }

  async function ping () {
    const page = Router.pathname
    // Use WebRTC if set up
    if (usePeer) return peer.send(page)

    try {
      const url = `${onDemandEntriesURL}?page=${page}`
      const res = await fetch(url, {
        credentials: 'same-origin'
      })
      const payload = await res.json()
      if (payload.invalid) {
        // Payload can be invalid even if the page does not exist.
        // So, we need to make sure it exists before reloading.
        const pageRes = await fetch(location.href, {
          credentials: 'same-origin'
        })
        if (pageRes.status === 200) {
          location.reload()
        }
      }
    } catch (err) {
      console.error(`Error with on-demand-entries-ping: ${err.message}`)
    }
  }

  let pingerTimeout
  async function runPinger () {
    // Will restart on the visibilitychange API below. For older browsers, this
    // will always be true and will always run, but support is fairly prevalent
    // at this point.
    while (!document.hidden) {
      await ping()
      await new Promise(resolve => {
        pingerTimeout = setTimeout(resolve, 5000)
      })
    }
  }

  document.addEventListener(
    'visibilitychange',
    () => {
      if (!document.hidden) {
        runPinger()
      } else {
        clearTimeout(pingerTimeout)
      }
    },
    false
  )

  setTimeout(() => {
    runPinger().catch(err => {
      console.error(err)
    })
  }, 10000)
}
