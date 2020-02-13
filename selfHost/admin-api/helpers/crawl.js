let fetch = require('node-fetch')
const { URLSearchParams } = require('url')
const { CRAWL_STATUS_COMPLETED, CRAWL_STATUS_CRAWLING } = require('../constants')
const { AdminBookDB } = require('../dataSources/DB')
const { getResponse } = require('./request')
const Database = require('better-sqlite3')
const { REDIS_STREAM_KEY_BOOK } = require('../constants')
const { REDIS_STREAM_KEY_CHAPTER } = require('../constants')
const { API_CODE_ERROR } = require('../constants')
const { REDIS_STREAM_KEY_NEW_BOOKS } = require('../constants')
const { getCrawlStatusKey } = require('../utils')
const db = new Database(process.env.DB_URL)

const adminBookDB = new AdminBookDB(db)

async function getStatusCrawl (crawlType) {
  try {
    const resp = await fetch(process.env.CRAWL_SERVICE_URL + '/listjobs.json?project=default', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const listJobs = await resp.json()

    const lastJobID = await adminBookDB.getValueFromKey(getCrawlStatusKey(crawlType))
    let crawlStatus = CRAWL_STATUS_COMPLETED
    if (listJobs['pending'].includes(lastJobID) || listJobs['running'].includes(lastJobID)) {
      crawlStatus = CRAWL_STATUS_CRAWLING
    }

    return getResponse({ data: { crawlStatus } })
  } catch (err) {
    console.log(err)
    return getResponse({ code: API_CODE_ERROR, error: err.toString() })
  }
}

function getRedisStreamName (crawlType) {
  switch (crawlType) {
    case 'new_ttv_book':
      return REDIS_STREAM_KEY_NEW_BOOKS
    case 'ttv_book':
      return REDIS_STREAM_KEY_BOOK
    case 'ttv_chapter':
      return REDIS_STREAM_KEY_CHAPTER
    default:
      return ''
  }
}

async function crawl (crawlType, reqBody) {
  try {
    const body = {
      project: 'default',
      spider: crawlType,
      redis_stream_name: getRedisStreamName(crawlType),
      ...reqBody
    }
    const params = new URLSearchParams()
    Object.keys(body).forEach((key) => {
      params.append(key, body[key])
    })
    const resp = await fetch(process.env.CRAWL_SERVICE_URL + '/schedule.json', {
        method: 'POST',
        body: params
      }
    )

    const data = await resp.json()
    if (data.status === 'ok') {
      return getResponse({ data })
    } else {
      return getResponse({ code: API_CODE_ERROR, error: data })
    }
  } catch (err) {
    console.log(err)
    return getResponse({ code: API_CODE_ERROR, error: err.toString() })
  }
}

module.exports = {
  getStatusCrawl,
  crawl,
}
