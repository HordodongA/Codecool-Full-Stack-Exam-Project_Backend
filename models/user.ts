import mongoose from 'mongoose';
import { Schema, InferSchemaType, Types } from "mongoose";


const UserSchema = new Schema({
    sub: {
        type: String,
        unique: true,
        required: true,
    },
    assets: {
        required: false,
        type: [{
            name: {
                required: true,
                type: String,
            },
            location: String,
            credentials: String,
            details: String,
            notes: String,
            activities: {
                required: false,
                type: [{
                    name: {
                        required: true,
                        type: String,
                    },
                    todos: String,
                }],
            },
            machines: {
                required: false,
                type: [{
                    name: {
                        required: true,
                        type: String,
                    },
                    model: String,
                    unique_id: String,
                    service: String,
                    todos: String,
                }],
            },
        }],
    }
})

export type UserType = InferSchemaType<typeof UserSchema>
export const User = mongoose.model<UserType>('User', UserSchema)


/* 
export interface ActivityType extends Document {
    name?: string,
    todos?: string,
}

export interface MachineType extends Document {
    name?: string,
    type?: string,
    unique_id?: string,
    service?: string,
    todos?: string,
}

export interface AssetType extends Document {
    name?: string,
    address?: string,
    credentials?: string,
    details?: string,
    notes?: string,
    activities?: Types.DocumentArray<ActivityType>,
    machines?: Types.DocumentArray<MachineType>,
}

export interface UserType extends Document {
    sub: string,
    assets?: Types.DocumentArray<AssetType>,
}



const ActivitySchema = new Schema<ActivityType>({
    name: { type: String },
    todos: { type: String }
})

const MachineSchema = new Schema<MachineType>({
    name: { type: String },
    type: { type: String },
    unique_id: { type: String },
    service: { type: String },
    todos: { type: String }
})

const AssetSchema = new Schema<AssetType>({
    name: { type: String},
    address: { type: String },
    credentials: { type: String },
    details: { type: String },
    notes: { type: String },
    activities: [ActivitySchema],
    machines: [MachineSchema],
})

const UserSchema = new Schema<UserType>({
    sub: { type: String, unique: true, required: true },
    assets: [AssetSchema]
})

// export type UserTypee = UserType
export type UserType = InferSchemaType<typeof UserSchema>
export const User = mongoose.model('User', UserSchema)
 */