import express from "express"

const blogRoutes = express()

blogRoutes.get("/getpostinfo", (req, res)=>{
    res.send("Hello")
})

export default blogRoutes
