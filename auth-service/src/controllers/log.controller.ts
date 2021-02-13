import { authenticate } from './../config/passport.config';
import { ILog } from '../types/mongooseTypes.interface';
import { Request, Response } from 'express';
import { getAllLogsByUser } from './../businessLogic/auditLog.business';
import BaseController from './base.controller';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { Types } from 'mongoose';
import { JWTPayload } from '../types/user.enum';

enum Paths {
    ALL = "/"
}



export default class LogController extends BaseController {
    constructor(path: string) {
        super(path);
    }
    protected intializeRoutes() {
        this.router.get(Paths.ALL,authenticate() ,this.logsByUser);
    }

    private async logsByUser(req: Request<{ user_id: string }>, res: Response<{ logs: ILog[] } | string>) {
        const {  _id } = req.user as JWTPayload;
        try {
            const logs = await getAllLogsByUser(_id);
            return res.json({ logs });
        } catch (ex) {
            return res.status(INTERNAL_SERVER_ERROR).send("Error in fetching logs for user");

        }
    }

}