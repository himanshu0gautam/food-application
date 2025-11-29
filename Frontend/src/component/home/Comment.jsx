import React from 'react'
import styles from './Comment.module.css'
import { FaRegComment } from "react-icons/fa";
import { useState } from 'react';
import Home from "./Home"

const comment = ({ isOpen, onClose, itemData }) => {

    if (!isOpen) {
        return null;
    }

    return (
        <>
           <div className={styles.commentOverlay}>
            <div className={styles.commentModal}>
            
                {/* 💡 Close button par 'onClose' function ko call karein */}
                <h2>Comments</h2>
                <button onClick={onClose} className={styles.closeButton}>
                    Close
                </button>
                
                {/* Yahan aap comments list aur input field dal sakte hain */}
                <p>Overlay content goes here...</p>
                
            </div>
        </div>
        </>
    )
}

export default comment