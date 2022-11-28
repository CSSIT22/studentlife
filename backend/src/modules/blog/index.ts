import express from "express"
import getPostId from "./routes/getPostId"
import postCreating from "./routes/postCreating"
import postCreatingText from "./routes/postCreatingText"
import searchPost from "./routes/searchPost"

const blogRoutes = express()

blogRoutes.use(express.json())

export type Structure = {
    postId: string
    userId: string
    lastEdit: string
    score: Number
    seen: Boolean
    // postOwner: string
    body: string
    // images: string[]
    // vids: string[]
    // studentsReacted: string[]
    // studentsComment: string[]
    // rePost: string[]
    // userReported: string[]
    // postHided: string[]
    // communityPost: string
}

export let postes: Structure[] = [
    {
        postId: "10001",
        userId: "1000000001",
        lastEdit: "10/2/2022",
        score: 112,
        seen: true,
        body: "asdasdasdasd",
    },

    {
        postId: "10002",
        userId: "1000000221",
        lastEdit: "10/2/2022",
        score: 123131,
        seen: true,
        body: "rdgfhgfjghjgjh",
    },
    {
        postId: "10003",
        userId: "1000000221",
        lastEdit: "10/2/2022",
        score: 33432,
        seen: true,
        body: "dffffdffdsdfesdfsdf",
    },
]

export type PostTextBox = {
    postId: string
    text: string
}

export const getPostDetail = () => postes

export const setPostDetail = (postcreated: Structure[]) => {
    postes = postcreated
}

blogRoutes.get("/getpost", getPostId)

blogRoutes.get("/search/:postId", searchPost)

blogRoutes.post("/postCreating", postCreating)

blogRoutes.post("/postCreatingX", postCreatingText)

export default blogRoutes
