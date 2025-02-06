import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken';

const generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({
            validateBeforeSave: false
        })

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong, while generating access and refresh tokens")
    }
}

const registerUser = asyncHandler(async (req, res)=>{
    const {username, email, fullName, password} = req.body;
    
    if([username, email, fullName, password].some((field)=>
        field?.trim() === ''
    )){
        throw new ApiError(400, "All fields are required.")
    }

    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser) throw new ApiError(409, "Username or Email already exists!");

    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    let avatarLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0){
        avatarLocalPath = req.files.avatar[0].path;
    }



    if (!avatarLocalPath) throw new ApiError(400, "Avatar is required");

    const avatarCloudinaryPath = await uploadOnCloudinary(avatarLocalPath)
    const coverImageCloudinaryPath = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatarCloudinaryPath) throw new ApiError(400, "Avatart is required");

    const user = await User.create({
        fullName,
        avatar: avatarCloudinaryPath.url,
        coverImage: coverImageCloudinaryPath?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) throw new ApiError(500, "Something went wrong while registering a user");

    return res.status(201).json(new ApiResponse(200, createdUser, "User is registered"))

})

const loginUser = asyncHandler(async(req, res)=>{
    const {username, email, password} = req.body;

    if(!username && !email) throw new ApiError(400, "Username or email is required!");

    // if([username, email, password].some((field)=>{
    //     field?.trim()==''
    // })){
    //     throw new ApiError(400, "All fields are required")
    // }

    const user = await User.findOne({
        $or: [{username},{email}]
    })

    if(!user) throw new ApiError(404, "User doesn't exist, please register!");

    const ifPasswordValid = await user.isPasswordCorrect(password)

    if(!ifPasswordValid) throw new ApiError(401, "Invalid password");

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(202)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, {user: loggedInUser, accessToken, refreshToken},"User logged in successfully"))
})

const logoutUser = asyncHandler(async(req, res)=>{
    await User.findByIdAndUpdate(req.user._id,
        {
            $unset: {refreshToken: 1}
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"))
})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) throw new ApiError(401, "unauthorized request");

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user) throw new ApiError(401, "Invalid refresh token");
    
        if(incomingRefreshToken !== user.refreshToken) throw new ApiError(401,"Invalid refresh token");
    
        const options = {
            httpOnly:true,
            secure:true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(new ApiResponse(200, {accessToken, refreshToken: newRefreshToken}, "Access token refreshed"))
    } catch (error) {
        throw new ApiError(401,"Invalid refresh token")
    }
})

const changeCurrentPassword = asyncHandler(async(req, res)=>{
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect) throw new ApiError(400,"Invalid Password");

    user.password = newPassword
    await user.save({
        validateBeforeSave: false
    })

    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password changed successfully"))
})

const getCurrentUser = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(200, req.user, "current user fetched successfully")
})

const updateAccountDetails = asyncHandler(async(req, res)=>{
    const {fullName, email} = req.body

    if([fullName, email].some((field)=>field?.trim()==='')){
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(res.user._id,
        {
            fullName,
            email
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
})

const updateAvatar = asyncHandler(async(req, res)=>{

    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath) throw new ApiError(400, "Avatar is required");

    const avatarPath = await uploadOnCloudinary(avatarLocalPath)

    if(!avatarPath.url) throw new ApiError(400, "Error while uploading avatar")

    const user = User.findByIdAndUpdate(req.user?._id,
        {
            $set: {
                avatar: avatarPath.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200,{user},"Avatar updated successfully"))
})

const updateCoverImage = asyncHandler(async(req, res)=>{
    const coverImageLocalPath = req.file?.path

    if(!coverImageLocalPath) throw new ApiError(400, "Cover image is missing");
        
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
        
    if(!coverImage) throw new ApiError(400, "Error while uploading image");


    const user = User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                coverImage
            }
        },
        {
            new: true
        }
    ).select("-password")
  
    return res
    .status(200)
    .json(new ApiResponse(200, user, "coverImage updated successfully"))
})

export {registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateAvatar, updateCoverImage}