import React from 'react'

function PrintTest ({ data }) {
  return (
    <div
      id={'tung'}
      style={{
        visibility: 'hidden',
        height: 0,
      }}
      className={'tung'}
    >
      nguyen thanh tung
      <p>{ data } </p>
    </div>
  )
}

export default PrintTest
