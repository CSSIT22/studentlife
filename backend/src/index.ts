import { EXP, PrismaClient } from "@prisma/client"
import express from "express"
import airdropRoutes from "./modules/airdrop"
import announcementRoutes from "./modules/announcement"
import blogRoutes from "./modules/blog"
import chatRoutes from "./modules/chat"
import datingRoutes from "./modules/dating"
import groupRoutes from "./modules/group"
import backendserviceRoutes from "./modules/backendService"
import { notificationRoutes, setIO } from "./modules/notification"
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
import microsoft from "./modules/backendService/passport/microsoft"
import { loginRoutes } from "./modules/backendService/login/loginRoutes"
import session from "express-session"
import { createClient } from "redis"
import connectRedis from "connect-redis"
import cors from "cors"
import http from "http"
import { Server as IOServer, Socket } from "socket.io"
import { verify } from "jsonwebtoken"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import chatSocket from "./modules/chat/chatStocket"
import notiSocket from "./modules/notification/notiSocket"
import airdropSocket from "./modules/airdrop/airdropSocket"
import { set, deleteKey } from "./modules/backendService/socketstore/store"
import mongoose, { mongo } from "mongoose"
import { filterWord } from "./modules/backendService/middleware/filterWord"

const PORT = 8000
const app = express()
app.use(express.json())

const appOrigin = [process.env.CORS_ORIGIN || "", ...(process.env.NODE_ENV === "STAGING" ? [process.env.CORS_ORIGIN_DEV || ""] : [])]

const appCors = cors({
    origin: appOrigin,
    credentials: true,
    allowedHeaders: ["Content-Type"],
})

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

mongoose.connect(process.env.MONGO_URL || "", { authSource: "admin" })

const prisma = new PrismaClient()
const redisClient = createClient({
    legacyMode: true,
    url: `redis://${process.env.REDIS_URL}:${process.env.REDIS_URL_PORT}`,
    password: process.env.REDIS_PASSWORD,
})

declare global {
    namespace Express {
        export interface User {
            fName: string
            lName: string
            email: string
            userId: string
            levels: EXP | null
        }

        export interface Response {
            prisma: PrismaClient
            redis: typeof redisClient
            io: IOServer
        }
    }
}

const RedisStore = connectRedis(session)
redisClient.connect().catch((err) => console.log(err))

// config passport for microsoft strategy
passport.use(microsoft(prisma))

app.use(appCors)

app.use(
    session({
        secret: process.env.COOKIE_SECRET || "",
        resave: false,
        saveUninitialized: false,
        name: process.env.COOKIE_NAME,
        cookie: { domain: process.env.COOKIE_LOCATION, maxAge: 1000 * 60 * 60 * 24 * 30 },
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

app.use((_, res, next) => {
    res.prisma = prisma
    res.redis = redisClient
    next()
})

app.use(filterWord)

app.get("/", (_, res) => {
    return res.send("Welcome to integrated project 2022! - " + process.env.MODE)
})
app.use("/auth", loginRoutes)
app.use("/airdrop", airdropRoutes)
app.use("/announcement", announcementRoutes)
app.use("/blog", blogRoutes)
// app.use("/chat", chatRoutes)
app.use("/dating", datingRoutes)
app.use("/group", groupRoutes)
app.use("/backendservice", backendserviceRoutes)
app.use("/notification", notificationRoutes)
app.use("/qa", qaRoutes)
// app.use("/restaurant", restaurantRoutes)
app.use("/schedule", scheduleRoutes)
app.use("/shop", shopRoutes)
// app.use("/shopreview", shopreviewRoutes)
app.use("/shortlink", shortlinkRoutes)
app.use("/shortnotes", shortnotesRoutes)
app.use("/timeline", timelineRoutes)
app.use("/todolist", todolistRoutes)
app.use("/transaction", transactionRoutes)
app.use("/user", userRoutes)

const server = http.createServer(app)

const io = new IOServer(server, {
    cors: {
        credentials: true,
        origin: appOrigin,
    },
})

io.use((socket, next) => {
    try {
        const token = socket.handshake.headers.authorization
        console.log(token)
        if (!token) {
            throw new Error("not authorized")
        }
        const decoded = verify(token, process.env.COOKIE_SECRET || "") as { userId: string }

        set(socket.id, decoded.userId)
        return next()
    } catch (err) {
        console.log(err)
        return next(new Error("not authorized"))
    }
})

export type customeSocketPrams = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, prisma: PrismaClient) => any

io.on("connection", (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    chatSocket(socket, prisma)

    notiSocket(socket, prisma)

    airdropSocket(socket, prisma)

    socket.on("disconnect", (reason) => {
        deleteKey(socket.id)
    })
    // console.log(store)

    console.log(socket.handshake.headers)
    console.log("Hello")
})

setIO(io)
server.listen(PORT, () => console.log(`running on ${PORT} !`))
// app.listen(PORT, () => console.log(`running on ${PORT} !`))
