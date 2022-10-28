import { Strategy as MicrosoftStrategy } from "passport-microsoft"
import OAuth2Strategy from "passport-oauth2"
import axios from "axios"
import { PrismaClient } from "@prisma/client"

/**
 *
 * @param prisma taking in prisma client for storing data from Microsoft to our database
 * @returns done(null, profile) if everything goes right or done(error) when error happend
 *
 * when create new object of Microsoft Strategy, it takes 2 arguments
 * 1. object that contains Application information and setup (clientID, clientSecret, etc.)
 * 2. a function that handle the response from the microsoft graph database in this case verify(prisma)
 *
 * verify(prisma): take prisma and use it to send data to our database when user login into our application via microsoft
 *
 * more info on official document of passport-microsoft
 */
const verify: (prisma: PrismaClient) => OAuth2Strategy.VerifyFunction =
    (prisma) => async (accessToken: string, refreshToken: string, profile: any, done: OAuth2Strategy.VerifyCallback) => {
        let profile_pic: any

        // getting image of user from microsoft
        try {
            profile_pic = await axios.get(`https://graph.microsoft.com/v1.0/me/photos/48x48/$value`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "image/jpg",
                },
                responseType: "arraybuffer",
            })
        } catch (err) {
            profile_pic = {}
        }

        // getting student id (onPremisesSamAccountName)
        try {
            const { data } = await axios.get(
                `https://graph.microsoft.com/v1.0/users/${profile.id}?$select=onPremisesSamAccountName,department`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            )

            // extract data as json from profile
            const { _json } = profile

            // check if the user is a student of KMUTT or not
            if (_json.jobTitle !== "Student") throw new Error("You must be student of KMUTT")

            // extract firstname and lastname
            const fullname = _json.displayName.split(" ")

            // NOTE: Students with @mail.kmutt.ac.th don't have jobTitle as Student

            const studentInfo = {
                studentId: data.onPremisesSamAccountName,
                fName: fullname[0],
                lName: fullname[1],
                email: _json.mail,
                image: profile_pic.data || null,
                student_major: _json.officeLocation,
            }

            // Database operations
            const student = await prisma.user_profile.create({
                data: {
                    ...studentInfo,
                }
            })

            // return a callback
            return done(null, student)
        } catch (err: any) {
            console.error(err)
            return done(err)
        }
    }

/**
 * export function that take prisma (db ORM) as argument and return
 * Microsoft Strategy for authentication with passport
 *
 * เป็นฟังชั่นที่รับเอา prisma แล้ว return กลับออกมาเป็น Microsoft Strategy เอาไว้ authenticate
 * กับ passport ผ่าน passport.use()
 */
export default (prisma: PrismaClient) => {
    return new MicrosoftStrategy(
        {
            clientID: process.env.CLIENT_ID || "",
            clientSecret: process.env.CLIENT_SECRET || "",
            callbackURL: process.env.CALLBACK_URL,
            scope: ["User.ReadBasic.All"],
            authorizationURL: process.env.AUTH_URL,
            tokenURL: process.env.TOKEN_URL,
        },
        verify(prisma)
    )
}
