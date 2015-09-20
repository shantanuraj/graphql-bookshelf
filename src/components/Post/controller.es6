import bookshelf from '../../config/bookshelf';
import Post from './model';

const Posts = bookshelf.Collection.extend({
    model: Post
});

class Controller {
    getAll(req, res) {
        Posts.forge()
        .fetch()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json({message: 'No posts found.', error}))
    }
}

export default new Controller();
