import { Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status-codes'

const EMPTY_BODY = "Empty body, please fill data" ;


enum FailedUserNamePasswordInput {
    USER_NAME_INVALID = "User name empty or invalid, check again",
    PASSWORD_INVALID = "Password empty or invalid, check again"
}

enum FailedMissionInput {
    KEY_INVALID = "Key invalid, check again data",
    VALUE_INVALID= 'Value invalid, check again data'
}

export const validateUserNamePassword = (req: Request, res: Response, next: () => any) => {

    if (!req.body) return res.status(BAD_REQUEST).send(EMPTY_BODY);
    if (!req.body.userName || typeof req.body.userName !== "string") return res.status(BAD_REQUEST).send(FailedUserNamePasswordInput.USER_NAME_INVALID);
    if (!req.body.password || typeof req.body.userName !== "string") return res.status(BAD_REQUEST).send(FailedUserNamePasswordInput.PASSWORD_INVALID);
    next();
}

export const validateMissionInput = (req: Request, res: Response, next: () => any) => {
    if (!req.body) return res.status(BAD_REQUEST).send(EMPTY_BODY);
    if (!req.body.key || typeof req.body.key !== "string") return res.status(BAD_REQUEST).send(FailedMissionInput.KEY_INVALID);
    if (!req.body.value || typeof req.body.value !== "object") return res.status(BAD_REQUEST).send(FailedMissionInput.VALUE_INVALID);
    next();
}