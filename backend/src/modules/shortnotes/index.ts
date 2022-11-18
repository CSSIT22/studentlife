import express from "express"
const shortnotesRoutes = express()

type s = {
    id: string
    topic: string
    course: string
    owner: string
    createAt: string
    isPublic: boolean
}
let sn: s[] = [
    {
        id: "9b1deb4d-3b7d-4bad-fb78-2b0d7b3dcb6d",
        topic: "How to make ER diagram in 10 minutes.",
        course: "CSC218",
        owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        createAt: "10-6-22",
        isPublic: false,
    },
    {
        id: "f6hjk89o-d458-4bad-9bdd-j8fklg0d9ifh",
        topic: "Network foro eginner.",
        course: "CSC220",
        owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        createAt: "10-6-22",
        isPublic: true,
    },
    {
        id: "fvb4h8l6-3b7d-f5jv-grt7-lfepgb9ogldg",
        topic: "Productive with agile.",
        course: "CSC218",
        owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        createAt: "10-6-22",
        isPublic: true,
    },
    {
        id: "9b1deb4d-3b7d-4bad-fb78-2b0d7b3dcb6d",
        topic: "How to make ER diagram in 10 minutes.",
        course: "CSC218",
        owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        createAt: "10-6-22",
        isPublic: false,
    },
    {
        id: "f6hjk89o-d458-4bad-9bdd-j8fklg0d9ifh",
        topic: "Network foro eginner.",
        course: "CSC220",
        owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        createAt: "10-6-22",
        isPublic: true,
    },
    {
        id: "fvb4h8l6-3b7d-f5jv-grt7-lfepgb9ogldg",
        topic: "Productive with agile.",
        course: "CSC218",
        owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        createAt: "10-6-22",
        isPublic: true,
    },
]

shortnotesRoutes.use(express.json())

shortnotesRoutes.get("/getShortnotes", (req, res) => {
    res.send(sn)
})

export default shortnotesRoutes
