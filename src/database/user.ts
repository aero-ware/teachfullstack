import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    _id: string;
    html: number;
    css: number;
    js: number;
    ts: number;
    djs: number;
    react: number;
    next: number;
    express: number;
    mongo: number;
}

const schema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    html: {
        type: Number,
        default: 0,
    },
    css: {
        type: Number,
        default: 0,
    },
    js: {
        type: Number,
        default: 0,
    },
    ts: {
        type: Number,
        default: 0,
    },
    djs: {
        type: Number,
        default: 0,
    },
    react: {
        type: Number,
        default: 0,
    },
    next: {
        type: Number,
        default: 0,
    },
    express: {
        type: Number,
        default: 0,
    },
    mongo: {
        type: Number,
        default: 0,
    },
});

const users = mongoose.model<IUser>("users", schema);

export default users;
