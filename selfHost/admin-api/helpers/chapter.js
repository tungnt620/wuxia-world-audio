const { getResponse } = require("./request");
const { API_CODE_ERROR } = require("../constants");
const { ITEM_PER_PAGE } = require("../constants");
const { bookDB } = require("../helpers/dataConnections");

async function getChapters({ page = 1, bookID }) {
  const offset = (page - 1) * ITEM_PER_PAGE;

  try {
    const chapters = bookDB.getChapters(bookID, offset);
    const totalChapter = bookDB.getTotalChapters(bookID);

    return getResponse({
      data: {
        items: chapters,
        total: totalChapter
      }
    });
  } catch (err) {
    console.log(err);
    return getResponse({ code: API_CODE_ERROR, error: err.toString() });
  }
}

async function getChapter(id) {
  try {
    const chapter = bookDB.getChapterByID(id);
    return getResponse({ data: chapter });
  } catch (err) {
    console.log(err);
    return getResponse({ code: API_CODE_ERROR, error: err.toString() });
  }
}

async function updateChapter(id, newData) {
  try {
    bookDB.updateTable("chapter", { id, ...newData });
    return getResponse();
  } catch (err) {
    console.log(err);
    return getResponse({ code: API_CODE_ERROR, error: err.toString() });
  }
}

module.exports = {
  getChapters,
  getChapter,
  updateChapter
};
