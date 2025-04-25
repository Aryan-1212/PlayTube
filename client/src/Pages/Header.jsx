import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div className='bg-[#001b29] text-white w-full h-14 flex justify-between px-10 space-x-10 items-center'>
      <div>Logo</div>
      <div>Search</div>
      <NavLink to="/profile">Profile</NavLink>
    </div>
  )
}

export default Header