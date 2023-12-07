'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { orderBy } = require('lodash');
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
    { id: 'file_1', title: 'test.txt', type: 'file' },
    { id: 'file_2', title: 'test2.txt', type: 'file' },
  ];

  const allResults = [...fileResults, ...movieResults];

  const resultsWithClickCount = allResults.map(result => ({
    ...result,
    clickCount: clickCountCache.getCount(result.id),
  }));

  const resultsToReturn = orderBy(resultsWithClickCount, 'clickCount', 'desc').slice(
    pageIndex * resultPageSize,
    (pageIndex + 1) * resultPageSize
  );

  res.send({
    results: resultsToReturn,
    resultCount: allResults.length,
  });
});

app.post('/click', (req, res) => {
  const { itemId } = req.body;
  clickCountCache.incrementCount(itemId);

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
