import React from 'react'
import { NavLink } from 'react-router-dom'

function HeaderLeft() {
  return (
    <>
    <div className='flex flex-col'>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/subscriptions">Subscription</NavLink>
    <NavLink to="/history">History</NavLink>
    <NavLink to="/playlists">Playlists</NavLink>
    <NavLink to="/dashboard">Dashboard</NavLink>
    <NavLink to="/watch-later">Watch Later</NavLink>
    <NavLink to="/liked-videos">Liked Videos</NavLink>
    </div>
    </>
  )
}

export default HeaderLeft