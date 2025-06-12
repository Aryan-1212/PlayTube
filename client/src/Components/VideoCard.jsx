import React from 'react'

function VideoCard({ video }) {
  return (
    <div className="w-full sm:w-96 md:w-[420px] lg:w-[430px] p-4 cursor-pointer">
      {/* Thumbnail */}
      <div className="w-full h-60 bg-gray-300 rounded-xl overflow-hidden">
        <img
          src={video.thumbnail}
          alt="thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Video Info */}
      <div className="flex mt-4 space-x-4">
        {/* Avatar */}
        <img
          src={video.ownerAvatar}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Details */}
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
    </div>
  )
}

export default VideoCard
