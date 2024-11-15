const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary")
const {fileSizeFormatter} = require("../utils/fileUpload")

// Configure Cloudinary with your cloud name and API key/secret

const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: "umairdev",
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

// generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
}

// user register 
const registerUser = asyncHandler( async(req, res) => {
    const {firstName, lastName, email, password, skills, dateOfBirth } = req.body
    // console.log(firstName, lastName, email, password, skills, dateOfBirth)

    
    // Validation
    if(!firstName || !lastName || !email || !password || !skills || !dateOfBirth){
        res.status(400)
        throw new Error("Please fill all required fields")
    };

    // If password length is less than 6
    if(password.length < 6){
        res.status(400)
        throw new Error("Password must be up to 6 characters")
    };

    // Check If email is already exist
    const userExits = await User.findOne({email})
    if(userExits){
    res.status(400)
    throw new Error("User email already exist")   
   };    

  // Handle image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "ecommerce",
        resource_type: "image",
      });
    

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  } catch (error) {
    res.status(500);
    throw new Error("Image could not be uploaded");
  }
  }

   // Create a new user  
const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    skills,
    dateOfBirth,
    photo: fileData,
    
}); 

// Generate a token   
const token = generateToken(user._id)

// Send HTTP-only cookie
res.cookie("token", token, {
    path: "/", // even if we will not set path it will be by default home page
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
});

    if(user){
const {_id, firstName, lastName, email, photo, dateOfBirth, skills } = user   
    res.status(201).json({
    _id, firstName, lastName, email, photo, dateOfBirth, skills, token,
});    
}else {
    res.status(400)
    throw new Error("Invalid user data")
};
});

// login User 
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

// Validation Request
    if(!email || !password){
        res.status(400)
        throw new Error("Please add email and password")
    }
    
// Check if user is exist 
    const user = await User.findOne({email})
    if(!user){
        res.status(400)
    throw new Error("User not found please sign up");    
    }

// User exist , check if password is correct

    const passwordIsCorrect = await bcrypt.compare(password, user.password) 

    // Generate a token   
const token = generateToken(user._id)

// Send HTTP-only cookie
res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
});

    if(user && passwordIsCorrect){
    const {_id, firstName, lastName, email, photo, dateOfBirth, skills} = user   
    res.status(200).json({
        _id, firstName, lastName, email, photo, dateOfBirth, skills, token, 
    });    
    }else{
    res.status(400)    
    throw new Error("Invalid email or password")
    }
}); 


module.exports = {
    registerUser,
    loginUser
}