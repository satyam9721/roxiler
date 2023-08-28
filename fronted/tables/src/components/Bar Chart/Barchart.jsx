import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Barchart() {
  const [chartData, setChartData] = useState({
    labels: ['0 - 100', '101 - 200', '201 - 300', '301 - 400', '401 - 500', '501 - 600', '601 - 700', '701 - 800', '801 - 900', '901 and above'],
    datasets: [
      {
        labels: '3698',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'aqua',
        borderColor: 'black',
        borderWidth: 1,
      }
    ]
  });
  const [selectedMonth, setSelectedMonth] = useState(1);
  const Barchart  = (e) => {
    setSelectedMonth(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [chartData]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:2000/bar-chart?month=${selectedMonth}`);
      const data = response.data[0];
      const values = Object.values(data);

      const updatedChartData = {
        ...chartData,
        datasets: [
          {
            ...chartData.datasets[0],
            data: values,
          },
        ],
      };

      setChartData(updatedChartData);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  const options = {};

  return (
    <div>
      <h1 className="header"  >Transactions Bar Chart</h1>
      <label htmlFor="monthSelect">
          Select Month:
        </label>
        <select
         className="select-dropdown"
         value={selectedMonth}
         onChange={Barchart}
          
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




      <div
        style={{
          padding: '40px',
          width: '80%',
        }}
      >
        <Bar
          data={chartData}
          options={options}
        />
      </div>
    </div>
  );
}

export default Barchart;
