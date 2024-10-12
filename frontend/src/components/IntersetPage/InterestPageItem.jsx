import React from "react";

const InterestPageItem = ({ data }) => {
  let sr = 0;
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h2>Sr#</h2>
        <h2>Principle Amount</h2>
        <h2>Interest Rate</h2>
        <h2>Total Interest</h2>
      </div>
      {data.length === 0
        ? "<h1 style={{display:flex,justifyContent:space-around}}>No data exits!</h1>"
        : data.map((user) => {
            return (
              <div
                style={{ display: "flex", justifyContent: "space-around" }}
                key={user.id}
              >
                <h4>{++sr}</h4>
                <h4>{user.principle}</h4>
                <h4>{user.interestRate}</h4>
                <h4>{user.total}</h4>
              </div>
            );
          })}
    </>
  );
};

export default InterestPageItem;
