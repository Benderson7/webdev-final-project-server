import teamsModel from "./teams-model.js";

export const userCreatesTeam = async (uid, newTeam) => {
    return await teamsModel.create({user: uid, pokemons: newTeam})
}

export const createBlankTeam = async (uid) =>
    await teamsModel.create({user: uid})

export const findAllTeams = async () =>
    await teamsModel.find()

export const findTeamByUserID = async (uid) =>
    await teamsModel.findOne({user: uid})

export const addPokemonToTeam = async (uid, pid) =>
    await teamsModel.updateOne(
        {user: uid},
        {$push: {'pokemons': pid}}
    )


export const removePokemonFromTeam = async (uid, pid) =>
    await teamsModel.updateOne(
        {user: uid},
        {$pull: {'pokemons': pid}})

