import React, { useEffect, useState } from 'react'
import styles from "../styles/Auth.module.css"
import axios from 'axios'
import "../App.css"
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        fullname: "",
        email: "",
        password: ""
    });

    const handlechange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("fullname", formData.fullname);
            data.append("email", formData.email);
            data.append("password", formData.password);

            await axios.post("http://localhost:3000/api/auth/user/register", data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            // reset form after successful submission
            setFormData({ fullname: "", email: "", password: "" });
            // navigate to login after successful registration
            navigate('/user/login');
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    useEffect(() => {
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>User Register</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input type="text" placeholder="Full Name" name="fullname" className={styles.input} value={formData.fullname} onChange={handlechange} />
                        <input type="email" placeholder="Email" name="email" className={styles.input} value={formData.email} onChange={handlechange} />
                        <input type="password" placeholder="Password" name="password" className={styles.input} value={formData.password} onChange={handlechange} />
                        <button type="submit" className={styles.button}>Register</button>
                    </form>
                    <p className={styles.link}>
                        Already have an account? <a href="/user/login">Login</a>
                    </p>
                    <p className={styles.link}>
                        Register as a Partner? <a href="/food-partner/register">Click here</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default UserRegister