const { fromTextToAudio } = require('./fromTextToAudio')


let testContent =
  `
Nghĩ đến đây, hắn bấm ‘Đồng ý’. Nghĩ đến đây, hắn bấm
- Là bạn cùng lớp à?
Tin thông báo vang lên liên tục, Tống Thư Hàng vốn còn định tắt thông  báo để còn nói mấy câu với nhóm —— Bây giờ hắn đang buồn ngủ chết đi  được, làm gì còn hơi sức đâu mà xem xem mình bị thêm vào nhóm nào?

`

fromTextToAudio(testContent,
  (errorStr) => console.log(errorStr),
  (successStr, mediaLink) => console.log(successStr, mediaLink)
)
