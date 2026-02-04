import React, { useEffect, useState } from 'react'
import styles from './UserProfile.module.css'
import axios from 'axios'
import Save from "../home/Save"
import { useNavigate } from 'react-router-dom'


const UserProfile = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);
  

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/user/profile",
      { withCredentials: true }
    )
    .then((res) => {
     console.log("frontend user data fetch", res.data);
     setUser(res.data.user)
     setLoading(false)
   })
   .catch((err) => {
     console.error("API Error:", err);
     setLoading(false)
   });
  }, [])

  // Ensure we never map over `null`.
  const userList = user ? (Array.isArray(user) ? user : [user]) : []


  return (
    <>
      <div className={styles.container}>
        {loading && <div className={styles.loading}>Loading profile…</div>}
        {!loading && userList.length === 0 && (
          <div className={styles.noProfile}>No profile data available.</div>
        )}

        {userList.map((v) => (
          v && (
            <header key={v._id} className={styles.header}>
              <div className={styles.left}>
                <div className={styles.avatar} />
                  <img className={styles.avatarImage} src={"https://media.gettyimages.com/id/2192202545/vector/avatar-profile-of-man-head-shape-flat-illustration.jpg?s=612x612&w=0&k=20&c=4B-EimX02cWXXZC_iPpQRiGkycmF6qtTWwzdD7o_XOo="} alt="himanshu" />
                <div className={styles.partnerName}>{v.fullname}</div>
              </div>

              {/* <div className={styles.right}>
                <div className={styles.businessName}>{v.BusinessName}</div>
                <div className={styles.shopDetails}>{v.shopDetails}</div>
                <div className={styles.descriptionBox}>{v.description}</div>
                <div className={styles.ratingRow}>
                  <span>Rating</span>
                  <div className={styles.stars}>★★★★★</div>
                </div>
              </div> */}
            </header>
          )
        ))}
      </div>

      <Save />

    </>
  )
}

export default UserProfile