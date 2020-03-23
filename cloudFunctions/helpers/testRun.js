const { fromTextToAudio } = require("./fromTextToAudio");
const { makeSSMLForBookContent } = require("./makeSSMLForBook");

let testContent = `
 WDQK Chapter 1: Lin Dong. “Wuu.”. When Lin Dong gathered every ounce of strength to open his heavy eyelids, a simple, crude yet tidy room appeared before his eyes.
 {{pause_some_second}}
 …
...

crude yet tidy room appeared before his eyes. 
`;

console.log(makeSSMLForBookContent(testContent));

//
// fromTextToAudio(
//   testContent,
//   errorStr => console.log(errorStr),
//   (successStr, mediaLink) => console.log(successStr, mediaLink)
// );
