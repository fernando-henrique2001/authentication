import { Router } from 'express';

import userRoutes from './user.routes';

const router = Router();

router.use('/user', userRoutes);


router.use('*', (req, res) => res.sendStatus(404));

export { router };