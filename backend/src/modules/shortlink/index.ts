import { verifyUser } from "./../backendService/middleware/verifyUser"
import express from "express"
import shortenlink from "./route/shortenlink"
import getRedirect from "./route/getRedireect"

const shortlinkRoutes = express()
shortlinkRoutes.use(express.json())

shortlinkRoutes.post("/generate", verifyUser, shortenlink)
shortlinkRoutes.get("/redirect", verifyUser, getRedirect)


shortlinkRoutes.get("/", async (req, res) => {
    const prisma = res.prisma
    // const result = await prisma.shortLink.createMany({

    // })
})

export default shortlinkRoutes
