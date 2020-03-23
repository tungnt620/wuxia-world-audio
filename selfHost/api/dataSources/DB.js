const { getIDFromSlug } = require("../utils");
const { BaseDB } = require("./BaseDB");
const { statements } = require("./statements");

class BookDB extends BaseDB {
  constructor(db) {
    super(db);
    this.setStatements(statements);
  }

  async getBook(IDAndSlug) {
    if (IDAndSlug) {
      const [id, slug] = getIDFromSlug(IDAndSlug);

      if (id && slug) {
        return this._getOne("get_book_by_id_and_slug", { id, slug });
      }
    }
    return undefined;
  }

  async getBooks({ offset, limit, catIDAndSlug }) {
    let statementName = "get_books";
    let params = { limit, offset };

    const [catID, catSlug] = getIDFromSlug(catIDAndSlug);
    if (catID && catSlug) {
      statementName = "get_books_by_cat_id_and_cat_slug";
      params = { ...params, catID, catSlug };
    }

    return this._getList(statementName, params);
  }

  async searchBook({ offset, limit, q }) {
    if (q) {
      let statementName = "search_book";
      const words = q.split(" ");
      let matchExpressions = `${q}`;
      let temp = words[0];
      for (let i = 1; i < words.length; i++) {
        temp += ` ${words[i]}`;
        matchExpressions += ` OR "${temp}"`;
      }
      const params = { limit, offset, matchExpressions };
      return this._getList(statementName, params);
    }
  }

  async getTotalBookByCatID(catID) {
    return this._getOneWithPluck("get_total_book_by_cat_id", { catID });
  }

  async getTotalBookByAuthorID(authorID) {
    return this._getOneWithPluck("get_total_book_by_author_id", { authorID });
  }

  async getRelativeBooksByBookID(bookID, limit) {
    return this._getList("get_relative_books_by_book_id", { bookID, limit });
  }

  async getBooksByCatID(catID, offset, limit) {
    return this._getList("get_books_by_cat_id", { catID, offset, limit });
  }

  async getBooksByAuthorID(authorID, offset, limit) {
    return this._getList("get_books_by_author_id", { authorID, offset, limit });
  }

  async getCatBySlug(IDAndSlug) {
    const [id, slug] = getIDFromSlug(IDAndSlug);
    if (id && slug) {
      return this._getOne("get_cat_by_id_and_slug", { id, slug });
    }
  }

  async getCatSByBookID(bookID) {
    return this._getList("get_cats_by_book_id", { bookID });
  }

  async getCats(offset, limit) {
    return this._getList("get_cats", { limit, offset });
  }

  async getAuthorBySlug(IDAndSlug) {
    const [id, slug] = getIDFromSlug(IDAndSlug);
    if (id && slug) {
      return this._getOne("get_author_by_id_and_slug", { id, slug });
    }
  }

  async getAuthors(offset, limit) {
    return this._getList("get_authors", { limit, offset });
  }

  async getChapters(bookIDAndSlug, offset, limit) {
    const [id, slug] = getIDFromSlug(bookIDAndSlug);

    const book = this._getOne("get_book_by_id_and_slug", { id, slug });
    if (book) {
      return this._getList("get_chapters_by_book_id", {
        bookID: id,
        limit,
        offset
      });
    }

    return [];
  }

  async getAuthorByBookID(bookID) {
    return this._getOne("get_author_by_book_id", { bookID });
  }

  async getChaptersByBookID(bookID, offset, limit) {
    return this._getList("get_chapters_by_book_id", { bookID, offset, limit });
  }

  async getTotalChapterByBookID(bookID) {
    return this._getOneWithPluck("get_total_chapter_by_book_id", { bookID });
  }
}

module.exports = BookDB;
