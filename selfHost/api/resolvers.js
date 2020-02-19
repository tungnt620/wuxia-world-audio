module.exports = {
  Query: {
    book: async (_, { IDAndSlug }, { dataSources }) =>
      await dataSources.myAudio.getBook(IDAndSlug),
    books: async (_, { offset = 0, limit = 10, catIDAndSlug }, { dataSources }) =>
      await dataSources.myAudio.getBooks({ offset, limit, catIDAndSlug }),
    searchBook: async (_, { offset = 0, limit = 10, q }, { dataSources }) =>
      await dataSources.myAudio.searchBook({ offset, limit, q }),
    cat: async (_, { IDAndSlug }, { dataSources }) =>
      await dataSources.myAudio.getCatBySlug(IDAndSlug),
    cats: async (_, { offset = 0, limit = 10 }, { dataSources }) =>
      await dataSources.myAudio.getCats(offset, limit),
    author: async (_, { IDAndSlug }, { dataSources }) =>
      await dataSources.myAudio.getAuthorBySlug(IDAndSlug),
    authors: async (_, { offset = 0, limit = 10 }, { dataSources }) =>
      await dataSources.myAudio.getAuthors(offset, limit),
    chapters: async (_, { bookIDAndSlug, offset = 0, limit = 10 }, { dataSources }) =>
      await dataSources.myAudio.getChapters(bookIDAndSlug, offset, limit),
  },
  Book: {
    cats: async (book, _, { dataSources }) =>
      dataSources.myAudio.getCatSByBookID(book.id),
    author: async (book, _, { dataSources }) =>
      dataSources.myAudio.getAuthorByBookID(book.id),
    relativeBooks: async (book, { limit = 6 }, { dataSources }) =>
      dataSources.myAudio.getRelativeBooksByBookID(book.id, limit),
    total_chapter: async (book, _, { dataSources }) =>
      dataSources.myAudio.getTotalChapterByBookID(book.id),
    chapters: async (book, { offset = 0, limit = 20 }, { dataSources }) =>
      dataSources.myAudio.getChaptersByBookID(book.id, offset, limit),
  },
  Cat: {
    total_book: async (cat, _, { dataSources }) =>
      dataSources.myAudio.getTotalBookByCatID(cat.id),
    books: async (cat, { offset = 0, limit = 10 }, { dataSources }) =>
      dataSources.myAudio.getBooksByCatID(cat.id, offset, limit),
  },
  Author: {
    total_book: async (author, _, { dataSources }) =>
      dataSources.myAudio.getTotalBookByAuthorID(author.id),
    books: async (author, { offset = 0, limit = 10 }, { dataSources }) =>
      dataSources.myAudio.getBooksByAuthorID(author.id, offset, limit),
  },
}
