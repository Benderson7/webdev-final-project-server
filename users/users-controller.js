import * as userDao from './users-dao.js'

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
        newUser.password = '';
        req.session['currentUser'] = newUser;
        res.json(newUser)
    }

    const login = async (req, res) => {
        const credentials = req.body;
        const existingUser = await userDao.findUserByCredentials(credentials.username, credentials.password);
        if(existingUser) {

            existingUser.password = '';
            req.session['currentUser'] = existingUser
            res.json(existingUser);
        }
        else {
            res.sendStatus(403)
        }
    }

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

    const getCurrentUser = (req, res) => {
        res.json(req.session['currentUser']);
    }

    const updateUser = async (req, res) => {
        const userIdToUpdate = req.params.uid;
        const update = req.body;

        if (update.password === '') {
            delete update.password
        }

        const status = await userDao.updateUser(userIdToUpdate, update);
        res.json(status)
    }

    const getUserProfile = async (req, res) => {
        const userID = req.params.uid;
        const user = await userDao.findUserById(userID);
        user.password = '';
        res.json(user)
    }

    const deleteUser = async (req, res) => {
        const userIDToDelete = req.params.uid;
        const status = await userDao.deleteUser(userIDToDelete)
        res.json(status)
    }


    app.get('/users', findAllUsers)
    app.post('/register', register)
    app.post('/login', login)
    app.post('/logout', logout)
    app.post('/users/current', getCurrentUser)
    app.get('/profile/:uid', getUserProfile)
    app.put('/users/:uid', updateUser)
    app.delete('/users/:uid', deleteUser)
}

export default UsersController