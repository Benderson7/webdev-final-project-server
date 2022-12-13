import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: String,
    firstName: String,
    lastName: String,
    role: {type: String, enum: ['ADMIN', 'USER'], default: "USER"},
    team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TeamsModel'
        }
}, {collection: 'users'})

export default usersSchema