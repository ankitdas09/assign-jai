import express from "express";
import "express-async-errors";
import dotenv from 'dotenv';
import { errorHandler } from "./middlewares/error-handler";
import { Query } from 'express-serve-static-core';
import mongoose from "mongoose";
import { AudioRouter } from "./routes/audio.routes";
import cors from 'cors'
import multer from 'multer'

export interface TypedRequest<T extends Query, U> extends Express.Request {
    body: U,
    query: T
}

dotenv.config();
const app = express();
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

export const storage = multer.memoryStorage()

app.use("/v1", AudioRouter)

app.use(errorHandler)

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("[SUCCESS] DB CONNECTED!")
        app.listen(8000, () => {
            console.log("Started on PORT", 8000)
        })
    } catch (error) {
        console.log("[ERROR] DB CONN FAILED!")
    }
}

start()

