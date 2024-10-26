import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../features/comments/comments.api";
import { useParams } from "react-router-dom";

export const CommentLits = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comments.items)

    useEffect(() => {
        dispatch(getComments(id))
    }, [])

    return (
        <>
            {comments.map(comment => {
                const filled = new Array(comment.rate).fill('https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-64.png');
                return (
                    <div key={comment.id} style={{ padding: 2, margin: 6, backgroundColor: 'lightgray' }}>
                        <p>~ {comment.text}</p>
                        {filled.map((star, index) => (
                            <img key={index} src={star} style={{ width: 20, height: 20 }} alt="star" />
                        ))}
                    </div>
                );
            })}
        </>
    );
};
