const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection URI
const mongoURI = 'mongodb+srv://Rahul:myuser@rahul.fack9.mongodb.net/Databaserahul?authSource=admin&replicaSet=atlas-117kuv-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true';
const dbName = 'calculator_db';

MongoClient.connect(mongoURI, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    // Define the collection to store previous calculations
    const calculationsCollection = db.collection('calculations');

    // Endpoints for calculator functions
    app.post('/add', (req, res) => {
      const { num1, num2 } = req.body;
      const result = num1 + num2;
      calculation.insertOne({ operation: 'add', num1, num2, result });
       calculation.save();
      res.json({ result });
    });

    app.post('/subtract', (req, res) => {
      const { num1, num2 } = req.body;
      const result = num1 - num2;
      calculation.insertOne({ operation: 'subtract', num1, num2, result });
      res.json({ result });
    });

    app.post('/multiply', (req, res) => {
      const { num1, num2 } = req.body;
      const result = num1 * num2;
      calculationsCollection.insertOne({ operation: 'multiply', num1, num2, result });
      res.json({ result });
    });

    app.post('/divide', (req, res) => {
      const { num1, num2 } = req.body;
      if (num2 === 0) {
        return res.status(400).json({ error: 'Division by zero is not allowed' });
      }
      const result = num1 / num2;
      calculationsCollection.insertOne({ operation: 'divide', num1, num2, result });
      res.json({ result });
    });

    app.post('/exponent', (req, res) => {
      const { num1, num2 } = req.body;
      const result = Math.pow(num1, num2);
      calculationsCollection.insertOne({ operation: 'exponent', num1, num2, result });
      res.json({ result });
    });

    // Endpoint to see all previous calculations
    app.get('/calculations', (req, res) => {
      calculationsCollection.find({}).toArray((err, calculations) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to fetch calculations' });
        }
        res.json(calculations);
      });
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
