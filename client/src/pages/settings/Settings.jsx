import './settings.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';


export default function Settings() {

    const { user, dispatch } = useContext(Context);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false);
    const PF = "http://localhost:3300/images/";

    async function handleUpdate(e) {
        e.preventDefault();
        console.log(file);
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            profilePic: file,
            username,
            email,
            password,
        }
        if(file){
            const data = new FormData();
            const fileName = `${new Date().getFullYear()}_${new Date().getMonth()}-${new Date().getDay()}_${new Date().getDay()}-${new Date().getHours()}_${new Date().getMinutes()}-${file.name}`;
            data.append("file", file);
            data.append("name", fileName);
            updatedUser.profilePic = fileName;
            try {
                await axios.post("/upload/", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            res.data && setDone(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        }catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
            setError(!error);
        }
    }

    return (
        <div className='settings'>
             <div className='settingsWrapper'>
                 <div className='titleWrapper'>
                     <span className='updateTitle'>Update Your Account</span>
                     <span className='deleteTitle'>Delete Account</span>
                 </div>
                 <form className='settingsForm' onSubmit={handleUpdate}>
                     <label>Profile Picture</label>
                     <div className='formProfile'>
                         <img
                            className='updateImg'
                            src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                            alt="profile"
                        />
                        <label htmlFor='fileInput'>
                            <i className="profileIcon far fa-user-circle"></i>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{display:'none'}}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                     </div>
                     <label>Username</label>
                     <input
                        required
                        type="text"
                        placeholder={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                     <label>Email</label>
                     <input
                        required
                        type="email"
                        placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                     <label>Password</label>
                     <input
                        required
                        type="password"
                        placeholder='******'
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {done &&
                        <span className='success Message'>Account Updated Successfully...</span>
                    }
                    {error &&
                        <span className='error Message'>Something went Wrong!</span>
                    }
                    <button type="submit" className='settingsSubmit'>Update</button>
                 </form>
             </div>
             <Sidebar />
        </div>
    )
}
