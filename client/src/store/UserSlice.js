import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

const initialState = {
    email: null,
    fullname: null,
    avatar: null,
    coverImage: null,
    watchHistory: null,
    totalViews: 0,
    totalVideos: 0,
    totalSubscribers: 0,
    totalLikes: 0,
}