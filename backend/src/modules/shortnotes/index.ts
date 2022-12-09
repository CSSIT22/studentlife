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
import deleteShortnote from "./routes/deleteShortnote"
import postInLibrary from "./routes/postInLibrary"
import deleteLibrary from "./routes/deleteLibrary"
import deleteSnInLibrary from "./routes/deleteSnInLibrary"
import postAccess from "./routes/postAccess"
import getFile from "./routes/getFile"
import getEachFile from "./routes/getEachFile"
import deleteComment from "./routes/deleteComment"
import getPeople from "./routes/getPeople"
import deletePeople from "./routes/deletePeople"

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
    const sn = await prisma.sn_Head.findMany({
        include: {
            course: true,
        },
    })
    //console.log(sn)
    res.send(sn)
})

shortnotesRoutes.get("/getResentShortnotes", getResentShortnotes)

shortnotesRoutes.get("/getCourses", getCourses)

shortnotesRoutes.get("/getLibrary", getLibrary)

shortnotesRoutes.get("/getShortnoteDetail/:id", getShortnoteDetail)

shortnotesRoutes.get("/getComments/:id", getComments)

shortnotesRoutes.get("/getFile/:id", getFile)

shortnotesRoutes.get("/getEachFile/:id", getEachFile)

shortnotesRoutes.get("/getPeople/:id", getPeople)

shortnotesRoutes.post("/postShortnote", postShortnote)

shortnotesRoutes.post("/postLibrary", postLibrary)

shortnotesRoutes.post("/postComment", postComment)

shortnotesRoutes.post("/postResentShortnote", postResentShortnote)

shortnotesRoutes.post("/postInLibrary", postInLibrary)

shortnotesRoutes.post("/postAccess", postAccess)

shortnotesRoutes.delete("/deleteShortnote/:id", deleteShortnote)

shortnotesRoutes.delete("/deleteLibrary/", deleteLibrary)

shortnotesRoutes.delete("/deleteSnInLibrary/", deleteSnInLibrary)

shortnotesRoutes.delete("/deleteComment", deleteComment)

shortnotesRoutes.delete("/deletePeople", deletePeople)

export default shortnotesRoutes
