import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

const initialState = {
    profile:{
        email: null,
        fullname: null,
        avatar: null,
        coverImage: null
    },
    stats:{
        totalViews: 0,
        totalVideos: 0,
        totalSubscribers: 0,
        totalLikes: 0,
    },
    videos:[],
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        updateAvatar: (state, action)=>{
            state.profile.avatar = action.payload
        },
        updateCoverImage: (state, action)=>{
            state.profile.coverImage = action.payload
        }
    }
})

export const getProfile = (state)=> state.user.profile
export const getChannelStats = (state)=> state.user.stats
export const getChannelVideos = (state)=> state.user.videos

export const {updateAvatar, updateCoverImage} = userSlice.actions

export default userSlice.reducer