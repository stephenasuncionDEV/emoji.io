import { Request, Response, NextFunction } from 'express'
import { OAuth2Client } from 'google-auth-library'

const oauth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        // Check what type of token

        if (!token) return res.status(401).json({ message: 'Invalid access token' });
    
        const ticket = await oauth2Client.verifyIdToken({
            idToken: token,
            audience: [process.env.GOOGLE_CLIENT_ID || '']
        });
        
        if (!ticket) return res.status(401).json({ message: 'Invalid access token' });
    
        next();
    }
    catch (err) {
        next(err);
    }
}

export default authenticateToken