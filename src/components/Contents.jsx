import React from 'react'

const Contents = ({page}) => {
  return (
    <div className='content container'>
        <div className='content-box' style={{width:"100%"}}>
        {page}
        </div>
    </div>
  )
}

export default Contents