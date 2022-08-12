import express from 'express'
import { 
    login, 
    addEmoji, 
    setEmoji, 
    deleteUser, 
    setName, 
    sendEmail, 
    sendSMS,
    getByEmail
} from './controller'
import authenticateToken from '../../middlewares/authenticator'
import { 
    LoginValidator,
    EmojiValidator,
    DeleteValidator,
    SetNameValidator,
    SendEmailValidator,
    SendSMSValidator,
    GetByEmailValidator
} from '../../middlewares/validators'

const router = express.Router();

router.post('/login', authenticateToken, LoginValidator, login);
router.get('/getByEmail', authenticateToken, GetByEmailValidator, getByEmail);
router.patch('/setName', authenticateToken, SetNameValidator, setName);
router.patch('/addEmoji', authenticateToken, EmojiValidator, addEmoji);
router.patch('/setEmoji', authenticateToken, EmojiValidator, setEmoji);
router.delete('/delete', authenticateToken, DeleteValidator, deleteUser);
router.post('/sendEmail', authenticateToken, SendEmailValidator, sendEmail);
router.post('/sendSMS', authenticateToken, SendSMSValidator, sendSMS);

export default router