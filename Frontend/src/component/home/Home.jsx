import React, { useEffect, useRef } from 'react'
import styles from './Home.module.css'


const videos = [
  {
    id: 1, src: 'https://res.cloudinary.com/divy12kic/video/upload/v1757682022/foodModel/l33cc4wqnyizra9gge80.mp4',
    desc: 'Delicious street food from a local vendor. Try the spicy special today!'
  },
  {
    id: 2, src: 'https://res.cloudinary.com/divy12kic/video/upload/v1757682022/foodModel/l33cc4wqnyizra9gge80.mp4',
    desc: 'Freshly made desserts available at limited times—don\'t miss out.'
  },
  {
    id: 3, src: 'https://res.cloudinary.com/divy12kic/video/upload/v1757682022/foodModel/l33cc4wqnyizra9gge80.mp4',
    desc: 'Chef\'s recommendation: signature dish with seasonal ingredients.'
  },
  {
    id: 4, src: 'https://res.cloudinary.com/divy12kic/video/upload/v1757682022/foodModel/l33cc4wqnyizra9gge80.mp4',
    desc: 'Exclusive partner offer: get discounts when you visit the store.'
  },
]

const Home = () => {
  const containerRef = useRef(null)
  const videoRefs = useRef(new Map())

  useEffect(() => {
    const items = Array.from(containerRef.current?.querySelectorAll(`.${styles.item}`) || [])

    // helper to compute visible area of an element (intersection with viewport)
    const visibleArea = el => {
      const r = el.getBoundingClientRect()
      const top = Math.max(r.top, 0)
      const left = Math.max(r.left, 0)
      const bottom = Math.min(r.bottom, window.innerHeight)
      const right = Math.min(r.right, window.innerWidth)
      const h = bottom - top
      const w = right - left
      if (h <= 0 || w <= 0) return 0
      return h * w
    }

    const playMostVisible = () => {
      const first = items[0]?.querySelector('video')
      if (first) {
        first.play().catch(() => { })
      }
      let best = null
      let bestArea = 0
      items.forEach(item => {
        const area = visibleArea(item)
        if (area > bestArea) {
          bestArea = area
          best = item
        }
      })

      items.forEach(item => {
        const vid = item.querySelector('video')
        if (!vid) return
        if (item === best) vid.play().catch(() => { })
        else vid.pause()
      })
    }

    // initial pass
    playMostVisible()

    // update on scroll/resize to keep only one playing
    const onScroll = () => playMostVisible()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // fallback observer to pause videos that are nearly out of view
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const vid = entry.target.querySelector('video')
          if (!vid) return
          if (!entry.isIntersecting || entry.intersectionRatio < 0.25) vid.pause()
        })
      },
      { threshold: [0, 0.25, 0.5] }
    )
    items.forEach(i => observer.observe(i))

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <div className={styles.reel} ref={containerRef}>
      {videos.map(v => (
        <section className={styles.item} key={v.id} ref={el => el && videoRefs.current.set(v.id, el)}>
          <video
            className={styles.video}
            src={v.src}
            muted
            playsInline
            loop
            preload="metadata"
            autoPlay={false}
          />

          <div className={styles.overlay} aria-hidden>
            <div className={styles.meta}>
              <div className={styles.description}>{v.desc}</div>
              <button
                className={styles.visitBtn}
                onClick={() => window.location.href = `/partner/${v.id}`}
              >
                Visit Store
              </button>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Home