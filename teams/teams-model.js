import mongoose from "mongoose";
import teamsSchema from "./teams-schema.js";

const teamsModel = mongoose.model('TeamsModel', teamsSchema)

export default teamsModel