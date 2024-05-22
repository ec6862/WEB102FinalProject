import React, { useState, useEffect } from "react";
import { supabase } from "../client";

const CreatePost = () => {
    const [postInfo, setPostInfo] = useState({title: "", content: ""});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const createNewPost = async (event) => {
        event.preventDefault();
        setPostInfo({title: title, content: content}); // --> useless for some reason, does not update postInfo title or content
        console.log("postInfo title:", postInfo.title);
        console.log("postInfo content:", postInfo.content);

        const { data, error } = await supabase.from("HobbyHub").insert({title: title, content: content}).select();
        if (error) {
            console.error("Error inserting new post:", error.message);
        } else {
            console.log("New post inserted successfully:", data);
        }
        setLoading(false);
    }
    
    return (
        <div>
            <form onSubmit={createNewPost}>
                <input
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={handleTitleChange}
                /> <br/>
                <input
                    type="text"
                    placeholder="Content (Optional)"
                    onChange={handleContentChange}
                /> <br/> <br/>
                <button type = "submit">{loading ? "Loading..." : "Create Post"}</button>
                    {/* // onClick={async (e) => {
                    //     e.preventDefault();
                    //     setLoading(true);
                    //     const { data, error } = await supabase
                    //         .from("posts")
                    //         .insert([
                    //             {
                    //                 title: title,
                    //                 upvote: upvote
                    //             }
                    //         ]);
                    //     if (error) {
                    //         console.error("Error inserting new post:", error.message);
                    //     } else {
                    //         console.log("New post inserted successfully:", data);
                    //     }
                    //     setLoading(false);
                    // }}>
                    // {loading ? "Loading..." : "Create Post"} */}
            </form>
        </div>
    )
}

export default CreatePost;