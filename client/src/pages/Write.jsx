import { useState, useContext } from 'react';
import './write.scss';
import { Context } from "../../context/Context";
import axios from 'axios';

export default function Write() {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    async function handleSubmit(e) {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        }
        if(file){
            const data = new FormData();
            const fileName = `${new Date().getFullYear()}_${new Date().getMonth()}-${new Date().getDay()}_${new Date().getDay()}-${new Date().getHours()}_${new Date().getMinutes()}-${file.name}`;
            data.append("file", file);
            data.append("name", fileName);
            newPost.postImg = fileName;
            try {
                await axios.post("/upload/", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res = await axios.post("/posts/", newPost);
            window.location.replace("/post/"+res.data._id);
        }catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div className='write'>
            {file && (
                <img
                    className='writeImg'
                    src={URL.createObjectURL(file)}
                    alt=""
               />)
            }
            <form className='form' onSubmit={handleSubmit}>
                <div className='formGroup'>
                    <label htmlFor='fileInput'>
                        <i className="addIcon fas fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display: 'none'}} onChange={e => setFile(e.target.files[0])}/>
                    <input
                        type ="text"
                        placeholder='Title'
                        className='input titleInput'
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className='formGroup'>
                     <textarea
                        type="text"
                        className='input textInput'
                        placeholder='Tell your Story...'
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className='submitButtom'>Publish</button>
            </form>
        </div>
    )
}
