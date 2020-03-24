const {
  CRAWL_TYPE_BOOK,
  CRAWL_TYPE_CHAPTER,
  CRAWL_TYPE_NEW_BOOK
} = require("../constants");
const sleep = require("await-sleep");

let fetch = require("node-fetch");
const { URLSearchParams } = require("url");
const {
  CRAWL_STATUS_COMPLETED,
  CRAWL_STATUS_CRAWLING
} = require("../constants");
const { getResponse } = require("./request");
const { REDIS_STREAM_KEY_BOOK } = require("../constants");
const { REDIS_STREAM_KEY_CHAPTER } = require("../constants");
const { API_CODE_ERROR } = require("../constants");
const { REDIS_STREAM_KEY_NEW_BOOKS } = require("../constants");
const { bookDB, adminBookDB } = require("../utils");

function getCrawlJobIDKeyInDB(crawlType, params) {
  switch (crawlType) {
    case CRAWL_TYPE_NEW_BOOK:
      return `crawl-${crawlType}-status`;
    case CRAWL_TYPE_BOOK:
      return `crawl-${crawlType}-${params.id}`;
    case CRAWL_TYPE_CHAPTER:
      return `crawl-${crawlType}-${params.book_id}`;
  }
}

function getJobID(crawlType, params) {
  return adminBookDB.getValueFromKey(getCrawlJobIDKeyInDB(crawlType, params));
}

async function getStatusCrawl(crawlType, params) {
  try {
    const resp = await fetch(
      process.env.CRAWL_SERVICE_URL + "/listjobs.json?project=default",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
    );
    const listJobs = await resp.json();

    const lastJobID = getJobID(crawlType, params);
    let crawlStatus = CRAWL_STATUS_COMPLETED;

    console.log(lastJobID);
    console.log(listJobs);

    if (
      [...listJobs["pending"], ...listJobs["running"]].some(
        job => job.id === lastJobID
      )
    ) {
      crawlStatus = CRAWL_STATUS_CRAWLING;
    }

    return getResponse({ data: { crawlStatus } });
  } catch (err) {
    console.log(err);
    return getResponse({ code: API_CODE_ERROR, error: err.toString() });
  }
}

function getRedisStreamName(crawlType) {
  switch (crawlType) {
    case CRAWL_TYPE_NEW_BOOK:
      return REDIS_STREAM_KEY_NEW_BOOKS;
    case CRAWL_TYPE_BOOK:
      return REDIS_STREAM_KEY_BOOK;
    case CRAWL_TYPE_CHAPTER:
      return REDIS_STREAM_KEY_CHAPTER;
    default:
      return "";
  }
}

async function crawl(crawlType, reqBody) {
  try {
    const body = {
      project: "default",
      spider: crawlType,
      redis_stream_name: getRedisStreamName(crawlType),
      ...reqBody
    };
    const params = new URLSearchParams();
    Object.keys(body).forEach(key => {
      params.append(key, body[key]);
    });
    const resp = await fetch(process.env.CRAWL_SERVICE_URL + "/schedule.json", {
      method: "POST",
      body: params
    });

    const data = await resp.json();
    if (data.status === "ok") {
      const jobID = data.jobid;
      adminBookDB.saveKeyValue(getCrawlJobIDKeyInDB(crawlType, reqBody), jobID);

      return getResponse({ data });
    } else {
      return getResponse({ code: API_CODE_ERROR, error: data });
    }
  } catch (err) {
    console.log(err);
    return getResponse({ code: API_CODE_ERROR, error: err.toString() });
  }
}

async function crawlAllBook() {
  try {
    const books = bookDB.getBooks({ limit: 1000000 });
    for (const book of books) {
      const body = {
        project: "default",
        spider: CRAWL_TYPE_BOOK,
        redis_stream_name: getRedisStreamName(CRAWL_TYPE_BOOK),
        id: book.id,
        book_url: `https://www.wuxiaworld.com/novel/${book.source_id}/`
      };

      const params = new URLSearchParams();
      Object.keys(body).forEach(key => {
        params.append(key, body[key]);
      });
      const resp = await fetch(
        process.env.CRAWL_SERVICE_URL + "/schedule.json",
        {
          method: "POST",
          body: params
        }
      );

      const data = await resp.json();
      if (data.status === "ok") {
        const jobID = data.jobid;
        adminBookDB.saveKeyValue(
          getCrawlJobIDKeyInDB(CRAWL_TYPE_BOOK, { id: book.id }),
          jobID
        );
      }

      await sleep(100);
    }

    return getResponse();
  } catch (err) {
    console.log(err);
    return getResponse({ code: API_CODE_ERROR, error: err.toString() });
  }
}

module.exports = {
  getStatusCrawl,
  crawl,
  crawlAllBook
};
