const express = require('express');
const { port } = require('./config');

const app = express();

app.get('/search', (req, res) => {
  res.send(['some result', 'other result']);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
