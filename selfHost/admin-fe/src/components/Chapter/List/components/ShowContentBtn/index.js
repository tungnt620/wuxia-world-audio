import React, { useState } from 'react'
import { Button, Modal } from 'antd'

const ShowContentBtn = ({ record }) => {
  const [showChapterText, setShowChapterText] = useState(false)

  return (
    <>
      <Button onClick={() => setShowChapterText(true)}>View text</Button>

      <Modal
        title="Chapter content"
        width={'90%'}
        visible={showChapterText}
        onOk={() => setShowChapterText(false)}
        onCancel={() => setShowChapterText(false)}
      >
        <div style={{ whiteSpace: 'pre-line' }}>{record.text}</div>
      </Modal>
    </>
  )
}
export default ShowContentBtn
