import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Statics.css";

function TransactionStatistics() {
  const [products, setproducts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(1);

  const TransactionStatistics = (e) => {
    setSelectedMonth(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/statistics/?month=${selectedMonth}`)
      .then((response) => {
        setproducts(response.data);
        console.log(response.data);
      });
  }, [products]);

  return (
    <div className="container ">
      <h1 className="header">Transaction Statistics</h1>
      <div className="select-container  ">
        <label  htmlFor="monthSelect">
          Select Month:  
        </label>
        <select
         className="select-dropdown px-2 mx-2 "
          value={selectedMonth}
          onChange={TransactionStatistics}
        >
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">Mar</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">sept</option>
          <option value="10">oct</option>
          <option value="11">Nov</option>
          <option value="12">December</option>
        </select>
      </div>
      <div className="content p-5 shadow-lg p-3 mb-5  rounded">
        {products.map((products) => {
          return (
            <>
              <h2>Selected Month: {selectedMonth}</h2>
              <p>Total Sale Amount: {products["totalSaleAmount"]}</p>
              <p>Total Sold Items: {products["totalSoldItems"]}</p>
              <p>Total Not Sold Items: {products["totalNotSoldItems"]}</p>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default TransactionStatistics;
