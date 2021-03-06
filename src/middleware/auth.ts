import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default function authenticateJWT(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
            if (err) {
                return res.status(403).send();
            }

            req.body.user = user;
            next();
        });
    } else {
        res.status(401).send();
    }
};