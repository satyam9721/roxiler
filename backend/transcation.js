const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 7000;

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

// List transactions with keyword search and pagination
app.get('/transactions', async (req, res) => {
  const { search = '', page = 1, per_page = 10 } = req.query;

  try {
    const keywordQuery = {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: parseFloat(search) || 0 } // Search for numeric values
      ]
    };

    const totalCount = await Transaction.countDocuments(keywordQuery);
    const totalPages = Math.ceil(totalCount / per_page);

    const transactions = await Transaction.find(keywordQuery)
      .skip((page - 1) * per_page)
      .limit(per_page)
      .exec();

    res.json({
      transactions,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        per_page: parseInt(per_page),
        total_pages: totalPages
      }
    });
  } catch (error) {
    console.error('Error listing transactions:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//to test the api endpoints 

//List all transactions: http://localhost:3000/transactions
// http://localhost:3000/transactions?search=Mens&page=2&per_page=15