import mongoose from "mongoose";
import { IMissionInput } from '../types/mission.enum'


export interface IMission extends IMissionInput, mongoose.Document { }

const UsersSchemaName= "Users";
const MissionSchemaName = "Missions";
const missionSchema: mongoose.Schema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        ref: UsersSchemaName
    },
    key: {
        type: String,
        required: true
    },
    value: {
        type: Object,
        required: true
    }
})

export default mongoose.model<IMission>(MissionSchemaName, missionSchema);


