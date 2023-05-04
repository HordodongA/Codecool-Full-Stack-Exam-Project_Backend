import mongoose from 'mongoose';
import { Schema, InferSchemaType } from "mongoose";


const ActivitySchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    todos: String,
})
const MachineSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    model: String,
    unique_id: String,
    service: String,
    todos: String,
})
const AssetSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    address: String,
    location: String,
    credentials: String,
    details: String,
    notes: String,
    activities: {
        required: false,
        type: [ActivitySchema],
    },
    machines: {
        required: false,
        type: [MachineSchema],
    },
})
const UserSchema = new Schema({
    sub: {
        type: String,
        unique: true,
        required: true,
    },
    assets: {
        required: false,
        type: [AssetSchema],
    }
})

export type UserType = InferSchemaType<typeof UserSchema>
export const User = mongoose.model<UserType>('User', UserSchema)