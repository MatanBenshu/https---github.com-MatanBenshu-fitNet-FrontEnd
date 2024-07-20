import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext.js";
import "./Profile.css";

const Profile = () => {
  const { authState } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/users/${authState.user._id}`
        );
        const data = await response.json();
        
        if (data.success) {
          setUser(data.user);
          setFirstName(data.user.firstName);
          setLastName(data.user.lastName);
          setEmail(data.user.email);
          setGender(data.user.gender);
          setAddress(data.user.address);
        } else {
          setMessage("Error fetching user data: " + data.message);
        }
      } catch (error) {
        setMessage("Error fetching user data: " + error.message);
      }
    };
    if (authState.user && authState.user._id) {
      fetchUser();
    }
  }, [authState.user]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/users/${authState.user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, email, gender, address }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setEditing(false);
        setMessage("Profile updated successfully");
      } else {
        setMessage("Error updating profile: " + data.message);
      }
    } catch (error) {
      setMessage("Error updating profile: " + error.message);
    }
  };

  const handleUnfollow = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/users/${id}/unfollow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: authState.user._id }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setMessage("User unfollowed successfully");
        // Optionally refresh user data to update following list
        const updatedUser = await fetch(
          `http://localhost:5000/users/${authState.user._id}`
        );
        const updatedData = await updatedUser.json();
        if (updatedData.success) {
          setUser(updatedData.user);
        }
      } else {
        setMessage("Error unfollowing user: " + data.message);
      }
    } catch (error) {
      setMessage("Error unfollowing user: " + error.message);
    }
  };

  const closeModal = () => {
    setShowFollowers(false);
    setShowFollowing(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-image">
          <img src="default-profile-picture-url" alt="Profile" />{" "}
          {/* Replace with actual image source */}
        </div>
        <div className="profile-details">
          <h2>{user.username}</h2>
          <div className="profile-stats">
            <span>
              <strong>{user.following.length}</strong> following
            </span>
            <span>
              <strong>{user.followers.length}</strong> followers
            </span>
          </div>
          <div className="profile-bio">
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p>{user.email}</p>
            <p>{user.gender}</p>
            <p>{user.address}</p>
          </div>
          {editing ? (
            <form onSubmit={handleSave}>
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <label>Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <button onClick={handleEdit}>Edit Profile</button>
          )}
        </div>
      </div>
      <div className="profile-buttons">
        <button onClick={() => setShowFollowers(true)}>
          Followers ({user.followers.length})
        </button>
        <button onClick={() => setShowFollowing(true)}>
          Following ({user.following.length})
        </button>
      </div>
      {showFollowers && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>Followers</h3>
            <ul>
              {user.followers.map((follower) => (
                <li key={follower._id}>
                  {follower.username} ({follower.email})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {showFollowing && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>Following</h3>
            <ul>
              {user.following.map((following) => (
                <li key={following._id}>
                  {following.username} ({following.email})
                  <button onClick={() => handleUnfollow(following._id)}>
                    Unfollow
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
