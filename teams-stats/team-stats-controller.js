import * as teamsStatsDao from "./teams-stats-dao.js";

const TeamsStatsController = (app) => {


    const userLikesTeam = async (req, res) => {
        const uid = req.params.uid;
        const tid = req.params.tid;

        await teamsStatsDao.removeStatus(uid, tid);
        const like = await teamsStatsDao.userLike(uid, tid);
        res.json(like)
    }

    const userDislikesTeam = async (req, res) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        await teamsStatsDao.removeStatus(uid, tid);
        const dislike = await teamsStatsDao.userDislike(uid, tid);
        res.json(dislike)
    }

    const userRemovesStatusTeam = async (req, res) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const status = await teamsStatsDao.removeStatus(uid, tid);
        res.json(status)
    }

    const getTeamStats = async (req, res) => {
        const tid = req.params.tid;
        const teamStats = await teamsStatsDao.getTeamStats(tid)

        let likes = 0;
        let dislikes = 0;
        teamStats.forEach((stat) => {stat.status === 'LIKE' ? likes = likes + 1 : dislikes = dislikes + 1})
        res.json({likes, dislikes})
        }

    app.post('/users/:uid/likes/:tid', userLikesTeam)
    app.delete('/users/:uid/likes/:tid', userRemovesStatusTeam)
    app.post('/users/:uid/dislikes/:tid', userDislikesTeam)
    app.get('/teams/:tid/stats', getTeamStats)
}

export default TeamsStatsController