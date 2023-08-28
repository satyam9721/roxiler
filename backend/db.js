const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 6000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

// Define the schema
const transactionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  sold: Boolean,
  dateOfSale: String
});

// Create the model
const Transaction = mongoose.model('Transaction', transactionSchema);

// Fetch data and store in MongoDB
app.get('/fetch-and-store', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    // Clear existing data
    await Transaction.deleteMany({});

    // Insert fetched data into the database
    await Transaction.insertMany(data);

    res.json({ message: 'Data fetched and stored in MongoDB' });
  } catch (error) {
    console.error('Error fetching and storing data:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
