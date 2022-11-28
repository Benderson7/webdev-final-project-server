import teamsCommentModel from "./teams-comment-model.js";

export const createComment = async (comment) => {
    return await teamsCommentModel.create(comment)
}

export const updateComment = async (cid, newComment) =>
    await teamsCommentModel.updateOne({_id: cid}, {$set: newComment})

export const deleteComment = async (cid) =>
    await teamsCommentModel.findOneAndDelete({_id: cid})
