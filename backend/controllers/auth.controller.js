import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup=async (req,res)=>{
    try {
        const {fullName,username,password,confirmPassword,gender}=req.body;
        if(password!== confirmPassword){
            return res.status(400).json({error:"passwords do not match"});
        }
        const user =await User.findOne({username})
        if(user===username){
            return res.status(400).json({error:"Username already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(password,salt)
        
        const boyProfilePic =`https://avatar.iran.liara.run/public/boy?username=${username}`
         const girlProfilePic =`https://avatar.iran.liara.run/public/girl?username=${username}`
         const newUser= new User({
            fullName,
            username,
            password:hashPassword,
            gender,
            profilePic:gender==="male"? boyProfilePic:girlProfilePic
         })
         if(newUser){
         generateTokenAndSetCookie(newUser._id,res);
         await newUser.save();
         res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullName,
            username:newUser.username,
            password:newUser.password
         });
        } else {
            res.status(400).json({error:"invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(400).json({error:"Internal Server Error"});
        
    }
};
export const login=async (req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username});
        const isPasswordCorrect=await bcrypt.compare(password,user?.password||"");
        if(!user||!isPasswordCorrect){
            return res.status(400).json({error:"invalid credentials"})
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic,

        })
    } catch (error) {
        console.log("Error in login Controller",error.message);
        res.status(500).json({error:"internal server error"});
    }
};
export const logout=async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        console.log("error in logging out", error.message)
        res.status(500).json({error:"internal server error"});
    }
};