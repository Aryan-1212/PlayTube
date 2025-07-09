import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { RiPlayList2Line } from "react-icons/ri";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";

function HeaderLeft() {
  return (
    <>
      <div className="flex flex-col list-none">
        <NavLink to="/" className="flex p-2 rounded-md cursor-pointer hover:bg-[#2a2a31]">
          <div className="w-10 text-2xl flex justify-center items-center">
            <MdOutlineHome />
          </div>
          <li>
            Home
          </li>
        </NavLink>
        <NavLink to="/subscriptions" className="flex p-2 rounded-md cursor-pointer hover:bg-[#2a2a31]">
        <div className="w-10 text-2xl flex justify-center items-center">
            <MdOutlineSubscriptions />
          </div>
          <li>
            Subscription
          </li>
        </NavLink>

        <NavLink to="/history" className="flex p-2 rounded-md cursor-pointer hover:bg-[#2a2a31]">
        <div className="w-10 text-2xl flex justify-center items-center">
            <MdHistory />
          </div>
          <li>
            History
          </li>
        </NavLink>

        <NavLink to="/playlists" className="flex p-2 rounded-md cursor-pointer hover:bg-[#2a2a31]">
        <div className="w-10 text-2xl flex justify-center items-center">
            <RiPlayList2Line />
          </div>
          <li>
            Playlists
          </li>
        </NavLink>

        <NavLink to="/dashboard" className="flex p-2 rounded-md cursor-pointer hover:bg-[#2a2a31]">
        <div className="w-10 text-2xl flex justify-center items-center">
            <AiOutlineDashboard />
          </div>
          <li>
            Dashboard
          </li>
        </NavLink>

        <NavLink to="/watch-later" className="flex p-2 rounded-md cursor-pointer hover:bg-[#2a2a31]">
        <div className="w-10 text-2xl flex justify-center items-center">
            <MdOutlineWatchLater />
          </div>
          <li>
            Watch Later
          </li>
        </NavLink>

        <NavLink to="/liked-videos" className="flex p-2 rounded-md cursor-pointer hover:bg-[#2a2a31]">
        <div className="w-10 text-2xl flex justify-center items-center">
            <AiOutlineLike />
          </div>
          <li>
            Liked Videos
          </li>
        </NavLink>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col list-none">
        <NavLink to="/channel" className="flex p-2 rounded-md cursor-pointer hover:bg-[#2a2a31] space-x-2">
          <div className="w-9 text-2xl flex justify-center items-center">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=160&h=90&fit=crop" className="h-9 rounded-3xl" alt="avatar" />
          </div>
          <li className="flex justify-center items-center">
            Subscription
          </li>
        </NavLink>
        <NavLink to="/channel" className="flex p-2 rounded-md cursor-pointer hover:bg-[#2a2a31] space-x-2">
          <div className="w-9 text-2xl flex justify-center items-center">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=160&h=90&fit=crop" className="h-9 rounded-3xl" alt="avatar" />
          </div>
          <li className="flex justify-center items-center">
            Subscription
          </li>
        </NavLink>
        <NavLink to="/channel" className="flex p-2 rounded-md cursor-pointer hover:bg-[#2a2a31] space-x-2">
          <div className="w-9 text-2xl flex justify-center items-center">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=160&h=90&fit=crop" className="h-9 rounded-3xl" alt="avatar" />
          </div>
          <li className="flex justify-center items-center">
            Subscription
          </li>
        </NavLink>
      </div>
    </>
  );
}

export default HeaderLeft;
