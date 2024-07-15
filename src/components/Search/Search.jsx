import React, { useContext, useEffect, useState } from "react";
import "./Search.css";
import { AuthContext } from "../../context/AuthContext.js";
const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { authState } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/users/search/${query}`
      );
      const data = await response.json();
      if (data.success) {
        setResults(data.users);
      } else {
        console.error("Error searching users:", data.message);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };
  const handleFollow = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: authState.user._id }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("User followed successfully");
        // Optionally refresh user data to update followers list
        const updatedUser = await fetch(
          `http://localhost:5000/users/${authState.user._id}`
        );
        const updatedData = await updatedUser.json();
        if (updatedData.success) {
          setUser(updatedData.user);
        }
      } else {
        setMessage("Error following user: " + data.message);
      }
    } catch (error) {
      setMessage("Error following user: " + error.message);
    }
  };
  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((user) => (
          <li key={user._id}>
            {user.username} ({user.email})
            <button
              className="followButton"
              onClick={() => handleFollow(user._id)}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
