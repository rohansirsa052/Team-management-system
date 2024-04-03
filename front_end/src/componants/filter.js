import React, { useState, useEffect } from "react";
import axios from "axios";
import "./filter.css"
const Filter = ({ setData }) => {
  const [filters, setFilters] = useState({
    domain: "",
    gender: "",
    availability: "",
  });

  const showFilteredUsers = async () => {
    try {
      const serverUrl = "http://localhost:8070/users";
      const response = await axios.get(serverUrl);
      let filteredUsers = response.data;

     
      if (filters.domain) {
        filteredUsers = filteredUsers.filter(
          (user) => user.domain === filters.domain
        );
      }
      if (filters.gender) {
        filteredUsers = filteredUsers.filter(
          (user) => user.gender === filters.gender
        );
      }

      if (filters.availability !== "") {
        filteredUsers = filteredUsers.filter(
          (user) => user.available === filters.availability
        );
      }

      setData(filteredUsers);
    } catch (error) {
      console.error("Error receiving data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await showFilteredUsers();
    };
    fetchData();
  }, [filters, showFilteredUsers]);

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  return (
    <React.Fragment>
      <div className="filters_container">
        <h1>Choose Filters</h1>
        <div className="filters">
          <div className="select-container">
            <select
              onChange={(e) => handleFilterChange("domain", e.target.value)}
            >
              <option value="">Select Domain</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Management">Management</option>
            </select>
          </div>
          <div className="select-container">
            <select
              onChange={(e) => handleFilterChange("gender", e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="select-container">
            <select
              onChange={(e) =>
                handleFilterChange(
                  "availability",
                  e.target.value === "true" ? true : e.target.value === "false" ? false : ""
                )
              }
            >
              <option value="">Select Availability</option>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
