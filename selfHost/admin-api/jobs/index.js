const saveNewBooksToDB = require('./saveNewBooksToDB')
const saveBookToDB = require('./saveBookToDB')

module.exports.isProcessShutDown = false

module.exports.run = () => {
  try {
    saveNewBooksToDB()
    saveBookToDB()
  } catch (err) {
    console.log(err.toString())
  }
}
