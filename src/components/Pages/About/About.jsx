import React, { useEffect, useState } from "react";
import "./About.css";

const About = () => {
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");

  const fetchContent = async () => {
    try {
      const response = await fetch("http://localhost:5000/contents/about");
      const data = await response.json();
      if (data.success) {
        setContent(data.user.content);
      } else {
        setMessage("Error fetching user data: " + data.message);
      }
    } catch (error) {
      setMessage("Error fetching user data: " + error.message);
    }
  };
  fetchContent();
  return (
    <div className="about">
      <h2>About FitNet</h2>
      <p>{message === "" ? content : message}</p>
      <h3>Creators</h3>
      <ul>
        <li>Matan Ben Shushan</li>
        <li>Reem Levi</li>
        <li>Yarden Shaked</li>
        <li>Shiraz Nagaoker</li>
        <li>Moran Avraham</li>
      </ul>
    </div>
  );
};

export default About;
