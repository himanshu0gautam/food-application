import { useState, useEffect } from 'react';
import styles from './Comment.module.css'
import socket from "../../../socket.jsx"
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Comment = ({ isOpen, onClose, itemData, foodId, userId, commentText }) => {


    if (!isOpen) {
        return null;
    }

    const [text, setText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [activeReply, setActiveReply] = useState(null);
    const [comments, setComments] = useState([]);
    // const [fetchComment, setfetchComment] = useState("")



    // useeffect is hatna hai
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
            if (!foodId) {
                return console.log("foodId nhi ayi hai");
            }

            const res = await axios.post(
                "http://localhost:3000/api/food/user/comment",
                {
                    foodId,
                    userId: userId,
                    commentText: text
                },
                { withCredentials: true }
            )

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

    useEffect(() => {
        try {
            const fetchAllComment = async () => {
                const response = await axios.get(`http://localhost:3000/api/food/user/${foodId}`)
                // console.log(response.data); 
                // console.log(response.data.comment[0].userId);
                setComments(response.data.comment)
            }
            fetchAllComment()
        } catch (error) {
            console.log("all comment fetch nhi hua", error);    
        }
    }, [foodId])

    return (
        <>
            <div className={styles.commentOverlay}>
                <div className={styles.commentModal}>

                    {/* 💡 Close button par 'onClose' function ko call karein */}
                    <div className={styles.headingbtn}>
                        <h2>Comments</h2>
                        <div onClick={onClose} className={styles.closeButton}>
                            <AiOutlineClose />
                        </div>
                    </div>

                    {/* Yahan aap comments list aur input field dal sakte hain */}
                    {/* <p>Overlay content goes here...</p> */}
                    {comments.map((c) => (
                        <div key={c._id} className={styles.mainCommentContainer}>
                            <div className={styles.userdetails}>
                                <img src="https://media.gettyimages.com/id/2192202545/vector/avatar-profile-of-man-head-shape-flat-illustration.jpg?s=612x612&w=0&k=20&c=4B-EimX02cWXXZC_iPpQRiGkycmF6qtTWwzdD7o_XOo=" className={styles.userImg} alt="Img" />
                                 <div className={styles.commentcontainer}>
                                <h4 className={styles.userName}>{c.userId?.fullname}</h4>
                                <h4>{c.commentText}</h4>
                            </div>
                                {/* <div className={styles.commentLike}>like</div> */}
                            </div>
                           
                        </div>
                    ))}

                    <div className={styles.commentInputbtn}>
                        <input
                            className={styles.commentInput}
                            placeholder='Add a comment ...'
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <div
                            className={styles.commentsendBtn}
                            onClick={() => sendComment()}
                            type='button'
                        > Send</div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Comment