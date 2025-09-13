import React, { useState } from 'react'
import styles from "../styles/Auth.module.css"
import "../App.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PartnerLogin = () => {

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

    const navigate = useNavigate()

         const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/food-partner/login', { email, password }, { withCredentials: true });
            // if login successful, you may receive a token or cookie. Navigate to /home
            navigate('/create-food');
        } catch (err) {
            console.error('Login error', err);
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>Food Partner Login</h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input type="email" placeholder="Email" className={styles.input} value={email} onChange={e => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" className={styles.input} value={password} onChange={e => setPassword(e.target.value)} />
                        <button type="submit" className={styles.button}>Login</button>
                    </form>
                    <p className={styles.link}>
                        Don’t have an account? <a href="/food-partner/register">Register</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default PartnerLogin