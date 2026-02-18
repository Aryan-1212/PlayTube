import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import FormattedDate from './FormattedDate';
import { FaRegUser } from 'react-icons/fa';

function VideoCard({ video }) {

  const location = useLocation();
  const smallVideoCardList = ['/watch']
  const shouldVideoCardSmall = smallVideoCardList.includes(location.pathname)

const CardWrapper = ({ children, className }) => (
  <NavLink
    to={`/watch/${video._id}`}
    className={`block w-full cursor-pointer rounded-lg overflow-hidden transition-colors hover:bg-[#3a3a42] ${className}`}
  >
    {children}
  </NavLink>
);

return !shouldVideoCardSmall ? (
  <CardWrapper className="w-full sm:w-96 md:w-[420px] lg:w-[354px]">
    <div className="w-full h-60 bg-gray-300 rounded-xl overflow-hidden">
      <img
        src={video.thumbnail}
        alt="thumbnail"
        className="w-full h-full object-cover"
      />
    </div>

    <div className="flex space-x-4 items-center p-2">
      {
        video.user[0]?.avatar ? (
          <img
        src={video.user[0]?.avatar}
        alt="avatar"
        className="w-12 h-12 rounded-full object-cover"
      />
        ):(
          <div className= "h-10 w-10 flex items-center justify-center text-2xl">
          <FaRegUser />
          </div>
        )
      }
      {/* <img
        src={video.user[0]?.avatar}
        alt="avatar"
        className="w-12 h-12 rounded-full object-cover"
      /> */}

      <div>
        <h3 className="text-white text-lg font-semibold line-clamp-2">
          {video.title}
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          {video.user[0]?.username}
        </p>
        <p className="text-gray-400 text-sm">
          {video.views} views • <FormattedDate timestamp={video.createdAt} />
        </p>
      </div>
    </div>
  </CardWrapper>
) : (
<CardWrapper className="flex space-x-3 p-2">
  <img
    src={video.thumbnail}
    alt="Video Thumbnail"
    className="w-full h-24 object-cover rounded-lg flex-shrink-0"
  />

  <div className="flex-1 min-w-0">
    <h4 className="text-white text-sm font-semibold leading-tight line-clamp-2 mb-1">
      {video.title}
    </h4>
    <p className="text-gray-400 text-xs">
      {video.user[0]?.username}
    </p>
    <p className="text-gray-500 text-xs">
      {video.views} views • <FormattedDate timestamp={video.createdAt} />
    </p>
  </div>
</CardWrapper>

);

}
export default VideoCard
