'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { port } = require('./config');
const { createCache } = require('./click-count-cache');
const { search } = require('./omdb-adapter');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const resultPageSize = 10;
const clickCountCache = createCache();

app.get('/search', async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const pageIndex = Number(req.query.pageIndex);

  const movieResults = await search(searchTerm);
  const fileResults = [
    { title: 'test.txt', type: 'file' },
    { title: 'test2.txt', type: 'file' },
  ];

  const allResults = [...fileResults, ...movieResults];

  res.send({
    results: allResults.slice(pageIndex * resultPageSize, (pageIndex + 1) * resultPageSize),
    resultCount: allResults.length,
  });
});

app.post('/click', (req, res) => {
  const { title, type } = req.body;
  const cacheKey = `${type}_${title}`;

  clickCountCache.incrementCount(cacheKey);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
