import bookshelf from '../../config/bookshelf';
import User from '../User/model';

const Post = bookshelf.Model.extend({
    tableName: 'posts',
    hasTimestamps: true,
    author() {
        return this.belongsTo(User);
    }
});

export default Post;
