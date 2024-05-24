import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Link, useParams } from 'react-router-dom';

// Note
// 5/24 --> workin on sortbyDate

const HomePage = () => {
    let params = useParams();
    const [list, setList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [orderedByDate, setOrderedByDate] = useState(false);
    const [orderedByVote, setOrderedByVote] = useState(false);
    const [sortCol, setSortCol] = useState("");


    const searchItems = searchValue => {
        setSearchInput(searchValue);
        if (searchValue !== "") {
          const filteredData = Object.keys(list.Data).filter((item) =>
            Object.values(item)
            .join("")
            .toLowerCase()
            .includes(searchValue.toLowerCase())
          )
          setFilteredResults(filteredData)
        } else {
          setFilteredResults(Object.keys(list.Data))
        }
      }

    const orderByDate = async (event) => {
        event.preventDefault();
        setOrderedByDate(!orderedByDate);
        setSortCol("created_at");
        const { data, error } = await supabase.from('HobbyHub').select().order(sortCol, {ascending: orderedByDate}); // works
        if (error) {
            console.error("Error ordering by date:", error.message);
        }
        else {
            // console.log("OrderedByDate: ", orderedByDate);
            // console.log("data", data);
        }
    }

    const orderByVote = (event) => {
        event.preventDefault();
        setOrderedByVote(!orderedByVote);
        const { data, error } = supabase.from('HobbyHub').select().order('upvote', {ascending: orderedByVote});
        if (error) {
            console.error("Error ordering by vote:", error.message);
        }
    }

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase.from('HobbyHub').select();
            setList(data);

        }
        getData();
    }, [orderByDate, orderByVote]);

    const detailIndex = parseInt(params.symbol, 10);

    return (
    <div>
        <input
        type="text"
        placeholder="Search"
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <h2>Gallery</h2>
        <button onClick={orderByDate}>Order by Date</button>
        <button onClick={orderByVote}>Order by Vote</button>
        {
            
            list.map((post, i) => 
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