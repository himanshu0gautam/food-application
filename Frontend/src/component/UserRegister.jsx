import React from 'react'
import styles from "../styles/Auth.module.css"
import "../App.css"

const UserRegister = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>User Register</h2>
                    <form className={styles.form}>
                        <input type="text" placeholder="Full Name" className={styles.input} />
                        <input type="email" placeholder="Email" className={styles.input} />
                        <input type="password" placeholder="Password" className={styles.input} />
                        <button type="submit" className={styles.button}>Register</button>
                    </form>
                    <p className={styles.link}>
                        Already have an account? <a href="/user/login">Login</a>
                    </p>
                    <p className={styles.link}>
                        Register as a partner? <a href="/food-partner/register">Click here</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default UserRegister