const a = {
  name: 'tung',
  desc: 'nguyen',
  img: 'https://google.com/image.jpg',
  author: 'Tung nguyen',
  cat: 'tien hiep',
  chapter: {
    no: 1,
    name: 'chuong 1',
    text: 'sadsadsadsadsa sa d sa ds ads',
    audio: 'https://google.com/audio.mp3',
  },
  isOverrideIfBookExists: false,
}

function saveCrawlDataToDB (rawData) {
  const db = require('../share/db')
}

// What if insert error ?
// current we just throw error and program will terminate
// not sure but i think pm2 will auto restart our's app
function saveBook (rawData, db) {
  const bookData = {}

  const stmt = db.prepare(`
    INSERT INTO book (name, slug, desc, img, created_at, updated_at ) VALUES ($name, $slug, $desc, $img, $created_at, $updated_at)
  `)
  const saveInfo = stmt.run(bookData)
  return saveInfo.lastInsertRowid
}

function saveChapter () {

}

function saveAuthor () {

}

function saveCat () {

}

function isSlugUnique () {

}
