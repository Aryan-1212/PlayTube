import React from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadUser } from './store/AuthSlice'

function RootLayout() {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadUser())
    },[dispatch])

  return <Outlet />
}

export default RootLayout