import teamsModel from "./teams-model.js";

export const userCreatesTeam = async (uid, newTeam) => {
    return await teamsModel.create({user: uid, pokemons: newTeam})
}

export const findAllTeams = async () =>
    await teamsModel.find()

export const findTeamByUserID = async (uid) => {
    return await teamsModel.findOne({user: uid})
}

