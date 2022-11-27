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

    app.get('/teams/:uid', findTeamByUserID)
    app.get('/teams', findAllTeams)
    app.post('/teams/:uid', createTeam)
}

export default TeamsController;