import React, { useEffect } from 'react'
import { VideoCard } from '../Components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHomeVideos, getVideos } from '../store/VideosSlice'
import Loading from '../Components/Loading';

function Home() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchHomeVideos())
  },[dispatch])

  const videos = useSelector(getVideos)

  const feedVideos = videos.videos

  return (
    <>
    {videos?.loading && <Loading />}
    <div className=''>
      <div className='flex flex-wrap space-x-4'>
        {
          feedVideos.map((video)=>
            <VideoCard key={video._id} video={video} />
          )
        }
      </div>
    </div>
    </>
  )
}

export default Home