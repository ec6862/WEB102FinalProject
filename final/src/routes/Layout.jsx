import React from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { supabase } from '../client';

const Layout = () => {
    return (
        <div>
            {/* Navbar */}
            <nav>
                <ul className='navbar'>
                    <li className='list' key='home-button'>
                        <Link className="link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className='list' key='create-post-button'>
                        <Link className='link' to ="/createPost">
                            Create New Post
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </div>
    )
}

export default Layout;