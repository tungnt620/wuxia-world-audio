const { getSlugFromString } = require('../share/utils')
const a = {
  'name': '',
  'desc': '<p></p>',
  'img': 'url',
  'author': 'tung',
  'cats': ['ngyen'],
  'old_book_slug': '212',
  'is_override': '1',
}

function saveBookDataToDB (rawData) {
  const db = require('../share/db')
}

// What if insert error ?
// current we just throw error and program will terminate
// not sure but i think pm2 will auto restart our's app
function saveBook (rawData, db) {
  const { name, desc, img, author, cats, old_book_slug = '', is_override = '0' } = rawData

  db.transaction(() => {
    let bookID

    if (is_override === '1') {
      const oldBook = db.prepare('SELECT id FROM book WHERE slug = ?').get(old_book_slug)
      if (oldBook && oldBook.id) {
        bookID = oldBook.id

        db.prepare(`DELETE FROM book_author WHERE book_id = ?`).run(oldBook.id)
        db.prepare(`DELETE FROM book_chapter WHERE book_id = ?`).run(oldBook.id)
        db.prepare(`DELETE FROM book_cat WHERE book_id = ?`).run(oldBook.id)
        db.prepare(`DELETE FROM book WHERE slug = ?`).run(old_book_slug)
      }
    }

    const currentTime = (new Date()).toISOString()
    const bookData = {
      name,
      slug: getSlugFromString(name),
      desc,
      img,
      created_at: currentTime,
      updated_at: currentTime,
    }
    const insertInfo = db.prepare('INSERT INTO book (name, slug, desc, img, created_at, updated_at) VALUES ($name, $slug, $desc, $img, $created_at, $updated_at)').run(bookData)
    bookID = insertInfo.lastInsertRowid

    const authorID = saveAuthor(db, author)
    const catIDs = saveCats(cats)


  })
}

function saveAuthor (db, name) {
  const oldAuthor = db.prepare('select id from author where name = ?').get(name)
  if (oldAuthor && oldAuthor.id) {
    return oldAuthor.id
  } else {
    const currentTime = (new Date()).toISOString()
    const authorData = {
      name,
      slug: getSlugFromString(name),
      created_at: currentTime,
      updated_at: currentTime,
    }
    const insertInfo = db.prepare('insert into author (name, created_at, updated_at) VALUES ($name, $created_at, $updated_at)').run(authorData)
    return insertInfo.lastInsertRowid
  }
}

function saveCats (db, cats) {
  return cats.map((catName) => {
    const oldCat = db.prepare('select id from cat where name = ?').get(catName)
    if (oldCat && oldCat.id) {
      return oldCat.id
    } else {
      const currentTime = (new Date()).toISOString()
      const catData = {
        name: catName,
        slug: getSlugFromString(catName),
        created_at: currentTime,
        updated_at: currentTime,
      }
      const insertInfo = db.prepare('insert into cat (name, created_at, updated_at) VALUES ($name, $created_at, $updated_at)').run(catData)
      return insertInfo.lastInsertRowid
    }
  })
}

function saveBookAuthor (bookID, authorID) {

}
