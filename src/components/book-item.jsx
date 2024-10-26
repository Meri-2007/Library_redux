import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBook } from "../features/books/books.api";
import { addComments, getComments } from "../features/comments/comments.api"; 
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const BookItem = () => {
    const { id } = useParams()
    const current = useSelector(state => state.books.current)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(1)

    useEffect(() => {
        dispatch(getBook(id))
    }, [id, dispatch])


    const handleSubmitComment = async (e) => {
        e.preventDefault()
            await dispatch(addComments({ text: comment, rate: rating, book: id })).unwrap();
            dispatch(getComments(id))
            handleClose()
     
    }
    

    return (
        <>
            <h3>BookItem</h3>
            {current && (
                <div>
                    <img src={current.photo} style={{ height: 300 }} alt="Book cover" />
                    <Button variant="outlined" onClick={()=>setOpen(true)}>
                        Add Comment
                    </Button>
                    <Modal
                        open={open}
                        onClose={()=>setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{}}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Add a Comment for {current.title}
                            </Typography>
                            <form onSubmit={handleSubmitComment}>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your comment here..."
                                    rows={4}
                                    style={{ width: '100%', marginTop: '10px' }}
                                />
                                <select value={rating} onChange={(e) => setRating(+e.target.value)} style={{ marginTop: '10px' }}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                                <Button type="submit" variant="contained" style={{ marginTop: '10px' }}>
                                    Submit Comment
                                </Button>
                            </form>
                        </Box>
                    </Modal>
                    <p>{current.title}</p>
                    <strong> by {current.author}</strong>
                </div>
            )}
        </>
    )
}
