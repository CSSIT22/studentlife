import express from "express"
import shortenlink from "./route/shortenlink"


const shortlinkRoutes = express()
shortlinkRoutes.use(express.json())

shortlinkRoutes.post("/generate", shortenlink)

shortlinkRoutes.get("/test", (req, res) => {
    res.send("himom")
})

 


export default shortlinkRoutes
