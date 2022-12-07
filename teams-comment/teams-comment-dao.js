import teamsCommentModel from "./teams-comment-model.js";

export const createComment = async (comment) => {
    return await teamsCommentModel.create(comment)
}

export const getCommentsForTeam = async (tid) =>
    await teamsCommentModel.find({team: tid}, {team: false, _id: false})
        .populate('user', 'username')
        .exec()

export const updateComment = async (cid, newComment) =>
    await teamsCommentModel.updateOne({_id: cid}, {$set: newComment})

export const deleteComment = async (cid) =>
    await teamsCommentModel.findOneAndDelete({_id: cid})
