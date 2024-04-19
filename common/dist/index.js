"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hi = exports.UploadSchema = exports.Validation = void 0;
const zod_1 = require("zod");
class Validation {
}
exports.Validation = Validation;
Validation.UploadSchema = zod_1.z.object({
    doctorName: zod_1.z.string().min(3, "Doctor's name must contain atleast 3 characters"),
    patientName: zod_1.z.string().min(3, "Patient's name must contain atleast 3 characters"),
    patientAge: zod_1.z.coerce
        .number()
        .int()
        .gt(0, "Patient's age must be greater than 0")
        .lte(200, "Patient's age must be less than or equal to 200"),
    dateOfRecording: zod_1.z.coerce.date(),
});
exports.UploadSchema = zod_1.z.object({
    doctorName: zod_1.z.string().min(3, "Doctor's name must contain atleast 3 characters"),
    patientName: zod_1.z.string().min(3, "Patient's name must contain atleast 3 characters"),
    patientAge: zod_1.z.coerce
        .number()
        .int()
        .gt(0, "Patient's age must be greater than 0")
        .lte(200, "Patient's age must be less than or equal to 200"),
    dateOfRecording: zod_1.z.coerce.date(),
});
exports.hi = "hello";
