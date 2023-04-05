const mongoose = require('mongoose')
import { Schema, InferSchemaType, Types } from "mongoose";


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
// export type UserType = InferSchemaType<typeof UserSchema>
export const User = mongoose.model('User', UserSchema)



// const UserSchema = new Schema({
//     sub: {
//         type: String,
//         unique: true,
//         required: true,
//     },
//     assets: [{
//         name: {
//             type: String,
//             required: true,
//         },
//         location: String,
//         credentials: String,
//         details: String,
//         notes: String,
//         activities: [{
//             name: {
//                 type: String,
//                 required: true,
//             },
//             todos: String,
//         }],
//         machines: [{
//             name: {
//                 type: String,
//                 required: true,
//             },
//             type: String,
//             unique_id: String,
//             service: String,
//             todos: String,
//         }],
// /*         inspections: [{
//             name: {
//                 type: String,
//                 required: true,
//             },
//             todos: String,
//             fisrtDate: {
//                 type: Date,
//                 required: true,
//             },
//             // fisrtDate: String,
//             // firstTime: String,
//             repeate_months: {
//                 type: Number,
//                 required: true,
//             },
//             repeate_type: {
//                 type: String,
//                 required: true,
//             },
//             google_calendar_task_id: {
//                 type: String,
//                 required: true,
//             },
//         }], */
//     }],
// })
