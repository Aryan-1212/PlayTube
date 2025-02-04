import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

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





export {registerUser, loginUser, logoutUser}