import bookshelf from '../../config/bookshelf';
import User from './model';

const Users = bookshelf.Collection.extend({
    model: User
});

const purgePassword = (user) => {
    if (user.hasOwnProperty('password')) {
        delete user.password
    }
    return user;
}

class Controller {
    getAll(req, res) {
        Users.forge()
        .fetch()
        .then(users => users.map(user => purgePassword(user.toJSON())))
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).json({message: 'No users found.', error}))
    }

    create(req, res) {
        const {
            name,
            email,
            password
        } = req.body;

        Users.forge()
        .create({
            name,
            email,
            password
        })
        .then(user => res.status(200).json(purgePassword(user)))
        .catch(error => res.status(500).json({message: 'Could not create user.', error}));
    }

    getUser(req, res) {
        Users.forge({id: req.params.id})
        .fetch()
        .then((users) => {
            if (!users) {
                res.status(404).json({message: 'No user found.'});
            } else {
                res.status(200).json(purgePassword(users.toJSON()[0]));
            }
        })
        .catch(error => res.status(500).json({message: 'Could not get user.', error}));
    }
}

export default new Controller();
