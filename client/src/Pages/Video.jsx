import React, { useEffect, useState } from 'react';
import { FaPlay, FaVolumeUp, FaExpand, FaCog, FaThumbsUp, FaThumbsDown, FaShare, FaDownload, FaEllipsisH, FaBell, FaRegUser } from 'react-icons/fa';
import { Comment, VideoCard, VideoCardHorizontal } from '../Components';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { getUser } from '../store/AuthSlice';
import { useSelector } from 'react-redux';
import FormattedDate from '../Components/FormattedDate';
import { getVideos } from '../store/VideosSlice';


function Video() {
  
  const {videoId} = useParams()
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState('')
  const [showMore, setShowMore] = useState(false);
  const [likes, setLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [subscribers, setSubscribers] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [channelId, setChannelId] = useState(null);
  const [videoURL, setVideoURL] = useState(null);

  const nextVideos = useSelector(getVideos).videos

  useEffect(()=>{
    const fetchVideo = async ()=>{
      try{
        const response = await api.get(`videos/${videoId}`)
        const v = response.data.data
        setVideo(v)
        setDescription(v.description)
        setIsLiked(v.isLiked)
        setLikes(v.likesCount)
        setChannelId(v.owner?._id)
        setIsSubscribed(v.owner?.isSubscribed)
        setSubscribers(v.owner?.subscriberCount)
        setVideoURL(v.videoFile?.replace('/upload/', `/upload/fl_attachment/`))
      }catch(err){
        toast.error(err.response?.data?.message || "Failed to load video") 
      }
    };
    if(videoId) fetchVideo();
  },[videoId])

  const toggleLike = async () =>{
    if(isDisliked) handleDislike();
    try{
      const response = await api.get(`likes/toggle/video/${videoId}`)
      setIsLiked(response.data?.data?.liked)
      if(response.data?.data?.liked) setLikes(()=>likes+1)
      else setLikes(()=>likes-1)
    }catch(err){
      toast.error(err.response?.data)
    }
  }

  const handleDislike = () =>{
    if(isLiked) toggleLike();
    setIsDisliked(!isDisliked)
  }

  const toggleSubscribe = async () =>{
    try{
      const { data } = await api.get(`subscription/toggle/${channelId}`)
      setIsSubscribed(data?.data?.subscribed)
      setSubscribers(prev => data?.data?.subscribed ? prev+1:prev-1);
    }catch(err){
      toast.error("Subscription failed")
    }
  }

  const showMoreDescription = () =>{
    const showMoreBtn = document.getElementById('showMoreBtn')
    const moreDesc = document.getElementById('moreDesc')

    showMoreBtn.style.display = 'none';
    moreDesc.style.display = 'block';
  }


  return (
    <div className="min-h-screen bg-[#1c1c21]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4">
        
        {/* Main Video Section */}
        <div className="flex-1">
          {/* Video Player */}
          <div className="relative bg-black aspect-video rounded-lg overflow-hidden">

            <video src={
              video?.videoFile
            } alt="Video" className='w-full h-full object-cover' controls>
              
            </video>
          </div>
          
          {/* Video Info */}
          <div className="bg-[#2a2a32] rounded-lg p-6 mt-4">
            <h1 className="text-2xl font-bold text-white mb-3">
              {video?.title}
            </h1>
            
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-400">
                {video?.views} views • <FormattedDate timestamp={video?.createdAt} />
              </div>
              
              <div className="flex items-center space-x-2">
                <button className={`flex items-center space-x-2 px-4 py-2 hover:bg-[#4a4a52] text-white rounded-full transition-colors ${isLiked ? "bg-blue-600 hover:bg-blue-500":"bg-[#3a3a42] hover:bg-[rgb(74,74,82)]"}`} onClick={toggleLike}>
                  <FaThumbsUp size={16} />
                  <span className="text-sm font-medium">{likes}</span>
                </button>
                
                <button className={`flex items-center space-x-2 px-4 py-2 bg-[#3a3a42] hover:bg-[#4a4a52] text-white rounded-full transition-colors ${isDisliked ? "bg-blue-600 hover:bg-blue-500":"bg-[#3a3a42] hover:bg-[rgb(74,74,82)]"}`} onClick={handleDislike}>
                  <FaThumbsDown size={16} />
                  <span className="text-sm font-medium">Dislike</span>
                </button>
                
                {/* <button className="flex items-center space-x-2 px-4 py-2 bg-[#3a3a42] hover:bg-[#4a4a52] text-white rounded-full transition-colors">
                  <FaShare size={16} />
                  <span className="text-sm font-medium">Share</span>
                </button> */}
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#3a3a42] hover:bg-[#4a4a52] text-white rounded-full transition-colors" onClick={()=>{window.open(videoURL, "_blank")}}>
                  <FaDownload size={16} />
                  <span className="text-sm font-medium">Download</span>
                </button>
                
                {/* <button className="p-2 bg-[#3a3a42] hover:bg-[#4a4a52] text-white rounded-full transition-colors">
                  <FaEllipsisH size={16} />
                </button> */}
              </div>
            </div>
            
            {/* Channel Info */}
            <div className="flex items-center justify-between border-t border-gray-600 pt-6">
              <div className="flex items-center space-x-4">
                {
                  video?.owner?.avatar ? (
                    <img 
                      src={video?.owner?.avatar} 
                      alt="Channel Avatar" 
                      className="w-12 h-12 rounded-full"
                    />
                  ):(
                    <div className="h-10 w-10 flex items-center justify-center text-2xl">
                    <FaRegUser />
                    </div>
                  )
                }
                <div>
                  <h3 className="font-semibold text-white">{video?.owner.username}</h3>
                  <p className="text-gray-400 text-sm">{subscribers} subscribers</p>
                </div>
              </div>
              
              <button className={`flex items-center space-x-2 text-white px-6 py-2 rounded-full font-medium transition-colors ${isSubscribed?"bg-gray-600 hover:bg-gray-500":"bg-red-600 hover:bg-red-700"}`} onClick={toggleSubscribe}>
                <FaBell size={16} />
                <span>{
                    isSubscribed? "Unsubscribe":"Subscribe"
                  }</span>
              </button>
            </div>
            
            {/* Description */}
            <div className="mt-6 p-4 bg-[#3a3a42] rounded-lg">
              {/* <p className="text-gray-300 leading-relaxed whitespace-normal break-all overflow-hidden">
                {
                  description?.slice(0, 150)
                }
              </p>
              <p id='moreDesc' className="text-gray-300 leading-relaxed hidden whitespace-normal break-all overflow-hidden">
                {
                  description?.slice(150)
                }
              </p>
              <button id='showMoreBtn' onClick={showMoreDescription} className="text-blue-400 hover:text-blue-300 mt-2 text-sm font-medium">
                Show more
              </button> */}
              <p className="text-gray-300 leading-relaxed whitespace-normal break-all overflow-hidden">
                {showMore ? description : description.slice(0, 150)}
              </p>
              {
                description?.length > 150 && (
                  <button onClick={()=>setShowMore(true)} className={`text-blue-400 hover:text-blue-300 mt-2 text-sm font-medium ${showMore && 'hidden'}`}>
                    Show more
                  </button>
                )
              }
            </div>
          </div>
          
          {/* Comments Section */}
          <Comment videoId={videoId} />
        </div>
        
        {/* Sidebar - Related Videos */}
        <div className="lg:w-96">
          <div className="bg-[#2a2a32] rounded-lg p-4">
            <h2 className="font-semibold text-white mb-4">Up next</h2>
            <div className="space-y-3 overflow-hidden">

              {
                nextVideos.map((video)=>{
                  if(video._id!=videoId)
                  return <VideoCard video={video} />
                })
              }
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Video;