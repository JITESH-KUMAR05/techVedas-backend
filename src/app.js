const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/posts', postRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');

    // Create a collection and insert a document to create the database
    const db = mongoose.connection.db;
    db.collection('posts').insertOne({ title: 'Initial Post', content: 'This is the initial post content.' }, (err, res) => {
      if (err) throw err;
      console.log('Database and collection created!');
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});