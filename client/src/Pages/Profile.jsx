import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getUser } from '../store/AuthSlice';
import { TbUserEdit } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import EditImageModal from '../Components/EditImageModal';
import { getProfile } from '../store/UserSlice';

function Profile() {

  const userProfile = useSelector(getProfile)
  console.log(userProfile)
  

  const location = useLocation()
  const channelList = ['/channel']
  const isChannel = channelList.includes(location.pathname)
  const user = useSelector(getUser)?.user

  const [editCoverImage, setEditCoverImage] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);
  const [editType, setEditType] = useState(null); // null, avatar, coverimage

  return (
    <div>
      {editType && <EditImageModal type={editType} close={()=>setEditType(null)} />}
      <div className='flex flex-col mx-28 h-full'>
        <div className='w-full h-60 relative rounded-2xl group cursor-pointer' onClick={()=>setEditType('coverImage')}>
          <img
            src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
            alt="coverImage"
            className='w-full h-full object-cover rounded-2xl'
          />
          <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl'>
          <div className='flex items-center gap-2 text-white text-xl font-medium'>
            <FiEdit />
            <span>Edit</span>
          </div>
          </div>
            
        </div>

        <div className='w-full h-80 flex items-center space-x-10'>
          <div className='w-72 h-72 flex'>
            <div className='relative rounded-full cursor-pointer' onClick={()=>setEditType('avatar')}>
              <img
                src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                className='w-full h-full object-cover rounded-full'
                alt="avatar"
              />
              <div className='absolute inset-0 opacity-0 hover:opacity-100 flex items-center justify-center bg-black/50 rounded-full'>
                <div className='flex items-center justify-center text-xl gap-2'>
                <TbUserEdit />
                <span>Edit</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center pl-4 space-y-6'>
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
              {
                isChannel? "Subscribe": "Customize"
              }
            </button>
          </div>
        </div>
      </div>

      </div>
  );
}

export default Profile;
