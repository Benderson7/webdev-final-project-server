import mongoose from "mongoose";

const teamsSchema = mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    pokemons: {
        type: [{
            type: Number,
            ref: 'PokemonModel'
        }]
    }
},{collection: 'teams'})

export default teamsSchema