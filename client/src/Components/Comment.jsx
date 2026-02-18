import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import api from "../services/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa6";
import { getUser } from "../store/AuthSlice";

function Comment({ videoId }) {
  const [comments, setComments] = useState(null);
  const [commentsStats, setCommentsStats] = useState(null);
  const [comment, setComment] = useState('');

  const user = useSelector(getUser)?.user?.data

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`comments/${videoId}`);
        setCommentsStats(response.data.data)
        setComments(response.data.data.comments);
      } catch (err) {
        toast.error(err.response?.data);
      }
    };
    if (videoId) fetchComments();
  }, [videoId, comments]);


  const handleCommentSubmit = async () =>{
    try{
      const response = await api.post(`comments/${videoId}`, {content: comment});
      if(response.data.statusCode == 200) toast.success(response.data.message)
    }catch(err){
      toast.error(err.response?.data?.message)
    }
  }


  return (
    <>
      <div className="bg-[#2a2a32] rounded-lg p-6 mt-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">{commentsStats?.totalComments} Comments</h3>
          <button className="text-gray-400 hover:text-gray-300 font-medium">
            Sort by
          </button>
        </div>

        {/* Add Comment */}
        <div className="flex space-x-3 mb-8">
          {
            user?.avatar?(
              <img
            src={user.avatar}
            alt="Your Avatar"
            className="w-10 h-10 rounded-full"
          />    
            ):(
              <div className= "h-10 w-10 flex items-center justify-center text-2xl">
                <FaRegUser />
              </div>
            )
          }
          
          <div className="flex-1">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full bg-transparent border-b-2 border-gray-600 focus:border-blue-500 pb-2 outline-none transition-colors text-white placeholder-gray-400"
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
            />
            <div className="flex justify-end space-x-2 mt-3">
              <button className="px-4 py-2 text-gray-400 hover:bg-[#3a3a42] rounded-full transition-colors" onClick={()=>setComment('')}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors" onClick={handleCommentSubmit}>
                Comment
              </button>
            </div>
          </div>
        </div>

        {/* //TODO Update backend for comment likes */}
        <div className="space-y-6">
          {comments?.map((comment) => (
            <div className="flex space-x-3" key={comment?._id}>

              {
                comment?.user?.avatar?(
                  <img
                    src={comment.user.avatar}
                    alt="Your Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                ):(
                  <div className= "h-10 w-10 flex items-center justify-center text-2xl">
                    <FaRegUser />
                  </div>
                )
              }
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-white">
                    {comment?.user?.username}
                  </span>
                  <span className="text-gray-400 text-sm">{comment?.time}</span>
                </div>
                <p className="text-gray-300 mb-2">{comment?.content}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                    <FaThumbsUp size={14} />
                    <span>{}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                    <FaThumbsDown size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Comment;
