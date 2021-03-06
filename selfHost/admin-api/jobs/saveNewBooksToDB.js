const { REDIS_STREAM_KEY_NEW_BOOKS } = require("../constants");
const { LAST_ID_NEW_BOOKS_STREAM_KEY } = require("../constants");
const { bookDB, adminBookDB } = require("../helpers/dataConnections");
const redis = require("redis");
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

let { isProcessShutDown } = require("./index");

redisClient.on("error", function(error) {
  console.error(error);
});

async function saveNewBooksToDB() {
  let lastID = await adminBookDB.getValueFromKey(LAST_ID_NEW_BOOKS_STREAM_KEY);
  console.log("last id in stream is: ", lastID);
  if (!lastID) lastID = "$";

  redisClient.send_command(
    "XREAD",
    ["BLOCK", 0, "STREAMS", REDIS_STREAM_KEY_NEW_BOOKS, lastID],
    async (err, data) => {
      if (!err) {
        try {
          console.log("Get data from stream: ");

          lastID = data[0][1][0][0];
          await adminBookDB.saveKeyValue(LAST_ID_NEW_BOOKS_STREAM_KEY, lastID);
          const newBooks = JSON.parse(data[0][1][0][1][1]);
          newBooks.forEach(newBookData => {
            const oldBookData = bookDB.getBook(
              newBookData.source,
              newBookData.source_id
            );
            console.log("is book exists: " + !!oldBookData);
            let bookID;
            if (!oldBookData) {
              const insertResult = bookDB.insertBook(newBookData);
              bookID = insertResult.lastInsertRowid;
              console.log(insertResult);
            } else {
              bookID = oldBookData.id;
            }

            if (bookID) {
              const { cats: catNames, ...rest } = newBookData;

              bookDB.updateTable("book", {
                id: bookID,
                ...rest
              });

              JSON.parse(catNames).forEach(catName => {
                const cat = bookDB.getOrCreateCat(catName);
                bookDB.insertIfNotExistBookCat(bookID, cat.id);
              });

              console.log("updated book");
            }
          });
        } catch (err) {
          console.log(err);
        }

        if (!isProcessShutDown) {
          await saveNewBooksToDB();
        }
      }
    }
  );
}

module.exports = saveNewBooksToDB;
