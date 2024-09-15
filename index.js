// PostgreSQL connection setup

import express from 'express';
import fetch from 'node-fetch';
import pkg from 'pg';
const { Pool } = pkg;
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hodlinfo',
  password: '092003',
  port: 3000,
});

// Serve static files from the 'client' directory
app.use(express.static('client'));

app.get('/api/tickers', async (req, res) => {
  try {
      const response = await fetch('https://api.wazirx.com/api/v2/tickers');
      const tickers = await response.json();
      
      // Extract the top 10 tickers
      const topTickers = Object.values(tickers).slice(0, 10);

      // Send the top 10 tickers as response
      res.status(200).json(topTickers);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
