import passport from "passport"
import { Strategy as MicrosoftStrategy } from "passport-microsoft"
import OAuth2Strategy from "passport-oauth2"
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "/.env")})

export default () => {
    passport.use(
        "microsoft",
        new MicrosoftStrategy(
            {
                clientID: process.env.CLIENT_ID || "",
                clientSecret: process.env.CLIENT_SECRET || "", 
                callbackURL: process.env.CALLBACK_URL,
                scope: ["user.read", "mail.read", "offline_access"],
                authorizationURL: process.env.AUTH_URL,
                tokenURL: process.env.TOKEN_URL
            },
            (accessToken: string, refreshToken: string, profile: any, done: OAuth2Strategy.VerifyCallback) => {
                console.log(profile)
                done(null, profile)
            }
        )
    )
}