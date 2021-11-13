import { useState, useEffect } from 'react';
import './home.scss';
import Header from "../../components/header/Header";
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Home = () => {

    const [posts, setPosts] = useState([]);
    const {search} = useLocation();

    useEffect(() => {
        const getPosts = async () => {
            const res = await axios.get("/posts"+search);
            setPosts(res.data);
        }
        getPosts();
    },)

    return (
        <>
        <Header />
        <div className='home'>
            <Posts posts={posts}/>
            <Sidebar />
        </div>
        </>
    )
}

export default Home;
