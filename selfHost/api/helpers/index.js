const { getResponse } = require("./request");
const { bookDB } = require("./dataConnections");
const { API_CODE_ERROR } = require("../constants");

exports.getBooks = async ({ offset = 0, limit = 1000 }) => {
  try {
    const books = await bookDB.getBooks({
      offset,
      limit
    });

    const booksChapterCount = await bookDB.getBooksChapterCount();
    const bookChapterCountMap = booksChapterCount.reduce(
      (map, bookChapterCount) => {
        map[bookChapterCount.bookID] = bookChapterCount.numberChapter;
        return map;
      },
      {}
    );

    const booksHaveAudio = books.filter(book => bookChapterCountMap[book.id]);
    booksHaveAudio.forEach(book => {
      delete book.chapter_urls;
      delete book.desc;
      book.number_audio = bookChapterCountMap[book.id];
    });

    return getResponse({
      data: booksHaveAudio
    });
  } catch (err) {
    console.log(err);
    return getResponse({ code: API_CODE_ERROR, error: err.toString() });
  }
};

exports.getChapter = async ({ bookIDSlug, chapterNumber = 0 }) => {
  try {
    const book = await bookDB.getBook(bookIDSlug);
    if (book) {
      chapterNumber = parseInt(chapterNumber);

      let chapterOrderNo;
      if (!chapterNumber) {
        chapterOrderNo = 0;
      } else {
        if (book.is_have_intro_chapter) {
          chapterOrderNo = chapterNumber;
        } else {
          chapterOrderNo = parseInt(chapterNumber) - 1;
        }
      }

      const chapter = await bookDB.getChapterByBookIDAndOrderNo(
        book.id,
        parseInt(chapterOrderNo)
      );
      if (chapter) {
        delete chapter.text;

        return getResponse({
          data: chapter
        });
      }
    }

    return getResponse({
      data: null
    });
  } catch (err) {
    console.log(err);
    return getResponse({ code: API_CODE_ERROR, error: err.toString() });
  }
};
