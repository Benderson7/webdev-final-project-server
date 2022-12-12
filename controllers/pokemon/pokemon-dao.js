import pokemonModel from "./pokemon-model.js";

export const findPokemon = (id) => pokemonModel.findOne({id: id})
export const createPokemon = (pokemon) => pokemonModel.create(pokemon);
export const addPokemonToTeam = (pid, tid) => pokemonModel.findByIdAndUpdate(
    pid,
    { $push: { teams: tid } }
);