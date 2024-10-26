    import { useRef, useState } from "react";
    import { useDispatch } from "react-redux";
    import { useNavigate } from "react-router-dom";
    import { addBook } from "./books.api";

    const AddBook = () => {
        const [author, setAuthor] = useState("");
        const [title,setTitle]=useState("")
        const [error, setError] = useState("");
        const [photo,setPhoto]=useState("")

        const dispatch = useDispatch();
        const navigate = useNavigate();

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!title) {
                setError('please write the book name');
                return;       
            }
            if (!author) {
                setError('please write the book title');
                return;       
            }
            setError('');

           
            
            try {
                await dispatch(addBook({author:author,title:title,photo:photo})).unwrap();
                navigate('/');
            } catch (err) {
                setError('try again');
            }
        }

        return (
            <form onSubmit={handleSubmit}>
                <input
                    className="form-control"
                    placeholder="book author"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                />
                <input
                    className="form-control"
                    placeholder="book name"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type="file"
                    value={photo}
                    onChange={e=>setPhoto(e.target.value)}
                />
                <br />
                {error && <div className="error">{error}</div>} 
                <button type="submit" className="btn btn-outline-dark my-3">upload</button>
            </form>
        );
    }

    export default AddBook;
