let fetch = require('node-fetch')
const { AdminBookDB } = require('../dataSources/DB')
const { getResponse } = require('./request')
const Database = require('better-sqlite3')
const { API_CODE_ERROR } = require('../constants')

const bookDB = new AdminBookDB(new Database(process.env.MY_AUDIO_DB_URL))

async function convertAudioOfChapters (chapters) {
  for (const chapter of chapters) {
    const text = chapter.text

    if (text) {
      const resp = await fetch(process.env.TEXT_TO_AUDIO_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          textContent: text
        })
      })
      const audioFileName = await resp.text()
      if (audioFileName && audioFileName.endsWith('mp3')) {
        const audioLink = `https://storage.googleapis.com/book-audio/${audioFileName}`
        bookDB.updateTable('chapter', { id: chapter.id, audio: audioLink })
      }
    }
  }
}

async function convertChapterAudio (ids = []) {
  try {
    const chapters = bookDB.getChaptersByIDs(ids.join(', '))
    await convertAudioOfChapters(chapters)

    return getResponse()
  } catch (err) {
    console.log(err)
    return getResponse({ code: API_CODE_ERROR, error: err.toString() })
  }
}

async function convertBookAudio (id) {
  try {
    const chapters = bookDB.getChapters(id, 0, 1000000)
    await convertAudioOfChapters(chapters)

    return getResponse()
  } catch (err) {
    console.log(err)
    return getResponse({ code: API_CODE_ERROR, error: err.toString() })
  }
}

module.exports = {
  convertChapterAudio,
  convertBookAudio,
}
