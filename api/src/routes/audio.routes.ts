import { Router } from "express";
import { CreateRecord, GetAllRecords, StreamAudio } from "../controllers/audio.controller";
import multer from "multer";
import { storage } from "..";

const upload = multer({storage})

const AudioRouter = Router();

AudioRouter.get("/audio", GetAllRecords);
AudioRouter.post("/audio/upload", upload.single('file'), CreateRecord);
AudioRouter.get("/audio/stream/:id", StreamAudio);

export { AudioRouter };
