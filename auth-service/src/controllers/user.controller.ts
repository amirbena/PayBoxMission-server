import { validateUserNamePassword } from './../middlewares/validation';
import { LogAndContentResponseBody } from './../types/user.enum';
import { IUserInput } from '../types/mongooseTypes.interface';
import { userLogin, signUp } from '../businessLogic/user.business';
import { Request, Response } from 'express';
import { LogTypes } from '../types/logTypes.enum';
import { insertAuditLog } from '../businessLogic/auditLog.business';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import BaseController from './base.controller';

const headerToSet = "Authorization";

enum Paths {
    Login = '/login',
    SignUp = "/signup"
}

export default class UserController extends BaseController {
    constructor(path: string) {
        super(path);
    }

    protected intializeRoutes() {
        this.router.post(Paths.Login,validateUserNamePassword, this.login);
        this.router.post(Paths.SignUp,validateUserNamePassword ,this.signup);
    }

    private async login(req: Request<any, any, IUserInput>, res: Response<LogAndContentResponseBody>) {
        const { body } = req;
        try {
            const { token, user } = await userLogin(body);
            const successMessage = `${body.userName} authenticated`;
            res.setHeader(headerToSet, token);
            const log = await insertAuditLog(user._id, LogTypes.AUTHENTICATED, successMessage);
            return res.status(OK).json({ log, content: successMessage })

        } catch (ex) {
            const { message } = ex;
            if (ex.status) {
                const { status } = ex;
                return res.status(status).json({ content: message })
            }
            return res.status(INTERNAL_SERVER_ERROR).json({ content: message })
        }
    }
    private async signup(req: Request<any, any, IUserInput>, res: Response<LogAndContentResponseBody>) {
        const { body } = req;
        try {
            const { token, user } = await signUp(body);
            const successMessage = `${body.userName} authenticated`;
            res.setHeader(headerToSet, token);
            const log = await insertAuditLog(user._id, LogTypes.AUTHENTICATED, successMessage);
            return res.json({ log, content: successMessage })

        } catch (ex) {
            const { message } = ex;
            if (ex.status) {
                const { status } = ex;
                return res.status(status).json({ content: message })
            }
            return res.status(INTERNAL_SERVER_ERROR).json({ content: message })
        }
    }
}
