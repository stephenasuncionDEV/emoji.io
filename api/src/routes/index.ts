import express from 'express'
import user from './user'
import payment from './payment'

const router = express.Router();

router.use('/user', user);
router.use('/payment', payment);

export default router