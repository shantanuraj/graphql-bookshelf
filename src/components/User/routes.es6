import express from 'express';

import controller from './controller';

const router = express.Router();

router.route('/')
    .get(controller.getAll)
    .post(controller.create);

router.route('/:id')
    .get(controller.getUser);

export default app => app.use('/users', router);
