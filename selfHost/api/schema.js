const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        confessions(
            offset: Int
            limit: Int
            categoryID: Int
            categorySlug: String
            """
            orderBy include direction ( - for DESC if not will ASC) and field name; Current not support
            """
            orderBy: String
        ): [Confession]!
        searchConfession(
            offset: Int
            limit: Int
            q: String
        ): [Confession]!
        confession(id: Int, slug: String): Confession
        category(slug: String): Category
        categories(
            offset: Int
            limit: Int
        ): [Category]!
    }

    type Confession {
        id: Int
        title: String
        content: String
        created_at: Int
        slug: String
        image: String
        totalComment: Int
        totalLike: Int
        categories: [Category]
        comments: [Comment]
        relativeConfessions: [Confession]
        relativeCategories: [Category]
    }
    type Category {
        id: Int
        name: String
        slug: String
        image: String
        totalConfession: Int
        confessions: [Confession]
    }
    type Comment {
        id: Int
        confession_id: Int
        author_name: String
        author: String
        content: String
        created_at: Int
        parent: Int
    }
`

module.exports = typeDefs
