import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import {Home, About, Contact, Login, Subscriptions, History, Playlists, Dashboard, WatchLater, LikedVideos, Register, Profile, Video, Channel} from './Pages'
import { Provider } from 'react-redux'
import store from './store/store.js'
import RootLayout from './RootLayout.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
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
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </StrictMode>,
)
