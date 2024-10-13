import React, { useState } from "react";
import "./SignForm.css";
import { Link, useNavigate } from "react-router-dom"; // Corrected import

const SignForm = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useNavigation
  const [signupData, setSignupData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onChangeHandler = (identifier, value) => {
    setSignupData({ ...signupData, [identifier]: value });
  };

  const signupHandler = async (e) => {
    try {
      const response = await fetch("https://zohaib-two.vercel.app/authsignup", {
        method: "POST",
        body: JSON.stringify(signupData),
        headers: { "Content-Type": "application/json" },
      });

      const res = await response.json();
      if (response.ok) {
        console.log(res.msg);
        // Go to the login page after successful signup
        navigate("/login"); // Navigate correctly
      } else {
        setError(res.msg || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Error occurred during signup", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          required
          value={signupData.name}
          onChange={(e) => onChangeHandler("name", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Email</label>
        <input
          type="email"
          id="username"
          placeholder="Enter your email"
          required
          value={signupData.username}
          onChange={(e) => onChangeHandler("username", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          required
          value={signupData.password}
          onChange={(e) => onChangeHandler("password", e.target.value)}
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          signupHandler();
        }}
      >
        Sign Up
      </button>
      <div id="account">
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
      {error && <div id="error">{error}</div>}
    </div>
  );
};

export default SignForm;
