import './header.scss';

const Header = () => {
   const PF = "http://localhost:3300/images/";
    return (
        <div className='header'>
            <div className='headerTitles'>
                <span className='TitleSm'>Node & React</span>
                <span className='TitleLg'>Blog</span>
            </div>
            <img
                className='headerImg'
                src={PF + "homeCoverPic.jpg"}
                alt=""
            />
        </div>
    )
}

export default Header;
