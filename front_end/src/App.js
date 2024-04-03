import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./componants/card";
import "./componants/card.css";
import { FaSearch } from "react-icons/fa";
import FilterUser from "./componants/filter"
import Pagination from "./componants/Pagination";


const App = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
 
  const postsPerPage = 5;
  const showUsers = () => {
    const serverUrl = "https://team-management-system-4.onrender.com/users";
    return axios
      .get(serverUrl)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error receiving data:", error);
      });
  };
 
  const showOneUser = (id) => {
    console.log(id);
    const serverUrl = `https://team-management-system-4.onrender.com/users/${id}`;
    return axios
      .get(serverUrl)
      .then((response) => {
        const newData = response.data;
        if (newData === null) {
          return alert("No user found of that id");
        }
        setData([newData]);
      })
      .catch((error) => {
        alert("No user found of that id");
        console.error("Error receiving data:", error);
      });
  };
  useEffect(() => {
    showUsers();
  }, []);
  

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  return (
    <React.Fragment>
    <FilterUser setData={setData} />
      <form action=""
        onSubmit={(e) => {e.preventDefault()}}>
      <FaSearch id="search-icon" />
        <input type="text" value={id} placeholder="Search users by name"  className="input-field" onChange={(e) => {
            setId(e.target.value);
          }}/>
        <button className="search-button"
          onClick={() => {
            showOneUser(id);
          }}>Search</button>
      </form>

      <div className="contanior">
        <Card data={currentPosts} />
      </div>
      <Pagination
        totalPosts={data.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    <button onClick={()=>{
      showUsers()
      setId("")
    }} className="btn" > Display all users </button>

    </React.Fragment>
  );
};

export default App;




