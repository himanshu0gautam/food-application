import React, { useEffect, useRef, useState } from 'react'
import styles from './Home.module.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RxDoubleArrowUp } from "react-icons/rx";
import { PiShareFatThin } from "react-icons/pi";
import { FiBookmark } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { VscSaveAll } from "react-icons/vsc";
import { IoHomeOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { useNavigate, Link } from 'react-router-dom'
import Comment from '../home/Comment'
import { FaRegComment } from "react-icons/fa";
import { RiAddLargeFill } from "react-icons/ri";
// import { SiCarto } from "react-icons/si";
// import { FaPiggyBank } from "react-icons/fa";
// import { GiReceiveMoney } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
// import { MdAttachMoney } from "react-icons/md";
// import { LuMessageCircleMore } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
// import { IoMdNotificationsOutline } from "react-icons/io";
import { MdRestaurantMenu } from "react-icons/md";


const Home = ({ save, v, foodId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([])
  const containerRef = useRef(null)
  const videoRefs = useRef(new Map())
  const [isopenSwipe, setisopenSwipe] = useState(true);
  const [isdetails, setisdetails] = useState(false);

  const swipeActionButton = () => {
    setisopenSwipe(false);
    setisdetails(true);
  }

  // add quantity state and navigation
  const navigate = useNavigate()
  const [quantities, setQuantities] = useState({})

  const getQty = id => quantities[id] || 1
  const incQty = id => setQuantities(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }))
  const decQty = id => setQuantities(prev => {
    const current = prev[id] || 1
    const next = Math.max(1, current - 1)
    return { ...prev, [id]: next }
  })

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


  // useEffect(() => {
  //   const fetchfood = axios.get("http://localhost:3000/api/food/upload", { withCredentials: true })
  //   .then(res => {
  //     console.log("frontend food successful", res.data);

  //     setVideos(res.data.foodItems)
  //   })
  //   .catch(err => console.error("Video fetch error:", err))
  // }, [])

  const fetchFood = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/food/upload", { withCredentials: true })
      console.log("frontend food successful", res.data);
      setVideos(res.data.foodItems)

    } catch (error) {
      console.log("Video fetch error:", error);
    }
  }

  useEffect(() => {
    fetchFood();
  }, [])

  const location = useLocation()

  const handleHomeReload = () => {
    if (location.pathname === "/home") {
      document.body.classList.add("page-reload");
      setTimeout(() => window.location.reload(), 350);
    } else {
      window.location.href = "/home";
    }
  };


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

  const handleSaveFood = async (foodId) => {
    setLoading(true)
    try {
      const res = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId },
        { withCredentials: true }
      );
      console.log(res.data);

      // message = "food saved" OR "food unsaved"
      const { message } = res.data;

      setVideos((prevVideos) =>
        prevVideos.map((v) =>
          v._id === foodId
            ? {
              ...v, saved: message === "food saved",
              saveCount: v.saved
                ? v.saveCount - 1
                : v.saveCount + 1
            }
            : v
        )
      );
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false)
    }
  };

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [activeFoodId, setActiveFoodId] = useState(null);

  const handleComment = (id) => {
    // set the active food id from the clicked item and open the overlay
    console.log("comment clicked for foodId", id);
    setActiveFoodId(id);
    setIsOverlayOpen(true);
    console.log("Overlay open karne ka request bheji gayi", isOverlayOpen);
    if (isOverlayOpen === false) {
      setisopenSwipe(false);
    }
  }

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setActiveFoodId(null);
  };


  return (

    <div className={styles.reel} ref={containerRef}>

      {/* <div
          type="button"
          className={styles.reelTopLeftBtn}
          aria-label="reel-top-left-btn"
        onClick={() => setisopenSwipe(prev => !prev)}
        >
          <MdRestaurantMenu />
        </div> */}

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
          />

          {/* <div className={styles.overlay}>
            <div className={styles.meta}>
              <div className={styles.description}>{v.description}</div>
              <div className={styles.swipebtn}> Swipe Up for details & Order</div>
            </div>
          </div> */}

          {/* swipe btn */}
          {isopenSwipe && (
            <div className={styles.overlaybtn}>
              <div className={styles.metabtn}>
                {/* <div className={styles.swipebtn}><span onClick={() => { setisopen(false) }}><RxDoubleArrowUp /></span> Swipe up for details & Order</div> */}
                <div className={styles.swipebtn} onClick={swipeActionButton}>
                  <span role="img" aria-label="Swipe Up Icon"><RxDoubleArrowUp /></span>
                  <span>Swipe up for details & Order</span>
                </div>
              </div>
            </div>
          )}

          {isdetails && (
            <div className={styles.detailsModal}>
              <div className={styles.detailsModalContent}>

                {/* <h2>Product Details</h2>
                <div className={styles.description}>{v.description}</div>
                <div>{v.calories}</div> */}



                {/* <div className={styles.card}> */}
                <button
                  className={styles.detilsClodeBtn}
                  onClick={() => { setisdetails(false); setisopenSwipe(true) }}>
                  <MdCancel />
                </button>

                {/* Top Section: Profile and Follow Button */}
                <div className={styles.header}>
                  <div className={styles.chefInfo}>
                    {/* Chef Profile Image (Circular) */}
                    <img src={"https://media.gettyimages.com/id/2192202545/vector/avatar-profile-of-man-head-shape-flat-illustration.jpg?s=612x612&w=0&k=20&c=4B-EimX02cWXXZC_iPpQRiGkycmF6qtTWwzdD7o_XOo="} alt={"himanshu"} className={styles.profileImage} />
                    <div className={styles.textGroup}>
                      {/* Chef Name and Verification */}
                      <p className={styles.chefName}>himanshu <span className={styles.verified}>✔</span></p>
                      {/* Chef Handle */}
                      <p className={styles.chefHandle}>@himanshu</p>
                    </div>
                  </div>
                  {/* Follow Button */}
                  <button className={styles.followButton}>Follow</button>

                </div>

                {/* Recipe Title */}
                <h1 className={styles.recipeTitle}>{v.foodname}</h1>

                {/* Tags (Indian, Creamy) */}
                <div className={styles.tagContainer}>
                  <span className={styles.tag}>{v.typeOfFood}</span>
                  <span className={styles.tag}>{v.category}</span>
                </div>

                {/* Stats (Prep Time, Servings) */}
                <div className={styles.stats}>
                  <span>{v.preprationTime}</span>
                  <span className={styles.dot}>•</span>
                  <span>Calories :{v.calories}</span>
                </div>

                {/* Rating (Star and Count) */}
                <div className={styles.rating}>
                  <span className={styles.star}>⭐</span>
                  <span className={styles.ratingValue}>rating</span>
                  <span className={styles.reviewCount}>review count</span>
                </div>

                {/* Action Buttons */}
                <div className={styles.buttonContainer}>
                  {/* Add to Cart Button */}
                  <button className={styles.addToCartButton}>
                    <span className={styles.cartIcon}>Add to Cart</span>
                  </button>
                  {/* Order Now Button (Orange) */}
                  <button className={styles.orderNowButton}>${v.foodprice}</button>
                </div>
                {/* 🛒 */}

                {/* </div> */}


                {/* Add to cart */}
                {/* <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className={styles.visitBtn}
                        onClick={() => addToCart(v)}
                        type="button"
                      >
                        Add To Cart
                      </button>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button
                          className={styles.visitBtn}
                          onClick={() => decQty(v._id)}
                          aria-label="Decrease quantity"
                          type="button"
                        >
                          −
                        </button>
                        <div style={{ minWidth: 36, textAlign: 'center', color: '#fff' }}>
                          {getQty(v._id)}
                        </div>
                        <button
                          className={styles.visitBtn}
                          onClick={() => incQty(v._id)}
                          aria-label="Increase quantity"
                          type="button"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className={`${styles.visitBtn} ${styles.buyNow}`}
                        onClick={() => buyNow(v)}
                        type="button"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div> */}

              </div>
            </div>

          )}

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
              <div className={styles.commentContainer}>
                <div className={styles.actionItem} onClick={() => handleComment(v._id)}>
                  <span className={styles.icon}><FaRegComment /></span>
                  {/* <span className={styles.icon}><Comment /></span> */}
                  <span className={styles.count}>{v.commentCount || 0}</span>
                </div>
                <Comment
                  isOpen={isOverlayOpen}
                  onClose={handleCloseOverlay}
                  itemData={v}
                  foodId={activeFoodId}
                />
              </div>

              {/* Save */}
              <div className={styles.actionItem}>
                <span className={styles.icon}>
                  <FiBookmark color={v.saved ? "gold" : undefined} />
                  <button
                    onClick={() => handleSaveFood(v._id)}
                    disabled={loading}>
                    {/* {loading ? "Processing..." : isSaved ? "Unsave" : "Save"} */}
                  </button>
                </span>
                <span className={styles.count}>{v.saveCount || 0}</span>
              </div>

              {/* share */}
              <div className={styles.actionItem}>
                <span className={styles.icon}><PiShareFatThin /></span>
                <span className={styles.count}>{v.cartCount || "0"}</span>
              </div>

            </div>

          </div>


          <nav className={styles.bottomNav} aria-label="bottom navigation">
            <Link to="/user-profile">
              <div>
                <img className={styles.navButton} src={"https://media.gettyimages.com/id/2192202545/vector/avatar-profile-of-man-head-shape-flat-illustration.jpg?s=612x612&w=0&k=20&c=4B-EimX02cWXXZC_iPpQRiGkycmF6qtTWwzdD7o_XOo="} alt="profilephoto" />
              </div>
            </Link>
            {/* <Link to="/save" className={styles.navLink}>
              <div className={styles.navItem}><div className={styles.navLabel}><VscSaveAll /></div></div>
            </Link> */}
            <Link to="/notification" className={styles.navLink}>
              <div className={styles.navItem}><div className={styles.navLabel}><IoNotificationsOutline /></div></div>
            </Link>
            {/* <Link to="/create-food" className={styles.navLink}>
              <div className={styles.navItem}><div className={styles.homecreatefoodbtn}><RiAddLargeFill /></div></div>
            </Link> */}
            <div
              onClick={handleHomeReload}>
              <div className={styles.navItem}><div className={styles.navLabel}><IoHomeOutline /></div></div>
            </div>
            <Link to="/buy" className={styles.navLink}>
              <div className={styles.navLabel}><IoIosSearch /></div>
            </Link>
            <Link to="/cart" className={styles.navLink}>
              <div className={styles.navItem}><div className={styles.navLabel}><MdRestaurantMenu /></div></div>
            </Link>
          </nav>

        </section>

      ))}
    </div>

  )
}

export default Home
