import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/card";
import "./components/card.css";
import { FaSearch } from "react-icons/fa";
import FilterUser from "./components/filter";
import Pagination from "./components/Pagination";
import ClipLoader from "react-spinners/ClipLoader"; // Import the spinner component

const App = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state

  const postsPerPage = 5;

  const showUsers = async () => {
    setLoading(true); // Set loading to true before fetching data
    const serverUrl = "https://team-management-system-5.onrender.com/users";
    try {
      const response = await axios.get(serverUrl);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error receiving data:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched or error occurs
    }
  };

  const showOneUser = async (id) => {
    setLoading(true); // Set loading to true before fetching data
    console.log(id);
    const serverUrl = `https://team-management-system-6.onrender.com/users/${id}`;
    try {
      const response = await axios.get(serverUrl);
      const newData = response.data;
      if (newData === null) {
        alert("No user found of that id");
      } else {
        setData([newData]);
      }
    } catch (error) {
      alert("No user found of that id");
      console.error("Error receiving data:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched or error occurs
    }
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
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FaSearch id="search-icon" />
        <input
          type="text"
          value={id}
          placeholder="Search users by name"
          className="input-field"
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <button
          className="search-button"
          onClick={() => {
            showOneUser(id);
          }}
        >
          Search
        </button>
      </form>

      {loading ? ( // Display the loading spinner while data is being fetched
        <div className="spinner-container">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <div className="container">
          <Card data={currentPosts} />
        </div>
      )}

      <Pagination
        totalPosts={data.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <button
        onClick={() => {
          showUsers();
          setId("");
        }}
        className="btn"
      >
        Display all users
      </button>
    </React.Fragment>
  );
};

export default App;
