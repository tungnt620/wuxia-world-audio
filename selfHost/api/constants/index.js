const CRAWL_STATUS_CRAWLING = "crawling";
const CRAWL_STATUS_COMPLETED = "completed";
const ITEM_PER_PAGE = 10;
const BOOK_AUDIO_GCP_BUCKET_NAME = "wuxiaworld-book-audio";
const CRAWL_TYPE_NEW_BOOK = "new_wuxiaworld_book";
const CRAWL_TYPE_BOOK = "wuxiaworld_book";
const CRAWL_TYPE_CHAPTER = "wuxiaworld_chapter";

const API_CODE_SUCCESS = 0;
const API_CODE_ERROR = 1;

module.exports = {
  CRAWL_STATUS_CRAWLING,
  CRAWL_STATUS_COMPLETED,
  BOOK_AUDIO_GCP_BUCKET_NAME,
  ITEM_PER_PAGE,
  API_CODE_ERROR,
  API_CODE_SUCCESS,
  CRAWL_TYPE_NEW_BOOK,
  CRAWL_TYPE_BOOK,
  CRAWL_TYPE_CHAPTER
};
