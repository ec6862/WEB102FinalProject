import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
    let params = useParams();

    const detailIndex = parseInt(params.symbol, 10);
    const [post, setPost] = useState({id: null, title: "", content: ""});
    const [list, setList] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const updatePost = async (event) => { {/* need to implement update function */}
        event.preventDefault();
        setPost({id: detailIndex, title: title, content: content});
        const { data, error} = await supabase.from("HobbyHub").update({title: post.title, content: post.content}).eq("id", post.id);
        if (error) {
            console.error("Error updating post:", error.message);
        }
        console.log("Post updated successfully:", data);
    }

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase.from("HobbyHub").delete().eq("id", detailIndex);
        console.log("Post deleted successfully");
    }

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase.from('HobbyHub').select().eq("id", detailIndex);
            setList(data);
        }
        getData();
    }, [updatePost, deletePost]);
 
    return (
        <div>
            {
                list.map((post, i) => 
                    post.title != "" ? (
                        <div className="gallery-post" key={i}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                    ) : <p>Empty List</p>
                )
            } <br/>
            <form>
                <input
                    type="text"
                    placeholder="New Title"
                    onChange={handleTitleChange}
                /> <br/>
                <input
                    type="text"
                    placeholder="New Content (Optional)"
                    onChange={handleContentChange}
                /> <br/> <br/>
            </form> 
            <button onClick={updatePost}>Update Post</button>
            <button onClick={deletePost}>Delete Post</button>
        </div>
    )
}

export default PostDetails