import teamsCommentModel from "./teams-comment-model.js";

export const findCommentById = async (id) => {
    return await teamsCommentModel.findById(id)
        .populate('user', 'username')
        .exec()
}

export const createComment = async (comment) => {
    const createdComment = await teamsCommentModel.create(comment)
    return await findCommentById(createdComment._id)
}

export const getCommentsForTeam = async (tid) =>
    await teamsCommentModel.find({team: tid}, {team: false})
        .populate('user', 'username')
        .exec()


export const getCommentsForUser = async (uid) =>
    await teamsCommentModel.find({user: uid}, {_id: false, user: false, __v: false})
        .populate(
            {path: 'team',
                    populate: {path: 'user', select: {_id: 1, username: 1}},
                    select: {_id: 0, pokemons: 0, __v: 0},
            })
        .exec()

export const updateComment = async (cid, newComment) =>
    await teamsCommentModel.updateOne({_id: cid}, {$set: newComment})

export const deleteComment = async (cid) =>
    await teamsCommentModel.deleteOne({_id: cid})
