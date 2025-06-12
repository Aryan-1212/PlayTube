import React from 'react';

function Dashboard() {

  const stats = {
  totalViews: 120000,
  totalVideos: 24,
  subscribers: 980,
  totalLikes: 3200,
};

const videos = [
  {
    _id: '1',
    title: 'Intro to Node.js',
    thumbnail: 'https://via.placeholder.com/300x180',
    views: 4000,
    likes: 120,
  },
  {
    _id: '1',
    title: 'Intro to Node.js',
    thumbnail: 'https://via.placeholder.com/300x180',
    views: 4000,
    likes: 120,
  },
  {
    _id: '1',
    title: 'Intro to Node.js',
    thumbnail: 'https://via.placeholder.com/300x180',
    views: 4000,
    likes: 120,
  },
  {
    _id: '1',
    title: 'Intro to Node.js',
    thumbnail: 'https://via.placeholder.com/300x180',
    views: 4000,
    likes: 120,
  },
  {
    _id: '1',
    title: 'Intro to Node.js',
    thumbnail: 'https://via.placeholder.com/300x180',
    views: 4000,
    likes: 120,
  },
  // ...more videos
];

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-[#2a2a2f] rounded-xl p-5 shadow-md">
          <h2 className="text-xl font-semibold">Total Views</h2>
          <p className="text-2xl mt-2">{stats.totalViews}</p>
        </div>
        <div className="bg-[#2a2a2f] rounded-xl p-5 shadow-md">
          <h2 className="text-xl font-semibold">Total Videos</h2>
          <p className="text-2xl mt-2">{stats.totalVideos}</p>
        </div>
        <div className="bg-[#2a2a2f] rounded-xl p-5 shadow-md">
          <h2 className="text-xl font-semibold">Subscribers</h2>
          <p className="text-2xl mt-2">{stats.subscribers}</p>
        </div>
        <div className="bg-[#2a2a2f] rounded-xl p-5 shadow-md">
          <h2 className="text-xl font-semibold">Total Likes</h2>
          <p className="text-2xl mt-2">{stats.totalLikes}</p>
        </div>
      </div>

      {/* Videos List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-[#2a2a2f] rounded-xl overflow-hidden shadow-md"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{video.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{video.views} views</p>
                <p className="text-sm text-gray-400 mt-1">{video.likes} likes</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
