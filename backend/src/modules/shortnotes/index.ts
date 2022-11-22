import { prisma } from "@prisma/client"
import express from "express"
import getCourses from "./routes/getCourses"
import getResentShortnotes from "./routes/getResentShortnotes"
import postShortnote from "./routes/postShortnote"
const shortnotesRoutes = express()

type s = {
    id: string
    topic: string
    course: string
    owner: string
    createAt: string
    isPublic: boolean
}

export let course = ["CSC110", "CSC210", "CSC220", "CSC213", "CSC218", "MTH110"]

shortnotesRoutes.use(express.json())

shortnotesRoutes.get("/getShortnotes", async (req, res) => {
    const prisma = res.prisma
    const sn = await prisma.sn_Head.findMany()

    const user = req.user?.userId
    //console.log(sn)
    res.send(sn)
    console.log(user)
})

shortnotesRoutes.get("/getResentShortnotes", getResentShortnotes)

shortnotesRoutes.get("/getCourses", getCourses)

shortnotesRoutes.post("/postShortnote", postShortnote)

export default shortnotesRoutes
