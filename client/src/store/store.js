import { configureStore } from '@reduxjs/toolkit'
import authReducer from './AuthSlice';
import videosReducer from './VideosSlice';
import userReducer from './UserSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        videos: videosReducer,
        user: userReducer
    }
})

export default store;