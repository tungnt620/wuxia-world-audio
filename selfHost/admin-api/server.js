const { createHttpTerminator } = require('http-terminator');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { getBook } = require('./helpers/book')
const { crawl } = require('./helpers/crawl')
const { getStatusCrawl } = require('./helpers/crawl')

// Run jobs
let { isProcessShutDown } = require('./jobs')
require('./jobs').run()

const { updateBook } = require('./helpers/book')
const { getBooks } = require('./helpers/book')

const app = express()
const port = 4001

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
}
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/api/book', async function (req, res) {
  const resp = await getBooks(req.query.page)
  await res.json(resp)
})

app.get('/api/book/:id', async function (req, res) {
  const resp = await getBook(req.params.id)
  await res.json(resp)
})

app.post('/api/book/:id', async function (req, res) {
  const resp = await updateBook(req.params.id, req.body)
  await res.json(resp)
})

app.post('/api/crawl/:crawlType', async function (req, res) {
  const resp = await crawl(req.params.crawlType, req.body)
  await res.json(resp)
})

app.get('/api/crawl/:crawlType/get-status', async function (req, res) {
  const resp = await getStatusCrawl(req.params.crawlType)
  await res.json(resp)
})

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const httpTerminator = createHttpTerminator({
  server,
  gracefulTerminationTimeout: 5000,
});

// Graceful shutdown
process.on('SIGINT', async () => {
  const cleanUp = () => {
    isProcessShutDown = true
  }
  console.log('Closing server...')

  server.close(() => {
    console.log('Server closed !!! ')

    // For case request is persistent request ( socket, http keep alive), we need have logic to
    // close it
    httpTerminator.terminate();

    cleanUp()
    process.exit()
  })

  // Force close server after 30s
  setTimeout((e) => {
    console.log('Forcing server close !!!', e)

    cleanUp()
    process.exit(1)
  }, 30000)
})
