import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
    let params = useParams();

    const detailIndex = parseInt(params.symbol, 10);
    const [post, setPost] = useState({id: null, title: "", content: "", upvote: 0});
    const [list, setList] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [upvote, setUpvote] = useState(0);
    const [notification, setNotification] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const likeCount = async (event) => {
        event.preventDefault(); {/* fetch variable problem*/}
        // console.log("list upvote",list.upvote)
        // console.log("upvote type", upvote.typeof);
        // console.log("upvote count", list[0].upvote ); // because it is an array, we must use 0.  --> 0, Prototype: Array[0]
        const { data, error } = await supabase.from("HobbyHub").update({upvote: list[0].upvote + 1}).eq("id", detailIndex).select("*"); {/* FIX THIS, NEED UPVOTE COUNT FAST*/}
        if (error)
            console.error("Error fetching upvote count", error.message);
        if (data != null)
            console.log("updated upvote count successfully", data);
    }

    const updatePost = async (event) => {
        if (title == "" || content == "")
            return;
        event.preventDefault();
        setPost({id: detailIndex, title: title, content: content});
        const { data, error } = await supabase.from("HobbyHub").update({title: title, content: content}).eq("id", detailIndex);
        if (error)
            console.error("Error updating post:", error.message);
        else {
            console.log("Post updated successfully:", data);
            setNotification("Post updated successfully!");
        }
    }

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase.from("HobbyHub").delete().eq("id", detailIndex);

        console.log("Post deleted successfully");
        setNotification("Post deleted successfully");
    }

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase.from('HobbyHub').select().eq("id", detailIndex);
            setList(data);
            // console.log("data",data)
            if (error)
                console.error("Error fetching post data:", error.message);
            }
        getData();
    }, [updatePost, deletePost, likeCount]);
 
    return (
        <div>
            {
                list.map((post, i) => 
                    post.title != "" ? (
                        <div className="gallery-post" key={i}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <p>{post.upvote} Upvotes</p>
                            <button onClick={likeCount}>Like</button>
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
            {notification && <p>{notification}</p>}
        </div>
    )
}

export default PostDetails