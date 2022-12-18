import { prisma } from "@prisma/client"
import express from "express"
import editedPost from "./routes/editspost"
import getPostList from "./routes/getPostList"
import getReacted from "./routes/getReacted"
import getStudentPost from "./routes/getStudentPost"
import getUserName from "./routes/getUserName"
import searchPost from "./routes/searchpost"

export type Post = {
    id: string
    name: string
    dateTime: string
    message: string
    likes: number
    comments: number
    shares: number
    avatar: string
    media: string
}
// ต้องเก็บและดึง post ต่างๆ จาก datagrip มา

export let posts: Post[] = [
    {
        id: "1",
        name: "Mr. Cat 1",
        dateTime: "23m",
        message: "Hello from the other side!",
        likes: 253,
        comments: 110,
        shares: 10,
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "https://img.freepik.com/premium-vector/boy-waving-hand-greeting-cute-people-illustration_107355-500.jpg?w=1380",
    },
    {
        id: "2",
        name: "Mr. Cat 2",
        dateTime: "1d",
        message: "Seek success, but always be prepared for random cats.",
        likes: 754,
        comments: 240,
        shares: 100,
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "https://img.freepik.com/premium-vector/smiling-young-man-showing-thumbs-up-illustration-hand-drawn-style_213307-233.jpg?w=1380",
    },
    {
        id: "3",
        name: "Mr. Cat 3",
        dateTime: "4h",
        message: "Sometimes I stare at a door or a wall and I wonder what is this reality, why am I alive, and what is this all about?",
        likes: 841,
        comments: 475,
        shares: 130,
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "https://img.freepik.com/premium-vector/big-obstacle-concept-illustration_1133-825.jpg?w=1800",
    },
    {
        id: "4",
        name: "Mr. Cat 4",
        dateTime: "14m",
        message:
            "Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal. Unqualified, the word football normally means the form of football that is the most popular where the word is used. Sports commonly called football include association football known as soccer in North America and Oceania gridiron football specifically American football or Canadian football Australian rules football rugby union and rugby league and Gaelic football. These various forms of football share to varying extent common origins and are known as football codes.",
        likes: 123,
        comments: 86,
        shares: 53,
        avatar: "https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg",
        media: "https://img.freepik.com/premium-vector/big-obstacle-concept-illustration_1133-825.jpg?w=1800",
    },
]

export const getPost = () => posts

export const setPost = (newData: Post[]) => {
    posts = newData
}

const timelineRoutes = express()

timelineRoutes.use(express.json())

timelineRoutes.get("/getposts", (req, res) => {
    try {
        res.send(posts)
    } catch (error) {
        res.status(400).send("Error no post")
    }
})

timelineRoutes.get("/searchpost/:id", searchPost)

timelineRoutes.get("/getPostList", getPostList)

timelineRoutes.get("/getUserName", getUserName)

timelineRoutes.get("/getReacted", getReacted)

timelineRoutes.get("/getStudentPost/:i", getStudentPost)

timelineRoutes.post("/editspost", editedPost)

export default timelineRoutes
