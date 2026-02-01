import { configureStore } from '@reduxjs/toolkit'
import authReducer from './AuthSlice';
import videosReducer from './VideosSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        videos: videosReducer
    }
})

export default store;