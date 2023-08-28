const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;

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

// Initializing categoryData with categories and initial counts
const categories = ["men's clothing", "jewelery", "electronics", "women's clothing"];
const categoryData = {};
categories.forEach(category => {
  categoryData[category] = 0;
});

// Pie chart data for selected month
app.get('/pie-chart', async (req, res) => {
  const { month } = req.query;

  try {
    // Get transactions for the selected month
    const transactions = await Transaction.find({
      dateOfSale: { $regex: `${month}-`, $options: 'i' }
    });

    transactions.forEach(transaction => {
      const category = transaction.category;
      if (category && categoryData.hasOwnProperty(category)) {
        categoryData[category]++;
      }
    });

    res.json({ categoryData });
  } catch (error) {
    console.error('Error generating pie chart data:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// to run api just select month http://localhost:4000/pie-chart?month=10
