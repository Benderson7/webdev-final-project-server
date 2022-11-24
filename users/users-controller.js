import * as userDao from './users-dao.js'

let currentUser = null

const UsersController = (app) => {

    const findAllUsers = async (req, res) => {
        const users = await userDao.findAllUsers()
        res.json(users)
    }

    const register = async (req, res) => {
        const user = req.body;

        // Send a failure if the body is missing the required values
        if (!user.username) {
            res.sendStatus(403)
            return
        }
        const existingUser = await userDao.findUserByUsername(user.username)

        // Send a failure if the user has already been registered
        if(existingUser) {
            res.sendStatus(403)
            return
        }

        // Creating a new user
        const newUser = await userDao.createUser(user)
        res.json(newUser)
    }

    const login = async (req, res) => {
        const credentials = req.body
        const existingUser = await userDao
            .findUserByCredentials(credentials.username, credentials.password)
        if(existingUser) {
            currentUser = existingUser
            res.json(existingUser)
            return
        }
        else {
            res.sendStatus(403)
        }
    }

    const logout = (req, res) => {
        currentUser = null
        res.sendStatus(200)
    }


    app.get('/users', findAllUsers)
    app.post('/register', register)
    app.post('/login', login)
    app.post('/logout', logout)
}

export default UsersController