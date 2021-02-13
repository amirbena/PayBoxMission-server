
import { UserLoginError, LoginErrorMessage, SignUpErrorMessage,LoginResult, JWTPayload } from '../types/user.enum';
import { IUser, IUserInput } from '../types/mongooseTypes.interface';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { CONFLICT, NOT_FOUND } from 'http-status-codes';
import UserModel from '../models/user.model';





const genKey = async (user: IUser) => {

    const key = process.env.TOKEN_KEY || crypto.randomBytes(16).toString("hex");
    const payload:JWTPayload = {
        _id: user._id,
        userName: user.userName
    }
    return await jwt.sign(payload, key);
}

export const userLogin = async (userInput: IUserInput): Promise<LoginResult> => {

    const { password, userName } = userInput;
    const result = await UserModel.findOne({ userName });

    let error: UserLoginError;
    if (!result) {
        error = {
            status: NOT_FOUND,
            message: LoginErrorMessage.USERNAME_NOT_FOUND
        }
        throw error;
    }
    if (result.password !== password) {
        error = {
            status: CONFLICT,
            message: LoginErrorMessage.PASSWORDS_NOT_MATCH
        }
        throw error;
    }
    const token = await genKey(result);
    return { token, user: result };
}

export const signUp = async (userInput: IUserInput) => {
    const { password, userName } = userInput;
    const result = await UserModel.findOne({ userName });
    if (result) {
        const error = {
            status: CONFLICT,
            message: SignUpErrorMessage
        }
        throw error;
    }
    const user = await UserModel.create({
        userName,
        password
    })
    const token = await genKey(user);
    return { token, user };
}

