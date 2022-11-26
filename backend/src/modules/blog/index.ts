import express from "express"

const blogRoutes = express()

blogRoutes.get("/getpost", (req, res) => {
    res.send("Hello")
})

blogRoutes.post("/postcreating", (req, res) => {
    res.send("Create Post")
})

export default blogRoutes
