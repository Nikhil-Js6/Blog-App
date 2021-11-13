import { useState, useEffect } from 'react';
import axios from 'axios';
import './sidebar.scss';
import { Link } from 'react-router-dom';

export default function Sidebar() {

    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/categories/");
            setCats(res.data);
        }
        getCats()
    }, [])

    return (
        <div className='sidebar'>
            <div className='sidebarItem'>
                <span className='sidebarTitle'>About Me:</span>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_A9OxhLjB0Yhr7AjM1_LXMplV8JHMh75n0ojLxf2b-wuObfmb&s"
                    alt=""
                />
                <p>I am the almighty god myself. I am the creator of this whole Universe.
                    It originates and end inside me. 
                </p>
            </div>
            <div className='sidebarItem'>
                <span className='sidebarTitle'>Categories</span>
                <ul className='sidebarList'>
                    {
                        cats.map((c) => (
                            <Link to={`/?categ=${c.title}`} className='link'>
                                <li className='sidebarListItem' key={c._id}>{c.title}</li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
            <div className='sidebarItem'>
                <span className='sidebarTitle'>Follow Us</span>
                <div className='sidebarSocial'>
                    <i className="fb sidebarIcon fab fa-facebook-square"></i>
                    <i className="tw sidebarIcon fab fa-twitter-square"></i>
                    <i className="pn sidebarIcon fab fa-pinterest-square"></i>
                    <i className="ig sidebarIcon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}
