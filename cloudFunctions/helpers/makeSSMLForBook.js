function makeSSMLForBookContent (content) {
  let newContent = content.trim()
  newContent = newContent.replace(/&/g, '&amp;')
  newContent = newContent.replace(/"/g, '')
  newContent = newContent.replace(/</g, '&lt;')
  newContent = newContent.replace(/>/g, '&gt;')
  newContent = newContent.replace(/[\*\[\]~]/g, '')

  newContent = newContent.replace(/[\.\?!:-]*([^\r\n\.\?!:-]+)[\.\?!:-]*/gm, '<s>$1</s>')
  newContent = newContent.replace(/[\r\n]*([^\r\n]+)[\r\n]*/gm, '<p>$1</p>')
  newContent = `<speak>${newContent}</speak>`

  return newContent
}

function normalizeBookName (bookName) {

}

module.exports = {
  makeSSMLForBookContent,
  normalizeBookName
}
