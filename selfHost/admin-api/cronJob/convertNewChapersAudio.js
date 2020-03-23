const { convertAudioOfChapters } = require("../helpers/audio");
const { redisClient, bookDB } = require("../utils");
const { promisify } = require("util");

const redisGetAsync = promisify(redisClient.get).bind(redisClient);

const today = new Date();
if (today.getMinutes() === 1) {
  console.log("run cronjob convert audio for new chapters");

  (async function() {
    let book_ids,
      offset = 0,
      limit = 1000000;
    let convertAudioConfig = await redisGetAsync("convert_audio_config");

    console.log("convert audio config", convertAudioConfig);

    if (convertAudioConfig) {
      if (convertAudioConfig !== "all") {
        convertAudioConfig = JSON.parse(convertAudioConfig);
        book_ids = convertAudioConfig.book_ids;
        offset = convertAudioConfig.offset;
        limit = convertAudioConfig.limit;
      }
    } else {
      console.log("not exist convert audio config, end job");
      process.exit(1);
    }

    let books = bookDB.getBooks({ limit: 1000000 });
    if (book_ids) {
      books = books.filter(book => book_ids.includes(book.id.toString()));
    }

    for (const book of books) {
      let chaptersWithoutAudio = bookDB.getChapterNotYetHaveAudio(
        book.id,
        offset,
        limit
      );

      console.log(`Have ${chaptersWithoutAudio.length} need convert audio`);
      if (chaptersWithoutAudio.length) {
        // TODO: remove below line
        chaptersWithoutAudio = chaptersWithoutAudio.slice(0, 2);

        console.log(chaptersWithoutAudio);

        await convertAudioOfChapters(chaptersWithoutAudio);
      }
    }
  })();
}
