const { crawlAllBook } = require("../helpers/crawl");

const today = new Date();
if (today.getMinutes() === 1) {
  console.log("run cronjob crawl all book info");

  (async function() {
    await crawlAllBook();
  })();
}
