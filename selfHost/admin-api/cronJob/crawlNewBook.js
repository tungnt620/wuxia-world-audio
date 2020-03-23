const { CRAWL_TYPE_NEW_BOOK } = require("../constants");
const { crawl } = require("../helpers/crawl");

const today = new Date();
if (today.getMinutes() === 30) {
  console.log("run cronjob crawl new book");

  (async function() {
    await crawl(CRAWL_TYPE_NEW_BOOK);
  })();
}
