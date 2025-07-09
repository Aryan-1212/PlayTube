import React from 'react'
import {FaThumbsUp, FaThumbsDown} from 'react-icons/fa';

function Comment({comment}) {
  return (
    <div className="flex space-x-3">
                    <img 
                      src={comment.avatar}
                      alt="User Avatar" 
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-white">{comment.user}</span>
                        <span className="text-gray-400 text-sm">{comment.time}</span>
                      </div>
                      <p className="text-gray-300 mb-2">
                        {comment.comment}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                          <FaThumbsUp size={14} />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                          <FaThumbsDown size={14} />
                        </button>
                        <button className="text-gray-400 hover:text-blue-400 transition-colors font-medium">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
  )
}

export default Comment