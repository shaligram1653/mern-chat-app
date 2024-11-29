import path from "path";
import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectDB from "./DB/connectDB.js";
import { app, server } from "./socket/socket.js";
const PORT= process.env.PORT||5000;

const __dirname=path.resolve();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/user",userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
});
server.listen(PORT,()=>{
    connectDB();
    console.log(`The server is running on port ${PORT}`)
});
