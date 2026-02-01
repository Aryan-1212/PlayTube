import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import api from '../services/api.js'

const initialState = {
    user: null,
    isAuthenticated: false,  // false for logged out, and true for logged in :>
    loading: false,
    error: null
}

export const loadUser = createAsyncThunk("users/load", async (_, {rejectWithValue})=>{
    try{
        const response = await api.get("users/current-user");
        return response.data;
    }catch(err){
        // Here, if user has not access token and tries to access home page then, user should not get error
        if(err.response?.status == 401) return null;

        return rejectWithValue({message: "Something went wrong while loading user!"})
    }
})

export const loginUser = createAsyncThunk("users/login", async (user, {rejectWithValue}) => {
    try{
        const response = await api.post("users/login",user);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response?.data || {message: "Something went wrong"});
    }
})

export const registerUser = createAsyncThunk("users/register", async (user, {rejectWithValue})=>{
    try{
        const response = await api.post("users/register", user);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response?.data || {message: "Something went wrong"});
    }
})

export const logoutUser = createAsyncThunk("users/logout", async(_, {rejectWithValue})=>{
    try{
        const response = await api.get("users/logout");
        return response.data
    }catch(err){
        return rejectWithValue(err.response.data || {message: "Something went wrong"})
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        
        // LOGIN cases
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.isAuthenticated = true,
            state.loading = false,
            state.user = action.payload
            state.error = null
        })
        .addCase(loginUser.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.loading = false,
            state.user = null, 
            state.isAuthenticated = false,
            state.error = action.payload.message
        })

        // Load User cases
        .addCase(loadUser.fulfilled, (state, action)=>{
            state.loading = false
            state.error = null

            if(action.payload){
                state.isAuthenticated = true,
                state.user = action.payload
            }else{
                state.user = null;
                state.isAuthenticated = false;
            }
        })
        .addCase(loadUser.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(loadUser.rejected, (state, action)=>{
            state.loading = false,
            state.user = null,
            state.error = action.payload.message,
            state.isAuthenticated = false
        })

        // Register User cases
        .addCase(registerUser.pending, (state, action) =>{
            state.loading = true
        })
        .addCase(registerUser.fulfilled, (state, action)=>{
            state.loading = false,
            state.user = action.payload,
            state.isAuthenticated = true
            state.error = null
        })
        .addCase(registerUser.rejected, (state, action) =>{
            state.isAuthenticated = false,
            state.user = null,
            state.loading = false,
            state.error = action.payload.message
        })


        // Logout User cases
        .addCase(logoutUser.fulfilled, (state, action)=>{
            state.isAuthenticated = false,
            state.user = null,
            state.loading = false,
            state.error = null
        })
        .addCase(logoutUser.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(logoutUser.rejected, (state, action)=>{
            state.error = action.payload.message
        })
    }
})

export const getUser = (state) => state.auth

export default authSlice.reducer