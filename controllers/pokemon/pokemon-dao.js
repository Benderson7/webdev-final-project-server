import pokemonModel from "./pokemon-model.js";

export const findPokemon = (id) => pokemonModel.findOne({id: id}).populate({
    path: "teams",
    populate: {
        path: "user",
        model: "UserModel"
    },
});

export const createPokemon = (pokemon) => pokemonModel.create(pokemon);

export const editPokemon = async (pokemon) =>
    await pokemonModel.findOneAndUpdate({id: pokemon.id}, {$set: pokemon});