const { BaseDB } = require("./BaseDB");
const adminStatements = require("./adminStatements");
const { getSlugFromString } = require("../utils");
const { ITEM_PER_PAGE } = require("../constants");

class AdminBookDB extends BaseDB {
  constructor(db) {
    super(db);
    this.setStatements(adminStatements);
  }

  updateTable(tableName, data) {
    const { id, ...newData } = data;
    const today = new Date().toISOString();
    newData.updated_at = today;
    data.updated_at = today;

    let setValueStm = "";
    Object.keys(newData).forEach(fieldName => {
      setValueStm += ` ${fieldName}=$${fieldName},`;
    });
    if (setValueStm.endsWith(",")) {
      setValueStm = setValueStm.substring(0, setValueStm.length - 1);
    }
    const statement = `update ${tableName} set ${setValueStm} where id=$id`;

    return this._run({ statement, params: data });
  }

  getValueFromKey(key) {
    const data = this._getOne("get_value_from_key", { key });
    if (data) {
      return data.value;
    }
    return undefined;
  }

  saveKeyValue(key, value) {
    return this._run({
      statementName: "save_key_value",
      params: { key, value }
    });
  }

  getBook(source, source_id) {
    return this._getOne("get_book", { source, source_id });
  }

  getBookByID(id) {
    return this._getOne("get_book_by_id", { id });
  }

  getBooks({
    offset = 0,
    limit = ITEM_PER_PAGE,
    sortBy = "id",
    sortOrder = "desc",
    nameSearchText = ""
  }) {
    if (nameSearchText) {
      const words = nameSearchText.split(" ");
      let matchExpressions = `${nameSearchText}`;
      let temp = words[0];
      for (let i = 1; i < words.length; i++) {
        temp += ` ${words[i]}`;
        matchExpressions += ` OR "${temp}"`;
      }

      const statement = `
        select b.*, (select count(*) from book_chapter where book_id=b.id) as total_chapter,
        (
          select count(*) from chapter where id in ( select chapter_id from book_chapter where book_id=b.id)  and audio is not null
        ) as num_audio 
        from 
          (
            SELECT rowid
            FROM book_search WHERE book_search MATCH $matchExpressions ORDER BY rank limit $limit OFFSET $offset
          ) bs
        inner join book b on bs.rowid = b.id
      `;
      return this._getList(
        undefined,
        { offset, limit, matchExpressions },
        statement
      );
    } else {
      const statement = `
        select *, (select count(*) from book_chapter where book_id=book.id) as total_chapter,
        (
            select count(*) from chapter where id in ( select chapter_id from book_chapter where book_id=book.id)  and audio is not null
        ) as num_audio
        from book
        order by ${sortBy} ${sortOrder} limit $limit offset $offset
       `;

      return this._getList(undefined, { offset, limit }, statement);
    }
  }

  getTotalBooks() {
    return this._getOneWithPluck("get_total_book", {});
  }

  insertBook(bookData) {
    const today = new Date().toISOString();
    bookData.created_at = today;
    bookData.updated_at = today;
    bookData.slug = getSlugFromString(bookData.name);
    return this._run({ statementName: "insert_book", params: bookData });
  }

  getAuthorByName(name) {
    return this._getOne("get_author_by_name", { name });
  }

  insertAuthor(authorData) {
    return this._run({ statementName: "insert_author", params: authorData });
  }

  getOrCreateAuthor(authorName) {
    const today = new Date().toISOString();

    let author = this.getAuthorByName(authorName);
    if (!author) {
      const authorData = {
        name: authorName,
        slug: getSlugFromString(authorName),
        created_at: today,
        updated_at: today
      };
      this.insertAuthor(authorData);
      author = this.getAuthorByName(authorName);
    }

    return author;
  }

  getCatByName(name) {
    return this._getOne("get_cat_by_name", { name });
  }

  insertCat(authorData) {
    return this._run({ statementName: "insert_cat", params: authorData });
  }

  getOrCreateCat(catName) {
    const today = new Date().toISOString();

    let cat = this.getCatByName(catName);
    if (!cat) {
      const catData = {
        name: catName,
        slug: getSlugFromString(catName),
        created_at: today,
        updated_at: today
      };
      this.insertCat(catData);
      cat = this.getCatByName(catName);
    }

    return cat;
  }

  insertIfNotExistBookAuthor(book_id, author_id) {
    return this._run({
      statementName: "insert_if_not_exist_book_author",
      params: { book_id, author_id }
    });
  }

  insertIfNotExistBookCat(book_id, cat_id) {
    return this._run({
      statementName: "insert_if_not_exist_book_cat",
      params: { book_id, cat_id }
    });
  }

  insertIfNotExistBookChapter(book_id, chapter_id) {
    return this._run({
      statementName: "insert_if_not_exist_book_chapter",
      params: { book_id, chapter_id }
    });
  }

  getChapterByID(id) {
    return this._getOne("get_chapter_by_id", { id });
  }

  getChaptersByIDs(ids) {
    return this._getList("get_chapters_by_ids", { ids });
  }

  getChapter(book_id, order_no) {
    return this._getOne("get_chapter", { book_id, order_no });
  }

  getChapters(bookID, offset, limit = ITEM_PER_PAGE) {
    return this._getList("get_chapters", { bookID, offset, limit });
  }

  getChapterCrawledCorrect(bookID) {
    return this._getList("get_chapters_crawled_correct", { bookID });
  }

  getChapterNotYetHaveAudio(bookID, offset, limit) {
    return this._getList("get_chapters_not_yet_have_audio", {
      bookID,
      offset,
      limit
    });
  }

  getTotalChapters(bookID) {
    return this._getOneWithPluck("get_total_chapter", { bookID });
  }

  insertChapter(chapterData) {
    const today = new Date().toISOString();
    chapterData.created_at = today;
    chapterData.updated_at = today;
    chapterData.slug = getSlugFromString(chapterData.name);

    return this._run({ statementName: "insert_chapter", params: chapterData });
  }

  deleteChapterByID(id) {
    return this._run({ statementName: "delete_chapter_by_id", params: { id } });
  }

  deleteBookChapterRelationship(book_id, chapter_id) {
    return this._run({
      statementName: "delete_book_chapter_relationship",
      params: { book_id, chapter_id }
    });
  }

  deleteChapterByBookIDAndOrderNo(book_id, order_no) {
    const chapter = this.getChapter(book_id, order_no);
    if (chapter) {
      this.deleteBookChapterRelationship(book_id, chapter.id);
      this.deleteChapterByID(chapter.id);
    }
  }
}

module.exports = {
  AdminBookDB
};
