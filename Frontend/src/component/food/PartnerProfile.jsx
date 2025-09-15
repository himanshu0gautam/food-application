import React, { useEffect, useState } from 'react'
import styles from './PartnerProfile.module.css'
import axios from 'axios'

// const sampleThumbs = [
//     '/video/v1.mp4',
//     '/video/v2.mp4',
//     '/video/v3.mp4',
//     '/video/v4.mp4',
//     '/video/v5.mp4',
// ]

const PartnerProfile = () => {

    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        axios.get("http://localhost:3000/api/auth/food-partner/profile", {
            withCredentials: true,
        })
            .then((res) => {
                console.log("API response", res.data);
                setPartner(res.data.partner);
                setLoading(false);
            })
            .catch((err) => {
                console.error("API Error:", err);
                // show server-provided message when available
                const msg = err?.response?.data?.message || err.message || "Failed to fetch partner profiles";
                setError(msg);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>loading....</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>
    if (!partner) return <p>No profile found</p>;
    // normalize to an array so .map is safe whether API returns object or array
    const partnerList = Array.isArray(partner) ? partner : [partner];

    return (
        <div className={styles.container}>
            {partnerList.map((p) => (
                <header key={p._id} className={styles.header}>
                    <div className={styles.left}>
                        <div className={styles.avatar} />
                        <div className={styles.partnerName}>{p.fullname}</div>

                    </div>
                    <div className={styles.right}>
                        <div className={styles.businessName}>{p.BusinessName}</div>
                        <div className={styles.shopDetails}>{p.shopDetails}</div>
                        <div className={styles.descriptionBox}>{p.description}</div>
                        <div className={styles.ratingRow}>
                            <span>Rating</span>
                            <div className={styles.stars}>★★★★★</div>
                        </div>
                    </div>
                </header>
            ))}

            {/* food videos */}

            <div className={styles.mealSection}>
               
                {/* <div className={styles.thumbRow}>
          {sampleThumbs.map((src, idx) => (
            <div key={idx} className={styles.thumbCircle}>
            <video src={src} className={styles.thumbVideo} muted />
            </div>
            ))}
            </div> */}
            <div className={styles.meal}>
            <h3 className={styles.mealTitle}>Meal</h3>
                <div className={styles.totalMeal}>
                    Total Meal: {partnerList[0]?.foodItems?.length || 0} {""} 
                    <span>Customer Serve: 3k</span></div>
            </div>

                <div className={styles.grid}>
                    {partnerList[0]?.foodItems?.map((item) => (
                        <div key={item._id} className={styles.gridItem}>
                            <h4>{item.foodname}</h4>  {/* ✅ correct field */}
                            
                            <video
                                src={item.foodvideo}   
                                className={styles.gridVideo}
                                controls
                                muted
                            />
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PartnerProfile