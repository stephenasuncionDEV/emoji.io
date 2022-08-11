import { RequestHandler } from 'express'
import cors from 'cors'

const CorsHandlerMain = (corsOption: cors.CorsOptions | any) => {
    const corsHandler: RequestHandler = (req, res, next) => {
        const origin: any = req.headers.origin;
    
        if(corsOption.origin.includes(origin)) {
            res.header('Access-Control-Allow-Origin', origin);
        }       
    
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
        next();
    }

    return {
        corsHandler
    }
}

export default CorsHandlerMain