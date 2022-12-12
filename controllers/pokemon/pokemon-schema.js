import mongoose from "mongoose";

const pokemonSchema = mongoose.Schema({
    id: Number,
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TeamsModel'
        }
        ]
}, {collection: 'pokemon'})


export default pokemonSchema