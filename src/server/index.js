'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { port } = require('./config');
const { createCache } = require('./click-count-cache');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const clickCountCache = createCache();

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

app.post('/click', (req, res) => {
  const { title, type } = req.body;
  const cacheKey = `${type}_${title}`;

  clickCountCache.incrementCount(cacheKey);
  res.sendStatus(200);

  console.log(cacheKey, clickCountCache.getCount(cacheKey));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
