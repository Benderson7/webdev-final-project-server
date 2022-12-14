import * as teamsCommentDao from "./teams-comment-dao.js"

const TeamsCommentController = (app) => {

    const createComment = async (req, res) => {
        const comment = req.body;
        let newComment = await teamsCommentDao.createComment(comment)
        res.json(newComment)
    }

    const getCommentsForTeam = async (req, res) => {
        const tid = req.params.tid;
        const comments = await teamsCommentDao.getCommentsForTeam(tid)
        res.json(comments)
    }

    const getUserComments = async (req, res) => {
        const uid = req.params.uid;
        const comments = await teamsCommentDao.getCommentsForUser(uid)
        res.json(comments)
    }


    const getUserRecentComments = async (req, res) => {
        const currentUser = req.session['currentUser']
        if (currentUser) {
            const uid = req.session['currentUser']._id
            const comments = await teamsCommentDao.getRecentCommentsForUser(uid)
            res.json(comments)
        }
        else {
            res.json([])
        }
    }


    const getRecentComments = async (req, res) => {
        const currentUser = req.session['currentUser']
        if (currentUser) {
            const uid = req.session['currentUser']._id
            const comments = await teamsCommentDao.getRecentCommentsExcludeCurrentUser(uid)
            res.json(comments)
        }
        else {
            const comments = await teamsCommentDao.getRecentComments()
            res.json(comments)
        }
    }

    const updateComment = async (req, res) => {
        const cid = req.params.cid;
        const body = req.body
        const status = await teamsCommentDao.updateComment(cid, body)
        res.json(status)
    }

    const deleteComment = async (req, res) => {
        const cid = req.params.cid;
        const deleted = await teamsCommentDao.deleteComment(cid);
        res.json(deleted)
    }


    app.get('/teams/:tid/comments', getCommentsForTeam)
    app.post('/comment', createComment)
    app.put('/comment/:cid', updateComment)
    app.delete('/comments/:cid', deleteComment)
    app.get('/users/:uid/comments', getUserComments)
    app.get('/users/comments/recent', getUserRecentComments)
    app.get('/comments/recent', getRecentComments)
}

export default TeamsCommentController;