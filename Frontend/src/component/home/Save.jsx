import React, { useEffect, useState } from 'react'
import styles from './Save.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Save = () => {
  const [saved, setSaved] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/food/saved', { withCredentials: true })
      .then(res => setSaved(res.data.saved || []))
      .catch(err => console.error('Failed to fetch saved videos', err))
  }, [])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Saved Videos</h2>
        <Link to="/home">Back</Link>
      </header>
      <div className={styles.grid}>
        {saved.length === 0 && <div className={styles.empty}>No saved videos yet.</div>}
        {saved.map(v => (
          <article key={v._id} className={styles.card}>
            <video src={v.foodvideo} controls className={styles.preview} preload="metadata" />
            <div className={styles.info}>{v.description}</div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Save
