import express from "express";
import { TypedRequest } from "..";
import { Validation } from "common/dist";
import { z } from "zod";
import { Record } from "../models/record.model";
import { Audio } from "../models/audio.model";
import { v4 as uuidv4 } from "uuid";

type SignupBody = z.infer<typeof Validation.UploadSchema>;

export async function CreateRecord(
    req: TypedRequest<{}, SignupBody>,
    res: express.Response,
    next: express.NextFunction
) {
    const { body } = req;
    const validationResult = Validation.UploadSchema.safeParse(body);
    if (!validationResult.success) {
        return res.status(400).json(validationResult.error.issues);
    }

    const audioId = uuidv4();

    const newRecord = Record.build({
        doctorName: body.doctorName,
        patientName: body.patientName,
        dateOfRecording: body.dateOfRecording,
        patientAge: body.patientAge,
        audioId,
    });

    await newRecord.save();

    const newAudio = Audio.build({
        audioId,
        // @ts-ignore
        name: req.file.originalname,
        audio: {
            // @ts-ignore
            data: req.file.buffer,
            // @ts-ignore
            contentType: req.file.mimetype,
        },
    });

    await newAudio.save();

    res.json(newAudio);
}

export async function StreamAudio(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const { id } = req.params;
    const audio = await Audio.findOne({ audioId: id });
    if (!audio) return next(new Error("audio not found"));
    res.set("Content-Type", audio.audio.contentType);
    res.send(audio.audio.data);
}

export async function GetAllRecords(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const allData = await Record.find()
    return res.json(allData)
}
