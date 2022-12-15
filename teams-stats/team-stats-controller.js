import * as teamsStatsDao from "./teams-stats-dao.js";
import * as teamsDao from "../teams/teams-dao.js";

const TeamsStatsController = (app) => {


    const userLikesTeam = async (req, res) => {
        if (req.session['currentUser'] === undefined) {
            res.json(null)
        }
        else {
            const currentUser = req.session['currentUser']
            const uid = currentUser._id
            const tid = req.params.tid;
            const status = await teamsStatsDao.findStatus(uid, tid)

            let type = 'create'
            if (status) {
                type = 'update'
            }
            await teamsStatsDao.removeStatus(uid, tid);
            const like = await teamsStatsDao.userLike(uid, tid);
            res.json({...like, request: type})
        }
    }

    const userDislikesTeam = async (req, res) => {
        if (req.session['currentUser'] === undefined) {
            res.json(null)
        }
        else {
            const currentUser = req.session['currentUser']
            const uid = currentUser._id
            const tid = req.params.tid;
            const status = await teamsStatsDao.findStatus(uid, tid)

            let type = 'create'
            if (status) {
                type = 'update'
            }
            await teamsStatsDao.removeStatus(uid, tid);
            const like = await teamsStatsDao.userDislike(uid, tid);
            res.json({...like, request: type})
        }
    }

    const userRemovesStatusTeam = async (req, res) => {
        const currentUser = req.session['currentUser']
        const uid = currentUser._id
        const tid = req.params.tid;
        const typeToRemove = req.params.status
        const status = await teamsStatsDao.removeStatus(uid, tid);
        res.json({...status, type: typeToRemove})
    }

    const getTeamStats = async (req, res) => {
        const tid = req.params.tid;
        const teamStats = await teamsStatsDao.getTeamStats(tid)

        let likes = 0;
        let dislikes = 0;
        teamStats.forEach((stat) => {stat.status === 'LIKE' ? likes = likes + 1 : dislikes = dislikes + 1})
        res.json({likes, dislikes})
    }

    const getUserTeamStatus = async (req, res) => {
        if (req.session['currentUser'] === undefined) {
            res.json(null)
        }
        else {
            const currentUser = req.session['currentUser']
            const uid = currentUser._id
            const {tid} = req.params;
            const status = await teamsStatsDao.findStatus(uid, tid)
            res.json(status)
        }
    }


    const getUserLikedTeams = async (req, res) => {
        const uid = req.params.uid;
        const likedTeams = await teamsStatsDao.getUserLikedTeams(uid)
        res.json(likedTeams)
    }

    const getUserDislikedTeams = async (req, res) => {
        const uid = req.params.uid;
        const dislikedTeams = await teamsStatsDao.getUserDislikedTeams(uid)
        res.json(dislikedTeams)
    }


    app.post('/users/likes/:tid', userLikesTeam)
    app.post('/users/dislikes/:tid', userDislikesTeam)
    app.delete('/users/teams/:tid/stats/:status', userRemovesStatusTeam)
    app.get('/teams/:tid/stats', getTeamStats)
    app.get('/users/teams/:tid/status', getUserTeamStatus)
    app.get('/users/:uid/teams/liked', getUserLikedTeams)
    app.get('/users/:uid/teams/disliked', getUserDislikedTeams)
}

export default TeamsStatsController