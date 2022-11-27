import express from 'express';
import cors from "cors";
import PokemonController from "./controllers/pokemon/pokemon-controller.js";
import mongoose from "mongoose";
import UsersController from "./users/users-controller.js";
import session from "express-session";
import TeamsController from "./teams/teams-controller.js";

mongoose.connect('mongodb://localhost:27017/pokemon');
const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(session({
    secret: 'SECRET', // might need to put this variable into an environment variable
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false} // convert to true when deploying on heroku, false when running locally
}))
app.use(express.json());
PokemonController(app);
UsersController(app)
TeamsController(app)
app.listen( 4000);