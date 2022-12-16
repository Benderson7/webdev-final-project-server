import mongoose from "mongoose";

const teamsSchema = mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    pokemons: {
        type: [{
            type: Number,
            ref: 'PokemonModel'
        }]
    },
    time: {type: Date, default: Date.now}
},{collection: 'teams'})

export default teamsSchema