const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 2000;

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

// Bar chart data for selected month
app.get('/bar-chart', async (req, res) => {
  const { month } = req.query;

  try {
    // Get transactions for the selected month
    const transactions = await Transaction.find({
      dateOfSale: { $regex: `${month}-`, $options: 'i' }
    });

    const priceRanges = {
      '0 - 100': 0,
      '101 - 200': 0,
      '201 - 300': 0,
      '301 - 400': 0,
      '401 - 500': 0,
      '501 - 600': 0,
      '601 - 700': 0,
      '701 - 800': 0,
      '801 - 900': 0,
      '901 and above': 0
    };

    transactions.forEach(transaction => {
      const price = transaction.price;
      if (price >= 0 && price <= 100) priceRanges['0 - 100']++;
      else if (price <= 200) priceRanges['101 - 200']++;
      else if (price <= 300) priceRanges['201 - 300']++;
      else if (price <= 400) priceRanges['301 - 400']++;
      else if (price <= 500) priceRanges['401 - 500']++;
      else if (price <= 600) priceRanges['501 - 600']++;
      else if (price <= 700) priceRanges['601 - 700']++;
      else if (price <= 800) priceRanges['701 - 800']++;
      else if (price <= 900) priceRanges['801 - 900']++;
      else priceRanges['901 and above']++;
    });

    res.json([ priceRanges ]);
  } catch (error) {
    console.error('Error generating bar chart data:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//to  test the api by month http://localhost:2000/bar-chart?month=01
