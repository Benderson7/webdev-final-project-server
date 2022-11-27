import teamsStatsModel from "./teams-stats-model.js";

export const userLike = async (uid, team) => {
    return await teamsStatsModel.create({user: uid, team: team, status: "LIKE"})
}

export const userRemovelike = async (uid, team) => {
    return await teamsStatsModel.deleteOne({user: uid, team: team, status: "LIKE"})
}

export const userDislike = async (uid, team) => {
    return await teamsStatsModel.create({user: uid, team: team, status: "DISLIKE"})
}

export const userRemoveDislike = async (uid, team) => {
    return await teamsStatsModel.deleteOne({user: uid, team: team, status: "DISLIKE"})
}
