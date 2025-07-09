import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function VideoCard({ video }) {

  const location = useLocation();
  const smallVideoCardList = ['/watch']
  const shouldVideoCardSmall = smallVideoCardList.includes(location.pathname)

  return (!shouldVideoCardSmall) ? (
    <NavLink to="/watch" className="w-full sm:w-96 md:w-[420px] lg:w-[430px] p-4 cursor-pointer">
      <div className="w-full h-60 bg-gray-300 rounded-xl overflow-hidden">
        <img
          src={video.thumbnail}
          alt="thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex mt-4 space-x-4">
        <img
          src={video.ownerAvatar}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h3 className="text-white text-lg font-semibold line-clamp-2">
            {video.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{video.ownerName}</p>
          <p className="text-gray-400 text-sm">
            {video.views} views • {video.uploadedAt}
          </p>
        </div>
      </div>
    </NavLink>
  ) : (<div className="flex space-x-3 p-2 hover:bg-[#3a3a42] rounded-lg cursor-pointer transition-colors">
                <img 
                  src={video.thumbnail} 
                  alt="Video Thumbnail" 
                  className="w-40 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-white text-sm leading-tight mb-1">
                    {video.title}
                  </h4>
                  <p className="text-gray-400 text-xs">{video.ownerName}</p>
                  <p className="text-gray-500 text-xs">{video.views} views • {video.uploadedAt}</p>
                </div>
              </div>)

}

export default VideoCard
