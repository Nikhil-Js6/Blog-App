import './view.scss';
import ViewPost from '../../components/viewPost/ViewPost';
import Sidebar from '../../components/sidebar/Sidebar';

export default function View() {
    return (
        <div className='view'>
            <ViewPost />
            <Sidebar />
        </div>
    )
}

