import express from 'express';
import cors from "cors";
import PokemonController from "./controllers/pokemon/pokemon-controller.js";
import mongoose from "mongoose";
import UsersController from "./users/users-controller.js";

mongoose.connect('mongodb://localhost:27017/pokemon');
const app = express();
app.use(cors())
app.use(express.json());
PokemonController(app);
UsersController(app)
app.listen( 4000);