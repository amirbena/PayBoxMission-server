import mongoose from 'mongoose';
import { LogTypes } from './logTypes.enum';


export interface ILog extends mongoose.Document {
    user: mongoose.Types.ObjectId,
    logType: LogTypes,
    content: string,
    timeCreated: Date
};

export interface IUserInput {
    userName: string,
    password: string
}

export interface IUser extends IUserInput, mongoose.Document { }