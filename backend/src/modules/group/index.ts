import express from "express"
import createCommunity from "./routes/createCommunity"
import getCommunity from "./routes/getCommunity"



const groupRoutes = express()
groupRoutes.use(express.json())


groupRoutes.post("/createCommunity",createCommunity)

groupRoutes.get("/getCommunity",getCommunity)

export default groupRoutes
