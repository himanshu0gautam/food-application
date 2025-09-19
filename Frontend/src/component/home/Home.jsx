import React, { useEffect, useRef, useState } from 'react'
import styles from './Home.module.css'
import axios from 'axios'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { BsSave } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { useNavigate, Link } from 'react-router-dom'


const Home = () => {
  const [videos, setVideos] = useState([])
  const containerRef = useRef(null)
  const videoRefs = useRef(new Map())


  useEffect(() => {
    let rafId = null
    let observer = null

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
      const items = Array.from(containerRef.current?.querySelectorAll(`.${styles.item}`) || [])
      if (!items.length) return

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
        // ensure autoplay flags for browsers
        vid.muted = true
        vid.playsInline = true
        vid.autoplay = true
        if (item === best) {
          vid.play().catch(() => { })
        } else {
          try { vid.pause() } catch (e) { }
        }
      })
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        playMostVisible()
        rafId = null
      })
    }

    // Try to setup when DOM is rendered. If no items yet, retry shortly.
    const setup = () => {
      const items = Array.from(containerRef.current?.querySelectorAll(`.${styles.item}`) || [])
      if (!items.length) {
        // retry after short delay
        setTimeout(setup, 120)
        return
      }

      // initial attempt to play
      playMostVisible()

      // attach scroll listener to the reel element if present, otherwise window
      const scrollTarget = containerRef.current || window
      scrollTarget.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)

      // one-time user interaction to unlock autoplay on some mobile browsers
      const unlock = () => {
        const items = Array.from(containerRef.current?.querySelectorAll(`.${styles.item}`) || [])
        items.forEach(item => {
          const vid = item.querySelector('video')
          if (!vid) return
          vid.muted = true
          vid.play().catch(() => { })
        })
        window.removeEventListener('touchstart', unlock)
        window.removeEventListener('click', unlock)
      }
      window.addEventListener('touchstart', unlock, { once: true })
      window.addEventListener('click', unlock, { once: true })

      // observer fallback to pause videos that are out of view
      observer = new IntersectionObserver(
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
    }

    setup()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      const scrollTarget = containerRef.current || window
      scrollTarget.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('touchstart', () => { })
      window.removeEventListener('click', () => { })
      if (observer) observer.disconnect()
    }
  }, [])

  useEffect(() => {
    axios.get("http://localhost:3000/api/food/upload", { withCredentials: true })
      .then(res => {
        console.log(res.data);

        setVideos(res.data.foodItems)
      })
      .catch(err => console.error("Video fetch error:", err))
  }, [])


  const likefood = async (food) => {
    try {

      const res = await axios.post("http://localhost:3000/api/food/like", {
        foodId: food._id,
      }, { withCredentials: true });

      const { like, likeCount } = res.data;

      setVideos(prev => prev.map(f => f._id === food._id ? { ...f, likeCount, userLike: like } : f
      ))

    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };


  return (
    // <div className={styles.reel} ref={containerRef}>
    //   {videos.map(v => (
    //     <section data-id={v._id} className={styles.item} key={v._id} ref={el => el && videoRefs.current.set(v._id, el)}>
    //       <video
    //         className={styles.video}
    //         src={v.foodvideo}
    //         muted
    //         playsInline
    //         loop
    //         preload="metadata"
    //         autoPlay
    //       />

    //       <div className={styles.overlay} aria-hidden>
    //         <div className={styles.meta}>
    //           <div className={styles.description}>{v.description}</div>
    //           <Link to={"/partner-profile"}>
    //             <button
    //               className={styles.visitBtn}
    //             >
    //               Visit Store
    //             </button>
    //           </Link>
    //         </div>
    //       </div>
    //     </section>
    //   ))}

    //   <div className={styles.actions} aria-hidden>
    //     {videos.map(v => (
    //       <div key={v._id} className={styles.actionColumn}>
    //         <div className={styles.actionItem} onClick={() => likefood(v)}>
    //           <span className={styles.icon}>
    //            {v.userLike ? <FaHeart color="red" /> : <FaRegHeart />}</span>
    //           <span className={styles.count}>{v.likeCount || 0}</span>
    //         </div>
    //         <div className={styles.actionItem} onClick={() => openComments(v)}>
    //           <span className={styles.icon}><FaRegComment /></span>
    //           <span className={styles.count}>{v.commentCount || 0}</span>
    //         </div>
    //         <div className={styles.actionItem} onClick={() => saveVideo(v)}>
    //           <span className={styles.icon}><FiBookmark color={v.saved ? 'gold' : undefined} /></span>
    //           <span className={styles.count}>{v.saveCount || 0}</span>
    //         </div>
    //         <div className={styles.actionItem}>
    //           <span className={styles.icon}><BsCart3 /></span>
    //           <span className={styles.count}>{v.cartCount || '-'}</span>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {/* Bottom navigation bar */}
    //   <nav className={styles.bottomNav} aria-label="bottom navigation">
    //     <button className={styles.navButton} aria-label="record"></button>
    //     <Link to="/home" className={styles.navLink}>
    //       <div className={styles.navItem}><IoHomeOutline /><div className={styles.navLabel}>Home</div></div>
    //     </Link>
    //     <Link to="/save" className={styles.navLink}>
    //       <div className={styles.navItem}><BsSave /><div className={styles.navLabel}>Save</div></div>
    //     </Link>
    //     <Link to="/buy" className={styles.navLink}>
    //       <div className={styles.buyNow}>→<div className={styles.navLabel}>Buy Now</div></div>
    //     </Link>
    //   </nav>
    // </div>


    <div className={styles.reel} ref={containerRef}>
      {videos.map(v => (
        <section
          data-id={v._id}
          className={styles.item}
          key={v._id}
          ref={el => el && videoRefs.current.set(v._id, el)}
        >
          <video
            className={styles.video}
            src={v.foodvideo}
            muted
            playsInline
            loop
            preload="metadata"
            autoPlay
          />

          <div className={styles.overlay} aria-hidden>
            <div className={styles.meta}>
              <div className={styles.description}>{v.description}</div>
              <Link to={"/partner-profile"}>
                <button className={styles.visitBtn}>Visit Store</button>
              </Link>
            </div>
          </div>

          {/* 👇 Action bar like, comment, save */}

          <div className={styles.actions} aria-hidden>
            <div className={styles.actionColumn}>
              {/* Like */}
              <div className={styles.actionItem} onClick={() => likefood(v)}>
                <span className={styles.icon}>
                  {v.userLike ? <FaHeart color="red" /> : <FaRegHeart />}
                </span>
                <span className={styles.count}>{v.likeCount || 0}</span>
              </div>

              {/* Comment */}
              <div className={styles.actionItem} onClick={() => openComments(v)}>
                <span className={styles.icon}><FaRegComment /></span>
                <span className={styles.count}>{v.commentCount || 0}</span>
              </div>

              {/* Save */}
              <div className={styles.actionItem} onClick={() => saveVideo(v)}>
                <span className={styles.icon}>
                  <FiBookmark color={v.saved ? "gold" : undefined} />
                </span>
                <span className={styles.count}>{v.saveCount || 0}</span>
              </div>

              {/* Cart */}
              <div className={styles.actionItem}>
                <span className={styles.icon}><BsCart3 /></span>
                <span className={styles.count}>{v.cartCount || "-"}</span>
              </div>

            </div>

          </div>


          <nav className={styles.bottomNav} aria-label="bottom navigation">
            <button className={styles.navButton} aria-label="record"></button>
            <Link to="/home" className={styles.navLink}>
              <div className={styles.navItem}><IoHomeOutline /><div className={styles.navLabel}>Home</div></div>
            </Link>
            <Link to="/save" className={styles.navLink}>
              <div className={styles.navItem}><BsSave /><div className={styles.navLabel}>Save</div></div>
            </Link>
            <Link to="/buy" className={styles.navLink}>
              <div className={styles.buyNow}>→<div className={styles.navLabel}>Buy Now</div></div>
            </Link>
          </nav>

        </section>

      ))}
    </div>

  )
}

export default Home