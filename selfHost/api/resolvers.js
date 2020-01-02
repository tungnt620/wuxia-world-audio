module.exports = {
  Query: {
    book: async (_, { slug }, { dataSources }) =>
      await dataSources.myAudio.getBook(slug),
    books: async (_, { offset = 0, limit = 10, catID, catSlug }, { dataSources }) =>
      await dataSources.myAudio.getBooks({ offset, limit, catID, catSlug }),
    searchBook: async (_, { offset = 0, limit = 10, q }, { dataSources }) =>
      await dataSources.myAudio.searchBook({ offset, limit, q }),
    cat: async (_, { slug }, { dataSources }) =>
      await dataSources.myAudio.getCatBySlug(slug),
    cats: async (_, { offset = 0, limit = 10 }, { dataSources }) =>
      await dataSources.myAudio.getCats(offset, limit),
  },
}
