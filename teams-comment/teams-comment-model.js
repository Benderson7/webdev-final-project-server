import mongoose from "mongoose";
import teamsCommentSchema from "./teams-comment-schema.js";

const teamsCommentModel = mongoose.model('TeamsCommentModel', teamsCommentSchema)

export default teamsCommentModel