import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectDB from "./DB/connectDB.js";
import { app, server } from "./socket/socket.js";
const PORT= process.env.PORT||5000;
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/user",userRoutes);

server.listen(PORT,()=>{
    connectDB();
    console.log(`The server is running on port ${PORT}`)
});
