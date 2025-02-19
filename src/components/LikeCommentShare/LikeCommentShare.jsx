import React from 'react'
import Like from './Like'
import Comment from './Comment'
import Share from './Share'

const LikeCommentShare = () => {
  return (
    <div className='flex flex-col gap-5 bg-secondary/60 p-3 rounded-l-3xl'>
        <Like/>
        <Comment />
        <Share />
    </div>
  )
}

export default LikeCommentShare