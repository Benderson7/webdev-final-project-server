import mongoose from "mongoose";

const teamsCommentSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    team: {type: mongoose.Schema.Types.ObjectId, ref: 'TeamsModel'},
    comment: {type: String},
    time: {type: Date, default: Date.now}
}, {collection: 'teams-comment'})


export default teamsCommentSchema