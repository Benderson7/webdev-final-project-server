import * as teamsCommentDao from "./teams-comment-dao.js"

const TeamsCommentController = (app) => {

    const createComment = async (req, res) => {
        const comment = req.body;
        const newComment = await teamsCommentDao.createComment(comment)
        res.json(newComment)
    }

    const updateComment = async (req, res) => {
        const cid = req.params.cid;
        const body = req.body
        const status = await teamsCommentDao.updateComment(cid, body)
        res.json(status)
    }

    const deleteComment = async (req, res) => {
        const cid = req.params.cid;
        console.log(cid)
        const deleted = await teamsCommentDao.deleteComment(cid);
        res.json(deleted)
    }


    app.post('/comment', createComment)
    app.put('/comment/:cid', updateComment)
    app.delete('/comment/:cid', deleteComment)
}

export default TeamsCommentController;