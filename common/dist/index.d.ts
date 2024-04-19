import { z } from "zod";
export declare class Validation {
    static UploadSchema: z.ZodObject<{
        doctorName: z.ZodString;
        patientName: z.ZodString;
        patientAge: z.ZodNumber;
        dateOfRecording: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        doctorName: string;
        patientName: string;
        patientAge: number;
        dateOfRecording: Date;
    }, {
        doctorName: string;
        patientName: string;
        patientAge: number;
        dateOfRecording: Date;
    }>;
}
export declare const UploadSchema: z.ZodObject<{
    doctorName: z.ZodString;
    patientName: z.ZodString;
    patientAge: z.ZodNumber;
    dateOfRecording: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    doctorName: string;
    patientName: string;
    patientAge: number;
    dateOfRecording: Date;
}, {
    doctorName: string;
    patientName: string;
    patientAge: number;
    dateOfRecording: Date;
}>;
export declare const hi = "hello";
