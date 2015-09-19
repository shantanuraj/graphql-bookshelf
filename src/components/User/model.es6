import bookshelf from '../../config/bookshelf';
import Post from '../Post/model';

const User = bookshelf.Model.extend({
    tableName: 'users'
});

export default User;
