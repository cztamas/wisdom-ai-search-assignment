'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { orderBy } = require('lodash');
const { port } = require('./config');
const { createCache: createClickCountCache } = require('./components/click-count-cache');
const { search: searchInMovies } = require('./components/omdb-adapter');
const {
  initializeCache: initializeFileCache,
  search: searchInFiles,
} = require('./components/file-search');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const resultPageSize = 10;
const clickCountCache = createClickCountCache();

app.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const pageIndex = Number(req.query.pageIndex);

    const [movieResults, fileResults] = await Promise.all([
      searchInMovies(searchTerm),
      searchInFiles(searchTerm),
    ]);

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
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/click', (req, res) => {
  try {
    const { itemId } = req.body;
    clickCountCache.incrementCount(itemId);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

const startServer = async () => {
  await initializeFileCache();

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};

startServer();
