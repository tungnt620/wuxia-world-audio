const { crawl } = require("../helpers/crawl");
const { CRAWL_TYPE_CHAPTER } = require("../constants");
const { bookDB } = require("../utils");

const today = new Date();
if (today.getMinutes() === 1) {
  console.log("run cronjob crawl new chapters info");
  let books = bookDB.getBooks({ limit: 1000000 });
  books = books.slice(0, 1);
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
    const chapterUrls = JSON.parse(book.chapter_urls);
    let chaptersNeedCrawl = [];
    chapterUrls.forEach((chapterUrl, index) => {
      if (!orderNosChapterCrawledCorrect[index])
        chaptersNeedCrawl.push({ chapterUrl, order_no: index });
    });

    console.log(`Have ${chaptersNeedCrawl.length} need crawl`);

    chaptersNeedCrawl = chaptersNeedCrawl.slice(100, 102);

    chaptersNeedCrawl.forEach(chapter => {
      (async function() {
        await crawl(CRAWL_TYPE_CHAPTER, {
          book_id: book.id,
          order_no: chapter.order_no,
          chapter_url: `https://www.wuxiaworld.com${chapter.chapterUrl}`
        });
      })();
    });
  }
}
