import { PrismaClient } from "@prisma/client"
import express from "express"
import airdropRoutes from "./modules/airdrop"
import announcementRoutes from "./modules/announcement"
import blogRoutes from "./modules/blog"
import chatRoutes from "./modules/chat"
import datingRoutes from "./modules/dating"
import groupRoutes from "./modules/group"
import middlewareRoutes from "./modules/middleware"
import notificationRoutes from "./modules/notification"
import qaRoutes from "./modules/qa"
import restaurantRoutes from "./modules/restaurant"
import scheduleRoutes from "./modules/schedule"
import shopRoutes from "./modules/shop"
import shopreviewRoutes from "./modules/shopreview"
import shortlinkRoutes from "./modules/shortlink"
import shortnotesRoutes from "./modules/shortnotes"
import timelineRoutes from "./modules/timeline"
import todolistRoutes from "./modules/todolist"
import transactionRoutes from "./modules/transaction"
import userRoutes from "./modules/user"
import passport from "passport"
import microsoft from "./modules/middleware/passport/microsoft"
import { loginRoutes } from "./modules/middleware/login/loginRoutes"
import session from "express-session"
import { createClient } from "redis"
import connectRedis from "connect-redis"

const prisma = new PrismaClient()

declare global {
    namespace Express {
        export interface Response {
            prisma: PrismaClient
        }
    }
}

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const PORT = 8000
const app = express()

const RedisStore = connectRedis(session)
const redisClient = createClient({
    legacyMode: true,
    url: `redis://${process.env.REDIS_URL}:${process.env.REDIS_URL_PORT}`,
    password: process.env.REDIS_PASSWORD,
})
redisClient.connect().catch((err) => console.log(err))

// config passport for microsoft strategy
passport.use(microsoft(prisma))

app.use(
    session({
        secret: "session secret here",
        resave: false,
        saveUninitialized: false,
        name: "connect.sid",
        cookie: { domain: "localhost", maxAge: 1000 * 60 * 60 * 24 * 30 },
        store: new RedisStore({ client: redisClient }) as session.Store,
    })
)

// config app to use passport
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user: any, done) => {
    done(null, user)
})

app.get("/", (_, res) => {
    return res.send("Welcome to integrated project 2022! - " + process.env.MODE)
})

app.use("/auth", loginRoutes)
app.use((_, res, next) => {
    res.prisma = prisma
    next()
})

app.use("/airdrop", airdropRoutes)
app.use("/announcement", announcementRoutes)
app.use("/blog", blogRoutes)
app.use("/chat", chatRoutes)
app.use("/dating", datingRoutes)
app.use("/group", groupRoutes)
app.use("/middleware", middlewareRoutes)
app.use("/notification", notificationRoutes)
app.use("/qa", qaRoutes)
app.use("/restaurant", restaurantRoutes)
app.use("/schedule", scheduleRoutes)
app.use("/shop", shopRoutes)
app.use("/shopreview", shopreviewRoutes)
app.use("/shortlink", shortlinkRoutes)
app.use("/shortnotes", shortnotesRoutes)
app.use("/timeline", timelineRoutes)
app.use("/todolist", todolistRoutes)
app.use("/transaction", transactionRoutes)
app.use("/user", userRoutes)

app.listen(PORT, () => console.log(`running on ${PORT} !`))
