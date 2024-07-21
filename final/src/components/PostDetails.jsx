import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
    let params = useParams();

    const detailIndex = parseInt(params.symbol, 10); // Why do we need to use params.symbol?
    const [list, setList] = useState([]);
    const [title, setTitle] = useState("");
    const [titleChange, setTitleChange] = useState(false);
    const [content, setContent] = useState("");
    const [comment, setComment] = useState("");
    const [notification, setNotification] = useState("");
    const [refresh, setRefresh] = useState(false);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (e.target.value == "") {
            setTitleChange(true);
        } else {
            setTitleChange(false);
        }
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
        event.preventDefault();
        if (title == "" && content == "") {
            console.log("Please put in an input.");
            return;
        } else if (content == "") { // need to make an option where if we only have one input, we do not update the other input and instead keep it
            const { data, error } = await supabase
            .from("HobbyHub")
            .update({title: title})
            .eq("id", detailIndex)
            .select();
        } else if (title == "") {
            const { data, error } = await supabase
            .from("HobbyHub")
            .update({content: content})
            .eq("id", detailIndex)
            .select();
        } else {
            const { data, error } = await supabase
            .from("HobbyHub")
            .update({title: title, content: content})
            .eq("id", detailIndex)
            .select();
    
            if (data) {
                console.log("Post updated successfully:", data);
                setNotification("Post updated successfully!");
                setRefresh(prev => !prev);
            }
            if (error)
                console.error("Error updating post:", error.message);
        }
    }

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase.from("HobbyHub").delete().eq("id", detailIndex);

        console.log("Post deleted successfully");
        setNotification("Post deleted successfully");
        setRefresh(prev => !prev);
    }

    const addComment = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
        .from("HobbyHub")
        .update({comments: comment})
        .eq("id", detailIndex);

        if (error)
                console.log("Error with adding comment: ", error);
        else {
            console.log("Successfully added comment");
            setNotification("Comment added successfully!");
            setRefresh(prev => !prev); // use a useState to help with rendering, otherwise it becomes infinite
        }
    }

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase
            .from('HobbyHub')
            .select("*")
            .eq("id", detailIndex);
    
            setList(data);
            if (error)
                console.error("Error fetching post data:", error.message);
        }
        getData();
    }, [refresh, likeCount]);
 
    return (
        <div>
            {
                list.map((post, i) => 
                    post.title != "" ? (
                        <div className="p-5 border-2 border-stone-700 shadow-xl shadow-sky-500 text-left" key={i}>
                            <p className='text-xl md:text-lg'>{post.title}</p> <br/>
                            <p>{post.content}</p> <br/>
                            <p>{post.upvote} Upvotes</p>
                            <button className="bg-sky-500 hover:bg-sky-600 hover:border-sky-600 " onClick={likeCount}>Like</button>
                        </div>
                    ) : <p>Empty List</p>
                )
            } <br/>

            <form>
                <div className= {titleChange ? "border-2 border-rose-500 rounded-xl flex" : "rounded-xl border-2 border-gray-50 hover:border-gray-300 flex"}>
                    <textarea
                        type="text"
                        placeholder="New Title"
                        onChange={handleTitleChange}
                        className='flex rounded-xl overflow-hidden w-full'
                    /> <br/>
                </div>
                <input
                    type="text"
                    placeholder="New Content (Optional)"
                    onChange={handleContentChange}
                    className='w-full'
                /> <br/> <br/>
            </form> 
            <button onClick={updatePost}>Update Post</button>
            <button onClick={deletePost}>Delete Post</button>
            {/* Because it is in JSX, it is rendering infinitely; if we put a function inside JSX, it will infinitely render, causing infinite popups.
            {notification && <p>{sendNotification()}</p>} */}
            <br/> <br/>

            <input
                type="text"
                placeholder="Comment"
                onChange={(e) => setComment(e.target.value)}
            /> <br/>
            <button onClick={addComment}>Comment</button>
            <br/> <br/> <hr/>
            <div>
                <h2>Comments</h2>
                {list.map((post, i) =>
                    post.comments != "" ? (
                        <p className='comment' key={i}>{post.comments}</p>
                    ) : <p>No comments yet</p>
                )}
            </div>
        </div>
    )
}

export default PostDetails