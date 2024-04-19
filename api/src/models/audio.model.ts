import mongoose from "mongoose";

interface Attrs {
    audioId: string;
    name: string;
    audio: {
        data: Buffer;
        contentType: String;
    };
}

interface AudioDoc extends mongoose.Document {
    _id: string;
    audioId: string;
    name: string;
    audio: {
        data: Buffer;
        contentType: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

interface AudioModel extends mongoose.Model<AudioDoc> {
    build(attrs: Attrs): AudioDoc;
}

const audioSchema = new mongoose.Schema(
    {
        audioId: { type: String, required: true },
        name: { type: String, required: true },
        audio: {
            data: Buffer,
            contentType: String,
        },
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

audioSchema.statics.build = function (attrs: Attrs) {
    return new Audio(attrs);
};

const Audio = mongoose.model<AudioDoc, AudioModel>("Audio", audioSchema);

export { Audio };
