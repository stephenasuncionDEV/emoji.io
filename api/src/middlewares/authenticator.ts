import { Request, Response, NextFunction } from 'express'
import * as admin from 'firebase-admin'

const serviceAccount: admin.ServiceAccount = {
    projectId: process.env.FB_PROJECT_ID,
    clientEmail: process.env.FB_CLIENT_EMAIL,
    privateKey: process.env.FB_PRIVATE_KEY!.replace(/\\n/g, '\n')
}

export const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
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