const saveNewBooksToDB = require('./saveNewBooksToDB')
const saveBookToDB = require('./saveBookToDB')
const saveChapterToDB = require('./saveChapterToDB')

module.exports.isProcessShutDown = false

module.exports.run = () => {
  try {
    saveNewBooksToDB()
    saveBookToDB()
    saveChapterToDB()
  } catch (err) {
    console.log(err.toString())
  }
}
