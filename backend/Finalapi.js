const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 9000;

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

const transactionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  sold: Boolean,
  dateOfSale: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Fetch and combine data from all three APIs
app.get('/combined-data', async (req, res) => {
  const { month } = req.query;

  try {
    // Fetch data from statistics API
    const statisticsResponse = await axios.get(`http://localhost:5000/statistics?month=${month}`);

    // Fetch data from bar chart API
    const barChartResponse = await axios.get(`http://localhost:3000/bar-chart?month=${month}`);

    // Fetch data from pie chart API
    const pieChartResponse = await axios.get(`http://localhost:4000/pie-chart?month=${month}`);

    // Combine responses into a single JSON
    const combinedData = {
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data,
      pieChart: pieChartResponse.data
    };

    res.json(combinedData);
  } catch (error) {
    console.error('Error fetching and combining data:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
