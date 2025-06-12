import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdSearch } from 'react-icons/io'
import { CgProfile } from "react-icons/cg";

function Header() {
  return (
    <div className="bg-[#1c1c21] text-white w-full h-14 flex justify-between px-10 items-center">
      <div className="text-xl font-bold">Logo</div>

      <div className="flex border border-gray-500 rounded-2xl overflow-hidden">
        <input
          type="text"
          className="w-80 px-3 py-1 bg-transparent focus:outline-none placeholder-gray-400"
          placeholder="Search"
        />
        <button className="bg-gray-700 px-3 flex items-center justify-center">
          <IoMdSearch />
        </button>
      </div>

      <NavLink to="/profile" className="hover:underline text-2xl">
        <CgProfile />
      </NavLink>
    </div>
  )
}

export default Header
