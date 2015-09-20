import express from 'express';

import controller from './controller';

const router = express.Router();

router.route('/')
    .get(controller.getAll);

export default app => app.use('/users', router);
