const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        book(slug: String): Book
        books(
            offset: Int
            limit: Int
            catSlug: String
            """
            orderBy include direction ( - for DESC if not will ASC) and field name; Current not support
            """
            orderBy: String
        ): [Book]!
        searchBook(
            offset: Int
            limit: Int
            q: String
        ): [Book]!
        cat(slug: String): Cat
        cats(
            offset: Int
            limit: Int
        ): [Cat]!
    }

    type Book {
        id: Int
        name: String
        slug: String
        desc: String
        img: String
        created_at: Int
        updated_at: Int
        cats: [Cat]
        authors: [Author]
        relativeBooks: [Book]
        relativeCats: [Cat]
    }
    type Cat {
        id: Int
        name: String
        slug: String
        desc: String
        img: String
        created_at: Int
        updated_at: Int
        books: [Book]
    }
    type Author {
        id: Int
        name: String
        slug: String
        desc: String
        img: String
        created_at: Int
        updated_at: Int
    }
`

module.exports = typeDefs
