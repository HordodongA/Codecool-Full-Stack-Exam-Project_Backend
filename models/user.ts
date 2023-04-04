const mongoose = require('mongoose')
import { Schema , InferSchemaType} from "mongoose";


const UserSchema = new Schema({
    sub: {
        type: String,
        unique: true,
        required: true,
    },
    assets: [{
        name: {
            type: String,
            required: true,
        },
        location: String,
        credentials: String,
        details: String,
        notes: String,
        activities: [{
            name: {
                type: String,
                required: true,
            },
            todos: String,
        }],
        machines: [{
            name: {
                type: String,
                required: true,
            },
            type: String,
            unique_id: String,
            service: String,
            todos: String,
        }],
        inspections: [{
            name: {
                type: String,
                required: true,
            },
            todos: String,
            fisrtDate: {
                type: Date,
                required: true,
            },
            // fisrtDate: String,
            // firstTime: String,
            repeate_months: {
                type: Number,
                required: true,
            },
            repeate_type: {
                type: String,
                required: true,
            },
            google_calendar_task_id: {
                type: String,
                required: true,
            },
        }],
    }],
})

export type UserType = InferSchemaType<typeof UserSchema>
export const User = mongoose.model('User', UserSchema)