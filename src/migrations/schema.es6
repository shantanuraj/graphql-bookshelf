const Schema = {
    users: {
        id: {type: 'increments', nullable: false, primary: true},
        email: {type: 'string', maxlength: 254, nullable: false, unique: true},
        name: {type: 'string', maxlength: 150, nullable: false}
    },

    posts: {
        id: {type: 'increments', nullable: false, primary: true},
        user_id: {type: 'integer', nullable: false, unsigned: true},
        message: {type: 'string', maxlength: 500, nullable: true},
        slug: {type: 'string', maxlength: 150, nullable: false, unique: true},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: true}
    }
}

export default Schema;
