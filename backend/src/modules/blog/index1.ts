import express from "express"

const blogRoutes = express()

blogRoutes.get("/post/:post_id", (req, res) => {
    res.send("Hello")
})

blogRoutes.post("/postcreating", (req, res) => {
    res.send("Create Post")
})

export default blogRoutes
