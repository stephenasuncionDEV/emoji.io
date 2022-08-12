import express from 'express'
import { 
    createCheckout,
    getSession
} from './controller'
import authenticateToken from '../../middlewares/authenticator'
import { 
    CreateSessionValidator,
    GetSessionValidator
} from '../../middlewares/validators'

const router = express.Router();

router.post('/createCheckout', authenticateToken, CreateSessionValidator, createCheckout);
router.get('/getSession', authenticateToken, GetSessionValidator, getSession);

export default router