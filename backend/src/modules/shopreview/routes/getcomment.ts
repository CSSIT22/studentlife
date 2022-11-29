import express from "express"

const Comment = express()

Comment.get("/comment/:commentID", (req, res) => {
    res.send("Hello")
})

Comment.post("/createComment", (req, res) => {
    res.send("Create Commet")
})

export default Comment