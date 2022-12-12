import Pokedex from 'pokedex-promise-v2';
import _ from 'underscore';
import {findPokemon} from "./pokemon-dao.js";

const P = new Pokedex();

const DEFAULT_SEARCH_INTERVAL = 10;

const getPokemonByNameOrId = async (nameOrId) => {
    try {
        // looks a little weird cuz I was trying to optimize the async calls
        const details = getDetails(nameOrId);
        const evolutions = getEvolutions(nameOrId);
        let pokemon = await details;
        pokemon.evolution_chain = await evolutions;

        // this conditional is a quick hack to know whether we're on the profile page or not
        const id = parseInt(nameOrId);
        if (id) {
            pokemon = await findPokemon(id);
            pokemon.teams = pokemon ? pokemon.teams : [];
        }
        return pokemon;
    } catch (error) {
        throw error
    }
};

const getDetails = async (nameOrId) => {
    const response = await P.getResource(`/api/v2/pokemon/${nameOrId}`);
    let pokemon = {};
    pokemon.id = response.id;
    pokemon.name = response.name;
    pokemon.sprite = response.sprites.other["official-artwork"].front_default;
    pokemon.types = response.types.map((t) => t.type.name);
    pokemon.abilities = response.abilities.map((a) => a.ability.name);
    return pokemon;
}

const getEvolutions = async (nameOrId) => {
    // need a separate call to give us the evolution chain id
    const pokemon = await P.getPokemonSpeciesByName(nameOrId);
    let evolutions = (await P.getResource(pokemon.evolution_chain.url)).chain;
    evolutions = cleanupEvolutionInfo(evolutions);
    return evolutions;
};

const cleanupEvolutionInfo = (pokemon) => {
    let details = _.pick(pokemon, ['species', 'name', 'evolves_to']);
    details.name = details.species.name;
    delete details.species

    if (details.evolves_to.length) {
        details.evolves_to = details.evolves_to.map((evolution) => cleanupEvolutionInfo(evolution));
    } else {
        delete details.evolves_to;
    }

    return details;
};

const getPokemon = async (req, res) => {
    // get random slice from first few gens
    P.getPokemonsList({ offset: Math.round(Math.random() * 300), limit: DEFAULT_SEARCH_INTERVAL })
        .then(async (response) => {
            let pokemon = response.results;
            pokemon = await Promise.all(pokemon.map(async (poke) => {
                return await getPokemonByNameOrId(poke.name);
            }));
            res.json(pokemon);
        });
};

const searchPokemon = async (req, res) => {
    res.json(await getPokemonByNameOrId(req.params.id));
};

export default (app) => {
    app.get('/api/pokemon', getPokemon);
    app.get('/api/pokemon/:id', searchPokemon);
};