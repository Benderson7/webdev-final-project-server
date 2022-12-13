import * as teamsDao from "./teams-dao.js";

const TeamsController = (app) => {

    const findTeamByUserID = async (req, res) => {
        const uid = req.params.uid;
        const team = await teamsDao.findTeamByUserID(uid);
        res.json(team)
    }

    const findAllTeams = async (req, res) => {
        const teams = await teamsDao.findAllTeams();
        res.json(teams)
    }

    const createTeam = async (req, res) => {
        const uid = req.params.uid;
        const pokemons = req.body.pokemons;
        const newTeam = await teamsDao.userCreatesTeam(uid, pokemons)
        res.json(newTeam)
    }

    const addToTeam = async (req, res) => {
        const {uid, pid} = req.params

        // Need to check if the team has been created
        const existingTeam = await teamsDao.findTeamByUserID(uid)

        // Create an initial blank team if there is no team
        if (!existingTeam) {
            await teamsDao.createBlankTeam(uid)
        }

        // Add the pokemon to the team
        const status = await teamsDao.addPokemonToTeam(uid, pid)
        res.json(status)

        // Might need to check if the team already has 6 pokemon

    }

    const removeFromTeam = async (req, res) => {
        const {uid, pid} = req.params
        const status = await teamsDao.removePokemonFromTeam(uid, parseInt(pid))
        res.json(status)
    }

    const getTeamsWithPokemon = async (req, res) => {
        const {pid} = req.params
        const teamsWithPokemon = await teamsDao.getTeamsWithPokemon(parseInt(pid))
        res.json(teamsWithPokemon)
    }

    app.get('/teams/:uid', findTeamByUserID)
    app.get('/teams', findAllTeams)
    app.post('/teams/:uid', createTeam)
    app.put('/users/:uid/teams/add/:pid', addToTeam)
    app.put('/users/:uid/teams/remove/:pid', removeFromTeam)
    app.get('/teams/pokemons/:pid', getTeamsWithPokemon)
}

export default TeamsController;