import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Link, useParams } from 'react-router-dom';

const HomePage = () => {
    let params = useParams();
    const [list, setList] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase.from('HobbyHub').select();
            console.log(data);
            setList(data);
        }
        getData();
    }, []);

    const detailIndex = parseInt(params.symbol, 10);

    return (
    <div>
        <h2>Gallery</h2>
        {
            list.map((post, i) => 
                post.title != "" ? (
                    <Link to={`/createPost/${post.id}`} key={i}>
                        <div className="gallery-post" key={i}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <p>{post.upvote} Upvotes</p>
                        </div>
                    </Link>
                ) : <p>Empty List</p>
            )
        }
    </div>
    )
}

export default HomePage;