import mongoose from 'mongoose';


const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("Connected to MongoDb");
    } catch (error) {
        console.log("Error Connecting MongoDB",error.message);
    }

}
export default connectDB;