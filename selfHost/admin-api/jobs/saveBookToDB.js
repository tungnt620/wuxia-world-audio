const { LAST_ID_BOOK_STREAM_KEY } = require("../constants");
const { REDIS_STREAM_KEY_BOOK } = require("../constants");
const { bookDB, adminBookDB } = require("../helpers/dataConnections");
const redis = require("redis");
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

let isProcessShutDown = false;
module.exports.isProcessShutDown = isProcessShutDown;

redisClient.on("error", function(error) {
  console.error(error);
});

async function saveBookToDB() {
  let lastID = await adminBookDB.getValueFromKey(LAST_ID_BOOK_STREAM_KEY);
  console.log(`last id in stream ${REDIS_STREAM_KEY_BOOK} is: `, lastID);
  if (!lastID) lastID = "$";

  console.log(`Call redis stream with lastID: ${lastID}`);

  redisClient.send_command(
    "XREAD",
    ["BLOCK", 0, "STREAMS", REDIS_STREAM_KEY_BOOK, lastID],
    async (err, data) => {
      if (!err) {
        try {
          console.log("Get data from stream: ");

          lastID = data[0][1][0][0];

          await adminBookDB.saveKeyValue(LAST_ID_BOOK_STREAM_KEY, lastID);
          const bookData = JSON.parse(data[0][1][0][1][1]);

          // const oldBookData = bookDB.getBookByID(bookData.id);

          const {
            author: authorName,
            cats: catNames,
            ...newBookData
          } = bookData;

          bookDB.updateTable("book", newBookData);
          const book = bookDB.getBookByID(newBookData.id);

          const author = bookDB.getOrCreateAuthor(authorName);
          bookDB.insertIfNotExistBookAuthor(book.id, author.id);

          // let { chapter_urls: oldChapterUrls = "[]" } = oldBookData;
          // let { chapter_urls: newChapterUrls = "[]" } = newBookData;
          // oldChapterUrls = JSON.parse(oldChapterUrls);
          // newChapterUrls = JSON.parse(newChapterUrls);
          // if (oldChapterUrls.length !== newChapterUrls.length) {
          //   for (
          //     let i = oldChapterUrls.length;
          //     i < newChapterUrls.length;
          //     ++i
          //   ) {
          //     const chapter_url = `https://www.wuxiaworld.com${newChapterUrls[i]}`;
          //     await crawl(CRAWL_TYPE_CHAPTER, {
          //       chapter_url,
          //       book_id: oldBookData.id
          //     });
          //   }
          // }

          console.log("save data success");
        } catch (err) {
          console.log(err);
        }

        console.log(`isProcessShutDown ${isProcessShutDown}`);

        if (!isProcessShutDown) {
          await saveBookToDB();
        }
      }
    }
  );
}

module.exports = saveBookToDB;
