const { BOOK_AUDIO_GCP_BUCKET_NAME } = require("../constants");

let fetch = require("node-fetch");
const { getResponse } = require("./request");
const { API_CODE_ERROR } = require("../constants");
const { bookDB } = require("../utils");

async function convertAudioOfChapters(chapters) {
  for (const chapter of chapters) {
    let { text, audio, name } = chapter;

    if (text && text !== "vip_content" && !audio) {
      text = `${name} {{pause_some_second}} ${text}`;

      const resp = await fetch(process.env.TEXT_TO_AUDIO_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          textContent: text
        })
      });
      const audioFileName = await resp.text();
      console.log(`convert audio resp: ${audioFileName}`);

      if (audioFileName && audioFileName.endsWith("mp3")) {
        const audioLink = `https://storage.googleapis.com/${BOOK_AUDIO_GCP_BUCKET_NAME}/${audioFileName}`;
        bookDB.updateTable("chapter", { id: chapter.id, audio: audioLink });
      }
    }
  }
}

async function convertChapterAudio(ids = []) {
  try {
    const chapters = bookDB.getChaptersByIDs(ids.join(", "));
    await convertAudioOfChapters(chapters);

    return getResponse();
  } catch (err) {
    console.log(err);
    return getResponse({ code: API_CODE_ERROR, error: err.toString() });
  }
}

async function convertBookAudio(id) {
  try {
    const chapters = bookDB.getChapters(id, 0, 1000000);
    await convertAudioOfChapters(chapters);

    return getResponse();
  } catch (err) {
    console.log(err);
    return getResponse({ code: API_CODE_ERROR, error: err.toString() });
  }
}

module.exports = {
  convertChapterAudio,
  convertBookAudio,
  convertAudioOfChapters
};
