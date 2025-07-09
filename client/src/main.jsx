import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import {Home, About, Contact, Login, Subscriptions, History, Playlists, Dashboard, WatchLater, LikedVideos, Register, Profile, Video, Channel} from './Pages'


const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />
  },{
    path: '',
    element: <Layout />,
    children:[
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/subscriptions',
        element: <Subscriptions />
      },
      {
        path: '/history',
        element: <History />
      },
      {
        path: '/playlists',
        element: <Playlists />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/watch-later',
        element: <WatchLater />
      },
      {
        path: '/Liked-videos',
        element: <LikedVideos />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/watch',
        element: <Video />
      },{
        path: '/channel',
        element: <Profile />
      }
    ]
  }

])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
