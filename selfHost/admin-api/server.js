const { createHttpTerminator } = require('http-terminator');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { crawl } = require('./apiFunctions/crawl')
const { getStatusCrawl } = require('./apiFunctions/crawl')

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

app.post('/api/crawl/:crawlType', async function (req, res) {
  console.log(req.body)
  const resp = await crawl(req.params.crawlType, req.body)
  res.json(resp)
})

app.get('/api/crawl/:crawlType/get-status', async function (req, res) {
  const resp = await getStatusCrawl(req.params.crawlType)
  res.json(resp)
})

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const httpTerminator = createHttpTerminator({
  server,
  gracefulTerminationTimeout: 5000,
});

// Graceful shutdown
process.on('SIGINT', async () => {
  const cleanUp = () => {
    // Clean up other resources like DB connections, current job, queue
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
