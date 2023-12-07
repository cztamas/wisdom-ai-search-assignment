'use strict';

const cors = require('cors');
const express = require('express');
const { port } = require('./config');

const app = express();
app.use(cors());

app.get('/search', async (req, res) => {
  const searchTerm = req.query.searchTerm;

  await new Promise(resolve => setTimeout(resolve, 800));

  res.send({
    results: [
      { title: 'test.txt', type: 'file' },
      { title: 'Terminator 19', type: 'movie' },
      { title: 'test2.txt', type: 'file' },
    ],
    resultCount: 3,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
