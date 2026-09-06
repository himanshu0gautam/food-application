import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import axios from "axios";
import Save from "../../home/Save/Save";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/user/profile", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("frontend user data fetch", res.data);
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  // Ensure we never map over `null`.
  const userList = user ? (Array.isArray(user) ? user : [user]) : [];

  return (
    <>
      <div className={styles.container}>
        {loading && <div className={styles.loading}>Loading profile…</div>}
        {!loading && userList.length === 0 && (
          <div className={styles.noProfile}>No profile data available.</div>
        )}

        {userList.map(
          (v) => {
            return v && (
              <header key={v._id} className={styles.header}>
                <div className={styles.left}>
                  <div className={styles.avatar} />
                  <img
                    className={styles.avatarImage}
                    src={"https://media.gettyimages.com/id/2192202545/vector/avatar-profile-of-man-head-shape-flat-illustration.jpg?s=612x612&w=0&k=20&c=4B-EimX02cWXXZC_iPpQRiGkycmF6qtTWwzdD7o_XOo="}
                    alt="himanshu" />
                </div>

                {/* <div className={styles.right}> */}
                <div className={styles.right}>
                  <div className={styles.topRow}>
                    <h2 className={styles.username}>{v.fullname}</h2>
                    <div
                      className={styles.menu}
                      onClick={() => setOpenMenu(true)}
                    >
                      <RxHamburgerMenu />
                    </div>
                  </div>

                  <div className={styles.statsRow}>
                    {/* <div className={styles.statItem}>
                          <span className={styles.statCount}>{v.postsCount || 0}</span> posts
                        </div> */}
                    <div className={styles.statItem}>
                      <span className={styles.statCount}>{v.followersCount || 0}</span> followers
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statCount}>{v.followingCount || 0}</span> following
                    </div>
                  </div>

                  <div className={styles.bioSection}>
                    <span className={styles.fullName}>{v.fullname}</span>
                    <p className={styles.bio}>{v.bio || "Digital creator & developer 🚀"}</p>
                    {v.website && (
                      <a
                        href={v.website}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.websiteLink}
                      >
                        {v.website}
                      </a>
                    )}
                  </div>
                </div>
                {/* <div
              className={styles.menu}
              onClick={() => setOpenMenu(true)}
            >
            <div className={styles.partnerName}>
              {v.fullname}
            </div>
              <RxHamburgerMenu />
            </div> */}
                {openMenu && (
                  <div className={styles.menuContent}>
                    <div
                      className={styles.closeButton}
                      onClick={() => setOpenMenu(false)}
                    >
                      <GrClose />
                    </div>
                    <div className={styles.menuItems}>
                      <div className={styles.menuItem}>Your Order</div>
                      <div className={styles.menuItem}>Appearance</div>
                      <div className={styles.menuItem}>edit profile</div>
                      <div className={styles.menuItem}>address</div>
                      <div className={styles.menuItem}>for employees</div>
                      <div className={styles.menuItem}>Your feedback</div>
                      <div className={styles.menuItem}>about</div>
                      <div className={styles.menuItem}>setting</div>
                      <div className={styles.menuItem}>logout</div>
                    </div>
                  </div>
                )}


                {/* <div className={styles.businessName}>{v.BusinessName}</div>
          <div className={styles.shopDetails}>{v.shopDetails}</div>
          <div className={styles.descriptionBox}>{v.description}</div>
          <div className={styles.ratingRow}>
            <span>Rating</span>
            <div className={styles.stars}>★★★★★</div>
          </div> */}
                {/* </div> */}

              </header>
            );
          },
        )}
      </div>

      <Save />
    </>
  );
};

export default UserProfile;
