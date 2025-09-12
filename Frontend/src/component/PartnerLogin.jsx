import React from 'react'
import styles from "../styles/Auth.module.css"
import "../App.css"

const PartnerLogin = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>Food Partner Login</h2>
                    <form className={styles.form}>
                        <input type="email" placeholder="Email" className={styles.input} />
                        <input type="password" placeholder="Password" className={styles.input} />
                        <button type="submit" className={styles.button}>Login</button>
                    </form>
                    <p className={styles.link}>
                        Don’t have an account? <a href="/partner/register">Register</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default PartnerLogin