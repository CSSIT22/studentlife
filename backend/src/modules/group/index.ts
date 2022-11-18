import express from "express"
import createCommunity from "./routes/createCommunity"
import deleteCommunity from "./routes/deleteCommunity"
import getCommunity from "./routes/getCommunity"



const groupRoutes = express()
groupRoutes.use(express.json())


groupRoutes.post("/createCommunity",createCommunity)

groupRoutes.get("/getCommunity",getCommunity)

groupRoutes.delete("/deleteCommunity",deleteCommunity)

export default groupRoutes
