import React from 'react';

function PlaylistCard({ playlist }) {
  return (
    <div className="bg-[#2a2a2f] text-white rounded-xl overflow-hidden shadow-md w-[24%] min-w-[240px] transition-transform duration-200 cursor-pointer">
      {/* Thumbnail */}
      <div className="h-48 bg-gray-500">
        <img
          src={playlist.thumbnail}
          alt="playlist thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="p-3">
        <h3 className="text-lg font-semibold truncate">{playlist.name}</h3>
        <p className="text-sm text-gray-400 mt-1">{playlist.videoCount} videos</p>
        <p className="text-sm text-gray-300 mt-2 line-clamp-2">{playlist.description}</p>
      </div>
    </div>
  );
}

export default PlaylistCard;
