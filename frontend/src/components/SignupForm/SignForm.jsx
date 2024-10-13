import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; // Corrected import
import classes from "./SignForm.module.css";

const SignForm = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useNavigation
  const [isSubmmitting, setIsSubmmitting] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onChangeHandler = (identifier, value) => {
    setError("");
    setSignupData({ ...signupData, [identifier]: value });
  };

  const signupHandler = async (e) => {
    try {
      setIsSubmmitting(true);
      const response = await fetch("https://zohaib-two.vercel.app/authsignup", {
        method: "POST",
        body: JSON.stringify(signupData),
        headers: { "Content-Type": "application/json" },
      });
      setIsSubmmitting(false);

      const res = await response.json();
      if (response.ok) {
        console.log(res.msg);
        // Go to the login page after successful signup
        navigate("/login"); // Navigate correctly
      } else {
        setError(res.msg || "Signup failed. Please try again.");
      }
    } catch (err) {
      setIsSubmmitting(false);
      console.error("Error occurred during signup", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={classes.signup}>
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
        className={classes.btnSignup}
        onClick={(e) => {
          e.preventDefault();
          signupHandler();
        }}
      >
        Sign Up
      </button>
      <div className={classes.account}>
        <span>Already have an account? </span>
        <Link className={classes.anchor} to="/login">
          Login
        </Link>
      </div>
      {isSubmmitting && (
        <div style={{ textAlign: "center" }}>Data Submitting...</div>
      )}
      {error && <div className={classes.error}>{error}</div>}
    </div>
  );
};

export default SignForm;
