import { ILog } from '../types/mongooseTypes.interface';

import { UserSchemaName } from './user.model';

import { LogTypes } from '../types/logTypes.enum';
import mongoose from 'mongoose';


const AuditLogName = "AuditLog";

const auditLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: UserSchemaName
    },
    logType: {
        type: LogTypes,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timeCreated: {
        type: Date,
        required: true,
        default: new Date()
    }
})

export default mongoose.model<ILog>(AuditLogName, auditLogSchema);