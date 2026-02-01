import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import api from "../services/api";

export const fetchHomeVideos = createAsyncThunk("home/getAllVideos", async(page=1, {rejectWithValue})=>{
    try{
        const response = await api.get(`/videos?page=${page}`)
        return response.data
    }catch(err){
        return rejectWithValue(err.response?.data || {message: "Something went wrong while fetching videos"})
    }
})

const initialState = {
    videos: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true
}

const videosSlice = createSlice({
    name: "videos",
    initialState, 
    reducers: {

    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchHomeVideos.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(fetchHomeVideos.fulfilled, (state, action)=>{
            state.videos = action.payload.data,
            state.loading = false,
            state.error = null
        })
        .addCase(fetchHomeVideos.rejected, (state, action)=>{
            state.loading = false,
            state.error = action.payload.message
        })
    }
})

export const getVideos = (state) => state.videos

export default videosSlice.reducer
