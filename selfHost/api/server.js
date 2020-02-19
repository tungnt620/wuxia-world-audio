const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

// Initial database
const Database = require('better-sqlite3')
const db = new Database(process.env.DB_URL)

// set up any dataSources our resolvers need
const MyAudio = require('./dataSources/myAudio')
const myAudioDataSource = new MyAudio(db)
const dataSources = () => ({
  myAudio: myAudioDataSource,
})

// the function that sets up the global context for each resolver, using the req
// we can make authorization here
const context = async ({ req }) => {
  return {}
}

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    schemaTag: process.env.ENGINE_SCHEMA_TAG,
  },
})

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
