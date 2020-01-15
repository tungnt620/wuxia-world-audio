const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        book(IDAndSlug: String): Book
        books(
            offset: Int
            limit: Int
            catIDAndSlug: String
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
        cat(IDAndSlug: String): Cat
        cats(
            offset: Int
            limit: Int
        ): [Cat]!
        author(IDAndSlug: String): Author
        authors(
            offset: Int
            limit: Int
        ): [Author]!
    }
    
    type Book {
        id: Int
        name: String
        slug: String
        desc: String
        img: String
        created_at: String
        updated_at: String
        author: Author
        cats: [Cat]
        relativeBooks: [Book]
    }
    type Cat {
        id: Int
        name: String
        slug: String
        desc: String
        img: String
        created_at: String
        updated_at: String
        books(
            offset: Int
            limit: Int
        ): [Book]
    }
    type Author {
        id: Int
        name: String
        slug: String
        desc: String
        img: String
        created_at: String
        updated_at: String
        books(
            offset: Int
            limit: Int
        ): [Book]
    }
`

module.exports = typeDefs
