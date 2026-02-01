import React, { useEffect } from 'react'
import { VideoCard } from '../Components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHomeVideos, getVideos } from '../store/VideosSlice'

function Home() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchHomeVideos())
  },[dispatch])

  const videos = useSelector(getVideos)

  console.log(videos)

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

export default Home