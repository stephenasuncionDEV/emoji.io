import { Request, Response, NextFunction } from 'express'
import * as admin from 'firebase-admin'

const GOOGLE_CREDENTIALS = require('../../emoji-io-55224-firebase-adminsdk-ldrqz-f78898cc8a.json');

export const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(GOOGLE_CREDENTIALS)
});
export const auth = admin.auth();

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        const decodedToken = await auth.verifyIdToken(token!);

        if (!decodedToken) return res.status(401).json({ message: 'Invalid access token, please relogin.' });
    
        next();
    }
    catch (err) {
        next(err);
    }
}

export default authenticateToken