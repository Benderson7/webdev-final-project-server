import mongoose from "mongoose";
import teamsStatsSchema from "./teams-stats-schema.js";

const teamsStatsModel = mongoose.model('TeamsStatsModel', teamsStatsSchema)

export default teamsStatsModel