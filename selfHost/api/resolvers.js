
module.exports = {
  Query: {
    confessions: async (_, { offset = 0, limit = 10, categoryID, categorySlug }, { dataSources }) =>
      await dataSources.confession.getConfessions({offset, limit, categoryID, categorySlug}),
    searchConfession: async (_, { offset = 0, limit = 10, q }, { dataSources }) =>
      await dataSources.confession.searchConfession({offset, limit, q}),
    confession: async (_, { id, slug }, { dataSources }) =>
      await dataSources.confession.getConfessionDetail(id, slug),
    category: async (_, { slug }, { dataSources }) =>
      await dataSources.confession.getCategoryBySlug(slug),
    categories: async (_, { offset = 0, limit = 10 }, { dataSources }) =>
      await dataSources.confession.getCategories(offset, limit),
  },
  Confession: {
    comments: async (confession, _, { dataSources }) =>
      await dataSources.confession.getCommentsByConfessionID(confession.id),
    totalComment: async (confession, _, { dataSources }) =>
      await dataSources.confession.getTotalCommentByConfessionID(confession.id),
    categories: async (confession, _, { dataSources }) =>
      dataSources.confession.getCategoriesByConfessionID(confession.id),
    relativeCategories: async (confession, _, { dataSources }) =>
      dataSources.confession.getRelativeCategoriesByConfessionID(confession.id),
    relativeConfessions: async (confession, _, { dataSources }) =>
      dataSources.confession.getRelativeConfessions(confession),
  },
};
