let fetch = require('node-fetch')
const { URLSearchParams } = require('url')
const { CRAWL_STATUS_COMPLETED, CRAWL_STATUS_CRAWLING } = require('../constants')
const { AdminBookDB } = require('../dataSources/DB')
const Database = require('better-sqlite3')
const { getCrawlStatusKey } = require('../helpers')
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

    return {
      code: 0,
      data: {
        crawlStatus
      },
      error: ''
    }
  } catch (err) {
    return {
      code: 0,
      data: null,
      error: err.toString()
    }
  }
}

async function crawl (crawlType, reqBody) {
  try {
    const body = {
      project: 'default',
      spider: crawlType,
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
    console.log(data)
    if (data.status === 'ok') {
      return {
        code: 0,
        data,
        error: ''
      }
    } else {
      return {
        code: 0,
        data: null,
        error: data
      }
    }
  } catch (err) {
    return {
      code: 0,
      data: null,
      error: err.toString()
    }
  }
}

module.exports = {
  getStatusCrawl,
  crawl,
}
