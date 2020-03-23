const CRAWL_STATUS_CRAWLING = "crawling";
const CRAWL_STATUS_COMPLETED = "completed";
const REDIS_STREAM_KEY_NEW_BOOKS = "ww-new-books";
const REDIS_STREAM_KEY_BOOK = "ww-book";
const REDIS_STREAM_KEY_CHAPTER = "ww-chapter";
const LAST_ID_NEW_BOOKS_STREAM_KEY = "last_id_new_books_stream";
const LAST_ID_BOOK_STREAM_KEY = "last_id_book_stream";
const LAST_ID_CHAPTER_STREAM_KEY = "last_id_chapter_stream";
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
  REDIS_STREAM_KEY_NEW_BOOKS,
  LAST_ID_NEW_BOOKS_STREAM_KEY,
  REDIS_STREAM_KEY_BOOK,
  REDIS_STREAM_KEY_CHAPTER,
  LAST_ID_BOOK_STREAM_KEY,
  LAST_ID_CHAPTER_STREAM_KEY,
  BOOK_AUDIO_GCP_BUCKET_NAME,
  ITEM_PER_PAGE,
  API_CODE_ERROR,
  API_CODE_SUCCESS,
  CRAWL_TYPE_NEW_BOOK,
  CRAWL_TYPE_BOOK,
  CRAWL_TYPE_CHAPTER
};
