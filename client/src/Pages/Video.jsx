import React from 'react';
import { FaPlay, FaVolumeUp, FaExpand, FaCog, FaThumbsUp, FaThumbsDown, FaShare, FaDownload, FaEllipsisH, FaBell } from 'react-icons/fa';
import { Comment, VideoCard, VideoCardHorizontal } from '../Components';


function Video() {

  const comments = [
    {
      avatar:'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      user: 'TechReviewer',
      time: '2 hours ago',
      comment: 'Great explanation! This really helped me understand the concept better.',
      likes: 24
    },
    {
      avatar:'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      user: 'Reviewer',
      time: '1 hours ago',
      comment: 'Great me understand the concept better.',
      likes: 24
    },
    {
      avatar:'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      user: 'Tech',
      time: '5 hours ago',
      comment: 'Great the concept better.',
      likes: 24
    }
  ]

  const videoProps = [
    {
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=160&h=90&fit=crop",
    title: "Test",
    ownerName: "Aryan",
    OwnerAvatar: "",
    views: '12k',
    uploadedAt: "2 days ago"
  },
    {
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=160&h=90&fit=crop",
    title: "Building Modern UIs with Components",
    ownerName: "Frontend Masters",
    OwnerAvatar: "",
    views: '890K',
    uploadedAt: "3 days ago"
  },
    {
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=160&h=90&fit=crop",
    title: "JavaScript ES6+ Features You Should Know",
    ownerName: "Dev Tips",
    OwnerAvatar: "",
    views: '2.1M',
    uploadedAt: "2 weeks ago"
  },
    {
    thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=160&h=90&fit=crop",
    title: "CSS Grid vs Flexbox: When to Use Each",
    ownerName: "Design Patterns",
    OwnerAvatar: "",
    views: '650K',
    uploadedAt: "2 days ago"
  },
    {
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=160&h=90&fit=crop",
    title: "Next.js 14 Complete Tutorial",
    ownerName: "WebDev Pro",
    OwnerAvatar: "",
    views: '445K',
    uploadedAt: "14 days ago"
  },

]

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
            <img 
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1280&h=720&fit=crop" 
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-colors">
                <FaPlay size={32} />
              </button>
            </div>
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div className="w-full bg-gray-600 h-1 rounded mb-3">
                <div className="bg-red-600 h-full rounded w-1/3"></div>
              </div>
              
              {/* Control Buttons */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <button className="hover:text-red-500 transition-colors">
                    <FaPlay size={20} />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button className="hover:text-red-500 transition-colors">
                      <FaVolumeUp size={18} />
                    </button>
                    <div className="w-16 bg-gray-600 h-1 rounded">
                      <div className="bg-white h-full rounded w-3/4"></div>
                    </div>
                  </div>
                  
                  <span className="text-sm">5:32 / 12:45</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="hover:text-red-500 transition-colors">
                    <FaCog size={18} />
                  </button>
                  <button className="hover:text-red-500 transition-colors">
                    <FaExpand size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Info */}
          <div className="bg-[#2a2a32] rounded-lg p-6 mt-4">
            <h1 className="text-2xl font-bold text-white mb-3">
              Complete React Tutorial for Beginners - Learn React in 2024
            </h1>
            
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-400">
                1,234,567 views • Nov 15, 2024
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#3a3a42] hover:bg-[#4a4a52] text-white rounded-full transition-colors">
                  <FaThumbsUp size={16} />
                  <span className="text-sm font-medium">24K</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#3a3a42] hover:bg-[#4a4a52] text-white rounded-full transition-colors">
                  <FaThumbsDown size={16} />
                  <span className="text-sm font-medium">Dislike</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#3a3a42] hover:bg-[#4a4a52] text-white rounded-full transition-colors">
                  <FaShare size={16} />
                  <span className="text-sm font-medium">Share</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#3a3a42] hover:bg-[#4a4a52] text-white rounded-full transition-colors">
                  <FaDownload size={16} />
                  <span className="text-sm font-medium">Download</span>
                </button>
                
                <button className="p-2 bg-[#3a3a42] hover:bg-[#4a4a52] text-white rounded-full transition-colors">
                  <FaEllipsisH size={16} />
                </button>
              </div>
            </div>
            
            {/* Channel Info */}
            <div className="flex items-center justify-between border-t border-gray-600 pt-6">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" 
                  alt="Channel Avatar" 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-white">CodeWithMike</h3>
                  <p className="text-gray-400 text-sm">2.3M subscribers</p>
                </div>
              </div>
              
              <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
                <FaBell size={16} />
                <span>Subscribe</span>
              </button>
            </div>
            
            {/* Description */}
            <div className="mt-6 p-4 bg-[#3a3a42] rounded-lg">
              <p className="text-gray-300 leading-relaxed">
                In this comprehensive React tutorial, you'll learn everything you need to know to get started with React development. 
                We'll cover components, props, state, hooks, and build a complete project from scratch. Perfect for beginners!
              </p>
              <p id='moreDesc' className="text-gray-300 leading-relaxed hidden">
                In this comprehensive React tutorial, you'll learn everything you need to know to get started with React development. 
                We'll cover components, props, state, hooks, and build a complete project from scratch. Perfect for beginners!
              </p>
              <button id='showMoreBtn' onClick={showMoreDescription} className="text-blue-400 hover:text-blue-300 mt-2 text-sm font-medium">
                Show more
              </button>
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="bg-[#2a2a32] rounded-lg p-6 mt-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">1,247 Comments</h3>
              <button className="text-gray-400 hover:text-gray-300 font-medium">
                Sort by
              </button>
            </div>
            
            {/* Add Comment */}
            <div className="flex space-x-3 mb-8">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face" 
                alt="Your Avatar" 
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-blue-500 pb-2 outline-none transition-colors text-white placeholder-gray-400"
                />
                <div className="flex justify-end space-x-2 mt-3">
                  <button className="px-4 py-2 text-gray-400 hover:bg-[#3a3a42] rounded-full transition-colors">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
                    Comment
                  </button>
                </div>
              </div>
            </div>
            
            {/* Comments List */}
            <div className="space-y-6">
              {
                comments.map((value)=>(
                  <Comment comment={value} />
                ))
              }
            </div>
          </div>
        </div>
        
        {/* Sidebar - Related Videos */}
        <div className="lg:w-96">
          <div className="bg-[#2a2a32] rounded-lg p-4">
            <h2 className="font-semibold text-white mb-4">Up next</h2>
            <div className="space-y-3">

              {
                videoProps.map((video)=>(
                  <VideoCard video={video} />
                ))
              }
              
              
              
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Video;