import React from 'react'
import { IoClose } from "react-icons/io5";

function VideoCardHistory({ video, onRemove }) {
  return (
    <div className="flex w-5/6 py-2 pr-2 mb-4 transition rounded-lg group hover:bg-[#1f1f25]">
      {/* Thumbnail */}
      <div className="h-36 w-[240px] bg-gray-300 rounded-xl overflow-hidden cursor-pointer">
        <img
          src={video.thumbnail}
          alt="thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info + Close */}
      <div className="flex flex-1 justify-between pl-4">
        {/* Video Info */}
        <div className="flex flex-col">
          <h3 className="text-white text-lg font-semibold line-clamp-2 cursor-pointer">
            {video.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{video.ownerName}</p>
          <p className="text-gray-400 text-sm">{video.views} views</p>
          <p className="text-gray-400 text-sm mt-4 line-clamp-2">{video.description}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={onRemove}
          className="text-gray-400 text-xl self-start cursor-pointer"
          title="Remove from history"
        >
          <IoClose />
        </button>
      </div>
    </div>
  )
}

export default VideoCardHistory
