const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

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

// Statistics for selected month
app.get('/statistics', async (req, res) => {
  const { month } = req.query;

  try {
    // Get transactions for the selected month
    const transactions = await Transaction.find({
      dateOfSale: { $regex: `${month}-`, $options: 'i' }
    });

    let totalSaleAmount = 0;
    let totalSoldItems = 0;
    let totalNotSoldItems = 0;

    transactions.forEach(transaction => {
      totalSaleAmount += transaction.sold ? transaction.price : 0;
      totalSoldItems += transaction.sold ? 1 : 0;
      totalNotSoldItems += transaction.sold ? 0 : 1;
    });

    const statisticsArray = [
      {
        totalSaleAmount,
        totalSoldItems,
        totalNotSoldItems
      }
    ];

    res.json(statisticsArray);
  } catch (error) {
    console.error('Error calculating statistics:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// to run the statics http://localhost:3000/statistics?month=03