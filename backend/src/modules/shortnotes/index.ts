import { prisma } from "@prisma/client"
import express from "express"
import getCourses from "./routes/getCourses"
import getResentShortnotes from "./routes/getResentShortnotes"
const shortnotesRoutes = express()

type s = {
    id: string
    topic: string
    course: string
    owner: string
    createAt: string
    isPublic: boolean
}
// let sn: s[] = [
//     {
//         id: "9b1deb4d-3b7d-4bad-fb78-2b0d7b3dcb6d",
//         topic: "How to make ER diagram in 10 minutes.",
//         course: "CSC218",
//         owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
//         createAt: "10-6-22",
//         isPublic: false,
//     },
//     {
//         id: "f6hjk89o-d458-4bad-9bdd-j8fklg0d9ifh",
//         topic: "Network foro eginner.",
//         course: "CSC220",
//         owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
//         createAt: "10-6-22",
//         isPublic: false,
//     },
//     {
//         id: "fvb4h8l6-3b7d-f5jv-grt7-lfepgb9ogldg",
//         topic: "Productive with agile.",
//         course: "CSC218",
//         owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
//         createAt: "10-6-22",
//         isPublic: true,
//     },
//     {
//         id: "9b1deb4d-3b7d-4bad-fb78-2b0d7b3dcb6d",
//         topic: "How to get away from 'F' in Algorithm",
//         course: "CSC210",
//         owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
//         createAt: "10-6-22",
//         isPublic: false,
//     },
//     {
//         id: "f6hjk89o-d458-4bad-9bdd-j8fklg0d9ifh",
//         topic: "Tower of Dubai",
//         course: "CSC210",
//         owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
//         createAt: "10-6-22",
//         isPublic: true,
//     },
//     {
//         id: "fvb4h8l6-3b7d-f5jv-grt7-lfepgb9ogldg",
//         topic: "Meowๆ",
//         course: "MTH110",
//         owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
//         createAt: "10-6-22",
//         isPublic: true,
//     },
// ]

export let rsn = [
    {
        id: "9b1deb4d-3b7d-4bad-fb78-2b0d7b3dcb6c",
        topic: "How to make ER diagram in 10 minutes.",
        course: "CSC218",
        owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        createAt: "10-6-22",
        isPublic: true,
    },
    {
        id: "f6hjk89o-d458-4bad-9bdd-j8fklg0d9ifh",
        topic: "Shortest path",
        course: "CSC210",
        owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        createAt: "10-6-22",
        isPublic: false,
    },
    {
        id: "fvb4h8l6-3b7d-f5jv-grt7-lfepgb9ogldg",
        topic: "Java programming",
        course: "CSC110",
        owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        createAt: "10-6-22",
        isPublic: true,
    },
]

export let course = ["CSC110", "CSC210", "CSC220", "CSC213", "CSC218", "MTH110"]

shortnotesRoutes.use(express.json())

shortnotesRoutes.get("/getShortnotes", async (req, res) => {
    const prisma = res.prisma
    const sn = await prisma.sn_Head.findMany()
    console.log(sn)
    res.send(sn)
})

shortnotesRoutes.get("/getResentShortnotes", getResentShortnotes)

shortnotesRoutes.get("/getCourses", getCourses)

export default shortnotesRoutes
