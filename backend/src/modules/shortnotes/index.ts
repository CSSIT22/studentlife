import { prisma } from "@prisma/client"
import express from "express"
import getComments from "./routes/getComments"
import getCourses from "./routes/getCourses"
import getLibrary from "./routes/getLibrary"
import getResentShortnotes from "./routes/getResentShortnotes"
import getShortnoteDetail from "./routes/getShortnoteDetail"
import postShortnote from "./routes/postShortnote"
import postLibrary from "./routes/postLibrary"
import postComment from "./routes/postComment"
import postResentShortnote from "./routes/postResentShortnote"

const shortnotesRoutes = express()

type s = {
    id: string
    topic: string
    course: string
    owner: string
    createAt: string
    isPublic: boolean
}

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

shortnotesRoutes.get("/getShortnoteDetail/:id", getShortnoteDetail)

shortnotesRoutes.get("/getComments/:id", getComments)

shortnotesRoutes.post("/postShortnote", postShortnote)

shortnotesRoutes.post("/postLibrary", postLibrary)

shortnotesRoutes.post("/postComment", postComment)

shortnotesRoutes.post("/postResentShortnote", postResentShortnote)

export default shortnotesRoutes
