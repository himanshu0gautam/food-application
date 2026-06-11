import React, { useEffect, useState } from 'react'
import styles from "../../styles/auth.module.css"
// import "../App.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PartnerRegister = () => {

    const [formData, setFormData] = React.useState({
        fullname: "",
        email: "",
        password: "",
        BusinessName: "",
        shopDetails: "",
    });

    const navigate = useNavigate();

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
            data.append("BusinessName", formData.BusinessName);
            data.append("shopDetails", formData.shopDetails);

            await axios.post("http://localhost:3000/api/auth/food-partner/register", data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            // reset form after successful submission
            setFormData({ fullname: "", email: "", password: "", BusinessName: "", shopDetails: ""});
            navigate('/food-partner/login');
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
                    <h2 className={styles.title}>Food Partner Register</h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input type="text" placeholder="Partner Name" className={styles.input} name="fullname" value={formData.fullname} onChange={handlechange} />
                        <input type="email" placeholder="Email" className={styles.input} name="email" value={formData.email} onChange={handlechange} />
                        <input type="password" placeholder="Password" className={styles.input} name="password" value={formData.password} onChange={handlechange} />
                        <input type="text" placeholder="Business Name" className={styles.input} name="BusinessName" value={formData.BusinessName} onChange={handlechange} />
                        <input type="text" placeholder="Shop details" className={styles.input} name="shopDetails" value={formData.shopDetails} onChange={handlechange} />
                        <button type="submit" className={styles.button}>Register</button>
                    </form>
                    <p className={styles.link}>
                        Already have an account? <a href="/food-partner/login">Login</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default PartnerRegister