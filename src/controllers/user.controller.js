import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res)=>{
    const {username, email, fullName, password} = req.body;
    
    if([username, email, fullName, password].some((field)=>
        field?.trim() === ''
    )){
        throw new ApiError(400, "All fields are required.")
    }

    const existedUser = User.findOne({
        $or:[{username},{email}]
    })

    if(!existedUser) throw new ApiError(409, "Username or Email already exists!");

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

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

export {registerUser}