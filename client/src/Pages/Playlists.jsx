import React from 'react'
import { PlaylistCard } from '../Components'

function Playlists() {

  const playlist={
    name: "Test",
    thumbnail: "",
    videoCount: "2",
    description: "This is description"
  }

  return (
    <div className="p-3 space-y-5">
          <div className="">
            <h1 className="text-4xl">Playlists</h1>
          </div>
          <div className='space-y-10'>
            <div className='flex space-x-10'>
              <PlaylistCard playlist={playlist} />
              <PlaylistCard playlist={playlist} />
              <PlaylistCard playlist={playlist} />
              <PlaylistCard playlist={playlist} />
            </div>
            <div className='flex space-x-10'>
              <PlaylistCard playlist={playlist} />
              <PlaylistCard playlist={playlist} />
              <PlaylistCard playlist={playlist} />
              <PlaylistCard playlist={playlist} />
            </div>
          </div>
        </div>
  )
}

export default Playlists