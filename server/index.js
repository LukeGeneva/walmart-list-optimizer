const cors = require('cors');
const express = require('express');
const { locateItem } = require('./item-locator');

const app = express();

app.use(cors());

const main = async () => {
  app.get('/store/:id', async (req, res) => {
    const aisle = await locateItem(req.params.id, req.query.item);
    res.json({ aisle });
  });

  app.listen('3001', () => console.log('Server listening on port 3001'));
};

main();
