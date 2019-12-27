const { fromTextToAudio } = require('../helpers/fromTextToAudio')

exports.convertTextToAudio = (req, res) => {
  const { textContent } = req.body

  fromTextToAudio(
    textContent,
    (errorStr) => {
      res.status(400).send(errorStr)
    },
    (successStr) => {
      res.status(200).send(successStr)
    }
  )
}
