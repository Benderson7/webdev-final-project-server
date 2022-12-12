import mongoose from "mongoose";


const teamLimit = (team) => {
    return team.length <= 6;
}

const teamsSchema = mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    pokemons: {
        type: [{
            type: Number,
            ref: 'PokemonModel'
        }],
        validate: [teamLimit, '{PATH} exceeds the limit of 6']
    }
},{collection: 'teams'})


export default teamsSchema