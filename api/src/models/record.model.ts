import mongoose from "mongoose";

interface Attrs {
    doctorName: string;
    patientName: string;
    dateOfRecording: Date;
    patientAge: number;
    audioId: string;
}

interface RecordDoc extends mongoose.Document {
    _id: String,
    name: string;
    slug: string;
    owner: string;
    audioId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface RecordModel extends mongoose.Model<RecordDoc> {
    build(attrs: Attrs): RecordDoc;
}

const recordSchema = new mongoose.Schema(
    {
        doctorName: { type: String, required: true },
        patientName: { type: String, required: true },
        dateOfRecording: { type: Date, required: true },
        patientAge: { type: Number, required: true, maxLength: 64 },
        audioId: { type: String, required: true },
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
            },
        },
    }
);

recordSchema.statics.build = function (attrs: Attrs) {
    return new Record(attrs);
};

const Record = mongoose.model<RecordDoc, RecordModel>("Record", recordSchema);

export { Record };
