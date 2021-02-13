import { ILog, IUser } from './mongooseTypes.interface';
import mongoose from 'mongoose';
export type LogAndContentResponseBody = {
    log?: ILog,
    content: string
}

export enum LoginErrorMessage {
    USERNAME_NOT_FOUND = "User name isn't found",
    PASSWORDS_NOT_MATCH = "Passwords not Match",
}


export type LoginResult = {
    token: string,
    user: IUser
}
export interface JWTPayload {
    _id: mongoose.Types.ObjectId,
    userName: string
}

export const SignUpErrorMessage: string = "User name is found into db";
export interface UserLoginError {
    status: number,
    message: LoginErrorMessage
}
