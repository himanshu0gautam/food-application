import React from 'react'
import styles from "../styles/Auth.module.css"
import "../App.css"

const PartnerRegister = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>Food Partner Register</h2>
                    <form className={styles.form}>
                        <input type="text" placeholder="Partner Name" className={styles.input} />
                        <input type="email" placeholder="Email" className={styles.input} />
                        <input type="password" placeholder="Password" className={styles.input} />
                        <button type="submit" className={styles.button}>Register</button>
                    </form>
                    <p className={styles.link}>
                        Already have an account? <a href="/partner/login">Login</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default PartnerRegister