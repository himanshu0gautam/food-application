import { useState, useEffect } from 'react';
import styles from './Comment.module.css'
import socket from "../../../src/socket.jsx"
import axios from "axios";

const Comment = ({ isOpen, onClose, itemData, foodId, userId, commentText }) => {


    if (!isOpen) {
        return null;
    }

    const [text, setText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [activeReply, setActiveReply] = useState(null);
    const [comments, setComments] = useState([]);


    // useEffect(() => {
    //     if (foodd) {
    //         const fetchUserData = async () => {
    //             try {

    //                 const res = axios.get(`http://localhost:3000/api/food/user/${postId}`)
    //                     .then((res) => {
    //                         setComments(res.data.comments)
    //                     });

    //             } catch (error) {
    //                 console.error("Error fetching user data:", error);
    //             }
    //         }
    //         fetchUserData()
    //     } else {
    //         console.log("Waiting for userId to be available...");
    //     }
    // }, [postId]);

    useEffect(() => {
        socket.on("commentAdded", (data) => {
            setComments((prev) => [data, ...prev]);
        });

        socket.on("replyAdded", (data) => {
            setComments((prev) =>
                prev.map((c) => (c._id === data._id ? data : c))
            );
        });
    }, []);


    const sendComment = async () => {
        try {

            const res = await axios.post
                ("http://localhost:3000/api/food/user/comment",
                    {
                        foodId: foodId,
                        userId: userId,
                        commentText: text
                    },
                    { withCredentials: true },)

            console.log(res.data);
            setText("");
            socket.emit("newComment", res.data.comment);

        } catch (error) {
            console.log("error in comment api", error);
        }
    };


    const sendReply = async (id) => {
        const res = await axios.post(`http://localhost:3000/api/food/user/replyComment/${id}`, {
            userId: user._id,
            text: replyText
        });

        setReplyText("");
        setActiveReply(null);
        socket.emit("newReply", res.data.comment);
    };

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

                    <input
                        placeholder='write a comment ...'
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        onClick={() => sendComment()}
                        type='submit'
                    > Post</button>

                </div>
            </div>
        </>
    )
}

export default Comment