import React, { useState } from "react";
import "./LoginForm.css";
import InterestPage from "../InterestPage/InterestPage";
import { Link, NavLink } from "react-router-dom";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onChangeHandler = (identifier, value) => {
    setLoginData({ ...loginData, [identifier]: value });
  };

  const loginHandler = async () => {
    try {
      const response = await fetch("https://zohaib-two.vercel.app/authlogin", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: { "Content-Type": "application/json" },
      });

      const res = await response.json();
      if (!response.ok) {
        // Keep the user on the login page and set the error message
        console.log(response.status);
        setError(res.msg || "Login failed. Please try again.");
        console.log(error);
        setIsLoggedIn(false); // Ensure the user is not marked as logged in
      } else {
        localStorage.setItem("id", res?.id);
        localStorage.setItem("token", res?.token);
        setIsLoggedIn(true); // Mark the user as logged in
        setError(""); // Clear any previous error
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      setIsLoggedIn(false); // Ensure the user is not marked as logged in
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="login">
          <h2>Login</h2>
          <div>
            <label htmlFor="username">Email</label>
            <input
              type="email"
              id="username"
              placeholder="Enter your email"
              required
              value={loginData.username}
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
              value={loginData.password}
              onChange={(e) => onChangeHandler("password", e.target.value)}
            />
          </div>
          <NavLink
            onClick={(e) => {
              e.preventDefault(); // Prevent the default behavior of NavLink
              loginHandler(); // Call the login handler
            }}
            to="#" // Avoid navigation on click
            style={{
              backgroundColor: "#007bff",
              padding: "0.5rem 2rem",
              borderRadius: "0.6rem",
              textAlign: "center",
              margin: "5rem",
            }}
          >
            Login
          </NavLink>
          <div id="account">
            <span>Don't have an account? </span>
            <Link to="/signup">Sign up</Link>
          </div>
          {error && <div id="error">{error}</div>}
        </div>
      ) : (
        <InterestPage />
      )}
    </>
  );
};

export default LoginForm;
