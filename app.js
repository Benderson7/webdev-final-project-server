import express from 'express';
import cors from "cors";
import PokemonController from "./controllers/pokemon/pokemon-controller.js";

const app = express();
app.use(cors())
app.use(express.json());
PokemonController(app);
app.listen(process.env.PORT || 4000);