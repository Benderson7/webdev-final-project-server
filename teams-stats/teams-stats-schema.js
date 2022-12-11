import mongoose from "mongoose";

const teamsStatSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    team: {type: mongoose.Schema.Types.ObjectId, ref: 'TeamsModel'},
    status: {type: String, enum: ['LIKE', 'DISLIKE']}
    }, {collection: 'teams-stat'})


export default teamsStatSchema