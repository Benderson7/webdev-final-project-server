import teamsStatsModel from "./teams-stats-model.js";
import teamsModel from "../teams/teams-model.js";

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

export const getUserLikedTeams = async (uid) => {
    return await teamsStatsModel.find({user: uid, status: 'LIKE'}, {user: false, _id: false, __v: false})
        .populate(
            {
                path: 'team',
                populate: {path: 'user', select: {_id: 1, username: 1}},
                select: {_id: 0, pokemons: 0, __v: 0},
            })
        .exec()
}

export const getUserDislikedTeams = async (uid) => {
    return await teamsStatsModel.find({user: uid, status: 'DISLIKE'}, {user: false, _id: false, __v: false})
        .populate(
            {
                path: 'team',
                populate: {path: 'user', select: {_id: 1, username: 1}},
                select: {_id: 0, pokemons: 0, __v: 0},
            })
        .exec()
}
