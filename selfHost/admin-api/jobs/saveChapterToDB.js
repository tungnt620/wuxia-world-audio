const { REDIS_STREAM_KEY_CHAPTER } = require("../constants");
const { LAST_ID_CHAPTER_STREAM_KEY } = require("../constants");
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
  let lastID = await adminBookDB.getValueFromKey(LAST_ID_CHAPTER_STREAM_KEY);
  console.log("last id in stream is: ", lastID);
  if (!lastID) lastID = "$";

  redisClient.send_command(
    "XREAD",
    ["BLOCK", 0, "STREAMS", REDIS_STREAM_KEY_CHAPTER, lastID],
    async (err, data) => {
      if (!err) {
        try {
          console.log("Get data from stream: ");

          lastID = data[0][1][0][0];

          await adminBookDB.saveKeyValue(LAST_ID_CHAPTER_STREAM_KEY, lastID);
          const chapterCrawlData = JSON.parse(data[0][1][0][1][1]);

          const { book_id, ...chapterData } = chapterCrawlData;
          bookDB.deleteChapterByBookIDAndOrderNo(book_id, chapterData.order_no);
          const { lastInsertRowid } = bookDB.insertChapter(chapterData);

          if (chapterData.order_no === 0) {
            if (
              chapterData.name.toLowerCase().includes("chapter 1") ||
              chapterData.text
                .substring(0, 100)
                .toLowerCase()
                .includes("chapter 1")
            ) {
              bookDB.updateTable("book", {
                id: book_id,
                is_have_intro_chapter: 1
              });
            }
          }

          bookDB.insertIfNotExistBookChapter(book_id, lastInsertRowid);

          console.log("save data success");
        } catch (err) {
          console.log(err);
        }

        if (!isProcessShutDown) {
          await saveBookToDB();
        }
      }
    }
  );
}

module.exports = saveBookToDB;
