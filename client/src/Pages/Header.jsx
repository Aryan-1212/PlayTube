import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoPersonOutline } from "react-icons/io5";
import { VscColorMode } from "react-icons/vsc";
import { GrLanguage } from "react-icons/gr";
import { GoSignOut } from "react-icons/go";

function Header() {
  return (
    <div className="bg-[#1c1c21] text-white w-full h-14 flex justify-between px-10 items-center relative">
      {/* Logo */}
      <div className="text-xl font-bold">
        <NavLink to="/">
          <img
            className="cursor-pointer"
            src="/src/assets/logo.svg"
            alt="logo"
          />
        </NavLink>
      </div>

      {/* Search bar */}
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

      <div className="relative group">
        <NavLink className="hover:underline text-2xl">
          <CgProfile />
        </NavLink>

        <div className="absolute right-0 top-6 bg-[#2a2a32] shadow-2xl w-40 rounded-md hidden group-hover:flex flex-col z-10">
          <NavLink
            to="/profile"
            className="py-2 text-center rounded-tr-md rounded-tl-md hover:bg-[#4a4a52] cursor-pointer px-4 flex content-center space-x-3"
          >
            <div className="flex items-center">
              <IoPersonOutline />
            </div>
            <div>Profile</div>
          </NavLink>
          <NavLink className="py-2 text-center hover:bg-[#4a4a52] cursor-pointer flex px-4 content-center space-x-3">
            <div className="flex items-center">
              <VscColorMode />
            </div>
            <div>
              Mode
            </div>
          </NavLink>
          <NavLink className="py-2 text-center hover:bg-[#4a4a52] cursor-pointer flex px-4 content-center space-x-3">
            <div className="flex items-center">
              <GrLanguage />
            </div>
            <div>
              Language
            </div>
          </NavLink>
          <NavLink
            className="py-2 text-center rounded-br-md rounded-bl-md hover:bg-[#4a4a52] cursor-pointer px-4 flex content-center space-x-3"
          >
            <div className="flex items-center">
              <GoSignOut />
            </div>
            <div>Sign out</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
