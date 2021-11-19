import './login.scss';
import { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Login() {

    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching, error } = useContext(Context);

    async function handleLogin(e) {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        }catch(err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    }

    return (
        <div className='login'>
            <span className='loginTitle'>Login</span>
             <form className='loginForm' onSubmit={handleLogin}>
                 <label>Username</label>
                 <input type="text" placeholder='Enter your username...' ref={userRef}/>
                 <label>Password</label>
                 <input type="password" placeholder='Enter your password...' ref={passwordRef}/>
                 <button className='loginButton' type='submit' disabled={isFetching}>Log In</button>
                 {error && <span className='loginError'>Wrong User Info!</span>}
                 
             </form>
             <Link to="/register">
                 <button className='registerButton'>Register</button>
             </Link>
        </div>
    )
}
