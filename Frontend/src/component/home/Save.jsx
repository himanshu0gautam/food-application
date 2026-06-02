import React, { useEffect, useState } from 'react'
import styles from './Save.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Save = () => {
  const [saved, setSaved] = useState([])

  useEffect(() => {
    ; (async () => {
      const res = await axios.get('http://localhost:3000/api/food/saveFood', { withCredentials: true })
      console.log(res.data);

      setSaved(res.data.save.map(s => s.food))
      console.log(res.data.save);
    })()
  }, [])

  return (

    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Saved Videos</h2>
        <Link to="/">Back</Link>
      </header>
      <div className={styles.grid}>
        {saved.length === 0 && <div className={styles.empty}>No saved videos yet.</div>}
        {saved.map(v => (
          <section key={v._id} className={styles.card} data-id={v._id}>
            <video
              className={styles.preview}
              src={v.foodvideo}
              muted
              playsInline
              loop
              preload="metadata"
              autoPlay
            />
            {/* <div className={styles.info}>{v.description}</div> */}
          </section>
        ))}
      </div>
    </div>
  )
}

export default Save
