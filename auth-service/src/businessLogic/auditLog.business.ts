
import { ILog, IUser } from '../types/mongooseTypes.interface';
import LogModel from '../models/auditLog.model';
import { LogTypes } from '../types/logTypes.enum';
import { Types } from 'mongoose';

export const insertAuditLog = async (user: Types.ObjectId, logType: LogTypes, content: string): Promise<ILog> => {
    const logCreated = await LogModel.create({
        user,
        logType,
        content
    })
    return logCreated;
}

export const getAllLogsByUser = async (userId: Types.ObjectId): Promise<ILog[]> => await LogModel.find({ user: userId });


