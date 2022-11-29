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

    app.post('/users/:uid/likes/:tid', userLikesTeam)
    app.delete('/users/:uid/likes/:tid', userRemovesStatusTeam)
    app.post('/users/:uid/dislikes/:tid', userDislikesTeam)
}

export default TeamsStatsController