import { IUser } from '../types/mongooseTypes.interface';
import "./dotenv.config";
import passport from 'passport';
import { ExtractJwt, Strategy as JWTStartegy, VerifiedCallback } from 'passport-jwt'

const { TOKEN_KEY } = process.env;


export const JWTStartegyName = "jwt";

passport.use(new JWTStartegy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: TOKEN_KEY
}, (payload: IUser, done: VerifiedCallback) => {
    return done(null, payload);
}))


export const authenticate = () => passport.authenticate(JWTStartegyName, { session: false });