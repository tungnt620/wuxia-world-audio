function makeSSMLForBookContent(content) {
  let newContent = content.trim();
  newContent = newContent.replace(
    /{{pause_some_second}}/g,
    `<break time="2s"/>`
  );

  newContent = newContent.replace(/…/g, `<break time="1s"/>`);
  newContent = newContent.replace(/\.\.\./g, `<break time="1s"/>`);

  newContent = `<speak>${newContent}</speak>`;

  return newContent;
}

function normalizeBookName(bookName) {}

module.exports = {
  makeSSMLForBookContent,
  normalizeBookName
};
