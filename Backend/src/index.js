import dotenv from "dotenv";
import express from "express";
import cors from "cors";
const app=express();
dotenv.config();
app.use(cors());
app.use(express.json());

const Port=process.env.PORT || 5000;
app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
})