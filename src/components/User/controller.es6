import bookshelf from '../../config/bookshelf';
import User from './model';

const Users = bookshelf.Collection.extend({
    model: User
});

class Controller {
    getAll(req, res) {
        Users.forge()
        .fetch()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).json({message: 'No users found.', error}))
    }
}

export default new Controller();
