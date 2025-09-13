import React, { useState } from 'react'
import styles from "../styles/Auth.module.css"
import "../App.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const UserLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/user/login', { email, password }, { withCredentials: true });
            // if login successful, you may receive a token or cookie. Navigate to /home
            navigate('/home');
        } catch (err) {
            console.error('Login error', err);
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>User Login</h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className={styles.input} />
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className={styles.input} />
                        <button type="submit" className={styles.button}>Login</button>
                    </form>
                    <p className={styles.link}>
                        Don’t have an account? <a href="/user/register">Register</a>
                    </p>
                </div>
            </div>

        </>
    )
}

export default UserLogin