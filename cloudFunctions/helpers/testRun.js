const { fromTextToAudio } = require('./fromTextToAudio')


let testContent =
  `

\t[ Ngài đã đồng ý gia nhập hội, xin mời cùng hội viên chào hỏi! ] Còn tặng kèm theo hệ thống khuôn mặt tươi cười.

\t**********
\t'Teng teng teng ~' lúc này, phần mềm tán gẫu dưới góc phải máy tính nhảy lên.

`

fromTextToAudio(testContent,
  (errorStr) => console.log(errorStr),
  (successStr, mediaLink) => console.log(successStr, mediaLink)
)
