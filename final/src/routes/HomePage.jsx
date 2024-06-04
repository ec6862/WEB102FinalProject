import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Link, useParams } from 'react-router-dom';

// Note
// 5/24 --> workin on sortbyDate

const HomePage = () => {
    let params = useParams();
    const [list, setList] = useState([]);
    const [displayList, setDisplayList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [orderedByDate, setOrderedByDate] = useState(false);
    const [orderedByVote, setOrderedByVote] = useState(false);
    // const [sortCol, setSortCol] = useState("");
    const [load, setLoad] = useState(false);


    const searchItems = searchValue => {
        setSearchInput(searchValue);
        if (searchValue !== "") {
            // const filteredData = Object.keys(list).filter((item) =>
            // Object.values(list[item])
            // .join("")
            // .toLowerCase()
            // .includes(searchValue.toLowerCase())
            // ); --> doesn't work for this search input, research what Object.keys does
            const filteredData = list.filter((item) => 
                item.title.toLowerCase().includes(searchValue.toLowerCase()) // list filters, for each item, check item.title if it includes searchValue
            );
            console.log("Filtered Data: ", filteredData);
            setDisplayList(filteredData);
        } else {
            setDisplayList(list);
            setLoad(false);
        }
      }

    const orderByDate = async (event) => {
        event.preventDefault();
        setOrderedByDate(!orderedByDate);
        // setSortCol("created_at"); --> ITS THIIS GUY AGAIN WHY U KEEP SENDING ME ERRORS
        const { data, error } = await supabase.from('HobbyHub').select().order("created_at", {ascending: orderedByDate}); // works
        
        if (error) {
            console.error("Error ordering by date:", error.message);
        }
        else {
            // console.log("OrderedByDate: ", orderedByDate);
            console.log("data from orderByDate", data);
            setDisplayList(data);
        }
    }

    const orderByVote = async (event) => {
        event.preventDefault();
        setOrderedByVote(!orderedByVote);
        const { data, error } = await supabase.from('HobbyHub').select().order('upvote', {ascending: orderedByVote});
        if (error) {
            console.error("Error ordering by vote:", error.message);
        }
        else {
            console.log("data from orderByVote", data);
            setDisplayList(data);
        }
    }

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase.from('HobbyHub').select();
            setList(data);
            setDisplayList(data);
        }
        if (load === false) { // need for orderByDate + orderByVote
            setLoad(true);
            getData();
        }
    }, [orderByDate, orderByVote, searchItems]);

    const detailIndex = parseInt(params.symbol, 10);

    return (
    <div>
        <input
            type="text"
            placeholder="Search posts..."
            value={searchInput}
            onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <h2>Gallery</h2>
        <button onClick={orderByDate}>Order by Date</button>
        <button onClick={orderByVote}>Order by Vote</button>
        {
            displayList.map((post, i) => 
                post.title != "" ? (
                    <Link to={`/createPost/${post.id}`} key={i}>
                        <div className="gallery-post" key={i}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <p>{post.upvote} Upvotes</p>
                            <p>Time Created: {new Date(post.created_at).toLocaleDateString("en-US")}</p>
                        </div>
                    </Link>
                ) : null
            )
        }
    </div>
    )
}

export default HomePage;