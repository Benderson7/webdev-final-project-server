import mongoose from "mongoose";

const teamsCommentSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    team: {type: mongoose.Schema.Types.ObjectId, ref: 'TeamModel'},
    comment: {type: String}
}, {collection: 'teams-comment'})


export default teamsCommentSchema