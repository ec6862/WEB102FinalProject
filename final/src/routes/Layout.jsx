import React from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { supabase } from '../client';

const Layout = () => {
    return (
        <div>
            {/* Navbar */}
            <nav>
                <ul className='p-5 border-2 border-sky-500 space-x-1'>
                    <li className='list' key='home-button'>
                        <Link className="p-3 rounded-xl bg-sky-500 text-inherit hover:text-inherit hover:bg-sky-600 " to="/">
                            Home
                        </Link>
                    </li>
                    <li className='list' key='create-post-button'>
                        <Link className='p-3 rounded-xl bg-sky-500 text-inherit hover:text-inherit hover:bg-sky-600' to ="/createPost">
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