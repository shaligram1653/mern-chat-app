import User from "../models/User.js";


export const getUsersForSidebar=async(req,res)=>{
  try {
    const loggedInuser=req.user_id;

    const allUsers=await User.find({_id:{$ne:loggedInuser}}).select("-password")

    res.status(200).json(allUsers)
  } catch (error) {
    console.log("Error fetching users",error.message);
    res.status(500).json({error:"Internal Server Error"})
  }  
}