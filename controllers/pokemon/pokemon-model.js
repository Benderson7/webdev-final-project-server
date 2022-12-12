import mongoose from "mongoose";
import pokemonSchema from "./pokemon-schema.js";

const pokemonModel = mongoose.model('pokemonModel', pokemonSchema)

export default pokemonModel