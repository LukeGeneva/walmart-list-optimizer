const puppeteer = require('puppeteer');
const { bestAisleByFirst } = require('./best-aisle-strategies');

const locateItem = async (storeId, item) => {
  const html = await getSearchHTMLContent(storeId, item);
  const aisles = findAislesIn(html);
  const bestAisle = bestAisleByFirst(aisles);
  return bestAisle;
};

const getSearchHTMLContent = async (storeId, item) => {
  const searchUrl = encodeURI(
    `https://www.walmart.com/store/${storeId}/search?query=${item}`
  );
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(searchUrl);
  const button = await page.$('.store-search-button');
  await button.click();
  await page.waitForSelector('.results-container');
  const content = await page.content();
  await browser.close();
  return content;
};

const findAislesIn = (content) =>
  (content.match(/Aisle [A-Z]\.[0-9]+/g) || []).map((m) => m);

module.exports = { locateItem };
