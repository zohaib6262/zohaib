import React, { useEffect, useState } from "react";
import "./InterestPage.css";
import InterestPageItem from "./InterestPageItem";
import { Link } from "react-router-dom";

const InterestPage = () => {
  const [interestRateData, setInterestRateData] = useState({
    principle: 0,
    rate: 0,
    duration: 0,
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [interestRate, setInterestRate] = useState({
    msg: "",
    interestRateValue: "",
    total: "",
  });

  const onChangeHandler = (identifier, value) => {
    setInterestRateData({ ...interestRateData, [identifier]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://zohaib-two.vercel.app/interestRate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const res = await response.json();
        if (response.ok) {
          const userId = localStorage.getItem("id");
          const userData = res.data.filter((item) => item.userId === userId);
          setData(userData);
        } else {
          setError(res.msg || "Fetch Failed. Please try again.");
        }
      } catch (err) {
        setError("An error occurred. Please try again later.");
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, [interestRate]); // Run only once on mount

  const calculateInterest = async () => {
    try {
      const response = await fetch(
        "https://zohaib-two.vercel.app/calculateInterestRate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            ...interestRateData,
            userId: localStorage.getItem("id"),
          }),
        }
      );
      const res = await response.json();
      if (response.ok) {
        setInterestRate({
          msg: res.msg,
          interestRateValue: res.interestRate,
          total: res.total,
        });
      } else {
        setError(res.msg || "Calculation failed. Please try again");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: 900,
          display: "flex",
        }}
      >
        <h2
          style={{
            width: "80%",
            justifyContent: "flex-end",
            alignContent: "flex-end",
            alignSelf: "flex-end",
          }}
        >
          Interest Rate Page
        </h2>
        <Link
          to="/login"
          onClick={logoutHandler}
          style={{
            alignContent: "center",
            padding: "0rem 0.5rem",
            borderRadius: "1rem",
            background: "#0056b3",
          }}
        >
          Logout
        </Link>
      </div>

      <div className="input-group">
        <h2>Calculate Interest Rate</h2>

        <div className="input">
          <label htmlFor="principle">Principal Amount</label>
          <input
            id="principle"
            type="number"
            placeholder="Enter principal amount"
            value={interestRateData.principle}
            onChange={(e) => onChangeHandler("principle", e.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="rate">Interest Rate (%)</label>
          <input
            id="rate"
            type="number"
            placeholder="Enter interest rate"
            value={interestRateData.rate}
            onChange={(e) => onChangeHandler("rate", e.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="duration">Duration (Years)</label>
          <input
            id="duration"
            type="number"
            placeholder="Enter duration in years"
            value={interestRateData.duration}
            onChange={(e) => onChangeHandler("duration", e.target.value)}
          />
        </div>

        <button onClick={calculateInterest}>Calculate Interest</button>
      </div>

      {interestRate.msg && (
        <div>
          <h2>Message: {interestRate.msg}</h2>
          <h2>Interest Rate: {interestRate.interestRateValue}</h2>
          <h2>Total: {interestRate.total}</h2>
        </div>
      )}

      {error && <div style={{ color: "red" }}>{error}</div>}

      {data.length > 0 ? (
        <InterestPageItem data={data} />
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>No interest rate data available.</h2>
        </div>
      )}
    </>
  );
};

export default InterestPage;
