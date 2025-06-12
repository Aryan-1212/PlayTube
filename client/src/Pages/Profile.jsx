import React from 'react';

function Profile() {

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
];


  return (
    <div>
      <div className='flex flex-col mx-28'>
        <div className='w-full rounded-2xl overflow-hidden h-48'>
          <img
            src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
            alt="coverImage"
            className='w-full h-full object-cover'
          />
        </div>

        <div className='w-5/6 h-48 flex'>
          <div className='w-1/5 flex justify-center items-center'>
            <div className='w-4/5 h-3/4 rounded-full overflow-hidden'>
              <img
                src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                className='w-full h-full object-cover'
                alt="avatar"
              />
            </div>
          </div>
          <div className='flex flex-col justify-center pl-4 space-y-2'>
            <h2 className='text-5xl font-semibold'>Channel Name</h2>
            <h2 className='text-2xl font-semibold'>Username</h2>
            <div className='flex'>
              <p className='text-gray-400'>Email</p>
              <span>&nbsp;·&nbsp;</span>
              <p className='text-gray-400'>1000 Subscribers</p>
              <span>&nbsp;·&nbsp;</span>
              <p className='text-gray-400'>2 Videos</p>
            </div>
            <button className='py-1 w-52 rounded-sm cursor-pointer bg-[#222227] hover:bg-[#2a2a31] duration-500'>
              Customize
            </button>
          </div>
        </div>
      </div>

      <div className='h-[1px] w-full bg-gray-600'></div>

      <div className='mx-28 mt-6'>
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

export default Profile;
