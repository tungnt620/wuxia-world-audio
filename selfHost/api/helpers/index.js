const { getResponse } = require("./request");
const { bookDB } = require("./dataConnections");
const { API_CODE_ERROR } = require("../constants");

exports.getBooks = async ({ offset = 0, limit = 1000 }) => {
  try {
    const books = await bookDB.getBooks({
      offset,
      limit
    });

    books.forEach(book => {
      delete book.chapter_urls;
      delete book.desc;
    });

    return getResponse({
      data: books
    });
  } catch (err) {
    console.log(err);
    return getResponse({ code: API_CODE_ERROR, error: err.toString() });
  }
};
