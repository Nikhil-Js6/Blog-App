import './register.scss';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const src = Math.ceil(Math.random() * 7.9);
    const PF = "http://localhost:3300/images/";

    var style = {
        background: `url(${PF}${src}.jpg)`,
        backgroundRepeat: "noRepeat",
        backgroundSize: 'cover',
    }

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const [error, setError] = useState(false);

    async function handleRegister(e) {
        e.preventDefault();
        setError(false);
        console.log(username, email, password);
        try {
            const res = await axios.post("/auth/register", {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            });
            console.log(res);
            res && (window.location.replace("/login"));
        }catch(err) {
            setError(true);
        }
    }

    return (
        <div style={style} className='register'>
            <span className='registerTitle'>Register</span>
             <form className='registerForm' onSubmit={handleRegister}>
                 <label>Username</label>
                 <input
                     type="text"
                     placeholder='Enter username...'
                     ref={username}
                 />
                 <label>Email</label>
                 <input
                    type="email"
                    placeholder='Enter your email...'
                    ref={email}
                 />
                 <label>Password</label>
                 <input
                    type="password"
                    placeholder='Enter your password...'
                    ref={password}
                 />
                 <button className='registerButton' type="submit">Register</button>
             </form>
             <Link to="/login">
                 <button className='registerLoginButton'>Login</button>
             </Link>
             {error && <span style={{color: 'red', marginTop: '10px'}}>Something went Wrong!</span>}
        </div>
    )
}
