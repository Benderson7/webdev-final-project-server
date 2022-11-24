import Pokedex from 'pokedex-promise-v2';
import _ from 'underscore';

const P = new Pokedex();

const DEFAULT_SEARCH_INTERVAL = 10;

const getPokemonByName = async (name) => {
    try {
        // looks a little weird cuz I was trying to optimize the async calls
        const details = getDetails(name);
        const evolutions = getEvolutions(name);
        let pokemon = await details;
        pokemon.evolution_chain = await evolutions;
        return pokemon;
    } catch (error) {
        throw error
    }
};

const getDetails = async (name) => {
    const response = await P.getResource(`/api/v2/pokemon/${name}`);
    let pokemon = {};
    pokemon.id = response.id;
    pokemon.name = response.name;
    pokemon.sprite = response.sprites.other["official-artwork"].front_default;
    pokemon.types = response.types.map((t) => t.type.name);
    pokemon.abilities = response.abilities.map((a) => a.ability.name);
    return pokemon;
}

const getEvolutions = async (name) => {
    // need a separate call to give us the evolution chain id
    const pokemon = await P.getPokemonSpeciesByName(name);
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
    P.getPokemonsList({limit: DEFAULT_SEARCH_INTERVAL})
        .then(async (response) => {
            let pokemon = response.results;
            pokemon = await Promise.all(pokemon.map(async (poke) => {
                return await getPokemonByName(poke.name);
            }));
            res.json(pokemon);
        });
};

const searchPokemon = async (req, res) => {
    res.json(await getPokemonByName(req.params.name));
};

export default (app) => {
    app.get('/api/pokemon', getPokemon);
    app.get('/api/pokemon/:name', searchPokemon);
};