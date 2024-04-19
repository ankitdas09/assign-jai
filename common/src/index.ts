import { z } from "zod";

export class Validation {
    static UploadSchema = z.object({
        doctorName: z.string().min(3, "Doctor's name must contain atleast 3 characters"),
        patientName: z.string().min(3, "Patient's name must contain atleast 3 characters"),
        patientAge: z.coerce
            .number()
            .int()
            .gt(0, "Patient's age must be greater than 0")
            .lte(200, "Patient's age must be less than or equal to 200"),
        dateOfRecording: z.coerce.date(),
    });
}
export const UploadSchema = z.object({
    doctorName: z.string().min(3, "Doctor's name must contain atleast 3 characters"),
    patientName: z.string().min(3, "Patient's name must contain atleast 3 characters"),
    patientAge: z.coerce
        .number()
        .int()
        .gt(0, "Patient's age must be greater than 0")
        .lte(200, "Patient's age must be less than or equal to 200"),
    dateOfRecording: z.coerce.date(),
});

export const hi = "hello"