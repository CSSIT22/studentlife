import express from "express"
import getPostId from "./routes/getPostId"
import postCreating from "./routes/postcreating"
import searchPost from "./routes/searchpost"

const blogRoutes = express()

blogRoutes.use(express.json())

export type Post = {
    postId: string
    text: string
}

export let postDetail: Post[] = [
    { postId: "10001", text: "เทสๆ" },
    { postId: "10002", text: "เทสๆ" },
    { postId: "10003", text: "เทสๆ" },
]

export const getPostDetail = () => postDetail

export const setPostDetail = (postcreated: Post[]) => {
    postDetail = postcreated
}

blogRoutes.get("/getpost", getPostId)

blogRoutes.get("/searchPost/:postId", searchPost)

blogRoutes.post("/postCreating", postCreating)

export default blogRoutes
