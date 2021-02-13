import path from 'path'
import * as  dotenv from 'dotenv'

function definePathDotEnv(): string {
    const dictonary: Record<string, string> = {
        "development": path.join(__dirname, "..", "..", "..", ".env"),
        "test": path.join(__dirname, "..", '..', "..", ".test.env")
    }
    const nodeEnv = process.env.NODE_ENV || "development";
    return dictonary[nodeEnv];
}

const rPath = definePathDotEnv();

dotenv.config({ path: rPath })
