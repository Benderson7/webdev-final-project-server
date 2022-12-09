import teamsStatsModel from "./teams-stats-model.js";

export const findStatus = async (uid, tid) => {
    return await teamsStatsModel.findOne({user: uid, team: tid})
}


export const userLike = async (uid, team) => {
    return await teamsStatsModel.create({user: uid, team: team, status: "LIKE"})
}

export const userDislike = async (uid, team) => {
    return await teamsStatsModel.create({user: uid, team: team, status: "DISLIKE"})
}

export const removeStatus = async (uid, team) =>
    await teamsStatsModel.deleteOne({user: uid, team: team})

export const getTeamStats = async (tid) =>
    await teamsStatsModel.find({team: tid})
