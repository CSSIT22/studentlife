import { prisma } from "@prisma/client"
import express from "express"
import getCourses from "./routes/getCourses"
import getLibrary from "./routes/getLibrary"
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
    //console.log(sn)
    res.send(sn)
})

shortnotesRoutes.get("/getResentShortnotes", getResentShortnotes)

shortnotesRoutes.get("/getCourses", getCourses)

shortnotesRoutes.get("/getLibrary", getLibrary)

shortnotesRoutes.post("/postShortnote", postShortnote)

export default shortnotesRoutes
