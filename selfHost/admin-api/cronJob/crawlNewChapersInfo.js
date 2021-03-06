const { crawl } = require("../helpers/crawl");
const { CRAWL_TYPE_CHAPTER } = require("../constants");
const { bookDB } = require("../helpers/dataConnections");
const sleep = require("await-sleep");

const today = new Date();
if (today.getHours() === 21 && today.getMinutes() === 1) {
  console.log("run cronjob crawl new chapters info");

  (async function() {
    let books = bookDB.getBooks({ limit: 1000000 });
    for (const book of books) {
      console.log("Check book ", book.name);
      const chaptersCrawledCorrect = bookDB.getChapterCrawledCorrect(book.id);
      const orderNosChapterCrawledCorrect = chaptersCrawledCorrect.reduce(
        (acc, chapter) => {
          acc[chapter.order_no] = true;
          return acc;
        },
        {}
      );
      const chapterUrls = JSON.parse(book.chapter_urls) || [];
      let chaptersNeedCrawl = [];
      chapterUrls.forEach((chapterUrl, index) => {
        if (!orderNosChapterCrawledCorrect[index])
          chaptersNeedCrawl.push({ chapterUrl, order_no: index });
      });

      console.log(`Have ${chaptersNeedCrawl.length} need crawl`);

      for (const chapter of chaptersNeedCrawl) {
        await crawl(CRAWL_TYPE_CHAPTER, {
          book_id: book.id,
          order_no: chapter.order_no,
          chapter_url: `https://www.wuxiaworld.com${chapter.chapterUrl}`
        });
        await sleep(100);
      }
    }
  })();
}
