const { fromTextToAudio } = require('./helpers/fromTextToAudio')

exports.convertTextToAudio = async (req, res) => {
  const { textContent } = req.body

  try {
    fromTextToAudio(
      textContent,
      (errorStr) => {
        res.status(400).send(errorStr)
      },
      (successStr, fileName) => {
        res.status(200).send(fileName)
      }
    )
  } catch (err) {
    res.status(400).send(err.toString())
  }
}
