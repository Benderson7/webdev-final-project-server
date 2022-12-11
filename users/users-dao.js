import usersModel from "./users-model.js";

export const createUser = async (user) =>
    await usersModel.create(user)

export const findAllUsers = async () =>
    await usersModel.find().sort('username').exec()

export const findUserById = async (uid) =>
    await usersModel.findOne({_id: uid})

export const findUserByUsername = async (username) =>
    await usersModel.findOne({username})

export const findUserByCredentials = async (username, password) =>
    await usersModel.findOne({username, password})

export const updateUser = async (uid, user) =>
    await usersModel.updateOne({_id: uid}, {$set: user})

export const deleteUser = async (uid) => {
    return await usersModel.deleteOne({_id: uid})
}
