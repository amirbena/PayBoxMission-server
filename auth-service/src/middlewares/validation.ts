import { Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status-codes'

enum UserNamePasswordInput{
    EMPTY_BODY= "Empty body, please fill data",
    USER_NAME_INVALID= "User name empty, check again",
    PASSWORD_INVALID= "Password empty, check again"
}

export const validateUserNamePassword = (req: Request, res: Response, next: () => any) => {
    
    if(req.body)
    next();
}