import teamsModel from "./teams-model.js";
import usersModel from "../users/users-model.js";

export const userCreatesTeam = async (uid, newTeam) => {
    return await teamsModel.create({user: uid, pokemons: newTeam})
}

export const createBlankTeam = async (uid) =>
    await teamsModel.create({user: uid, time: Date.now()})

export const findAllTeams = async () =>
    await teamsModel.find()

export const findTeamByUserID = async (uid) =>
    await teamsModel.findOne({user: uid})

export const checkTeamSizeLimit = async (uid) =>
    await teamsModel.findOne({user: uid, pokemons: {$size: 6}})

export const checkIfTeamHasPokemon = async (uid, pid) =>
    await teamsModel.findOne({user:uid, pokemons: pid})

export const addPokemonToTeam = async (uid, pid) =>
    await teamsModel.updateOne(
        {user: uid},
        {$push: {'pokemons': pid},
            $set: {'time': Date.now()}
        }
    )

export const removePokemonFromTeam = async (uid, pid) =>
    await teamsModel.updateOne(
        {user: uid},
        {$pull: {'pokemons': pid},
            $set: {'time': Date.now()}
        }
    )

export const getTeamsWithPokemon = async (pid) =>
    await teamsModel.find({pokemons: pid}, {pokemons: false, __v: false})
        .populate({path: "user", select: {_id: 1, username: 1}})
        .exec()


export const getRecentTeams = async () =>
    await teamsModel.find({pokemons: {$not: {$size: 0}}})
        .populate({path: "user", select: {_id: 1, username: 1}})
        .sort({time: -1})
        .limit(3)
        .exec()

export const getRecentTeamsExcludingCurrent = async (uid) =>
    await teamsModel.find({pokemons: {$not: {$size: 0}}, user: {$ne: uid}})
        .populate({path: "user", select: {_id: 1, username: 1}})
        .sort({time: -1})
        .limit(3)
        .exec()


export const deleteUserTeam = async (uid) => {
    return await teamsModel.deleteOne({user: uid})
}

