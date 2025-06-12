import React from 'react'
import { VideoCard } from '../Components'

function Subscriptions() {
  const videoProps = {
    thumbnail: "",
    title: "Test",
    ownerName: "Aryan",
    OwnerAvatar: "",
    views: '12k',
    uploadedAt: "2 days ago"
  }

  return (
    <div className=''>
      <div className='flex'>
        <VideoCard video={videoProps} />
        <VideoCard video={videoProps} />
        <VideoCard video={videoProps} />
      </div>
      <div className='flex'>
        <VideoCard video={videoProps} />
        <VideoCard video={videoProps} />
        <VideoCard video={videoProps} />
      </div>
    </div>
  )
}

export default Subscriptions