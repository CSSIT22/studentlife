import express from "express"
import createCommunity from "./routes/createCommunity"
import deleteCommunity from "./routes/deleteCommunity"
import editCommunity from "./routes/editCommunity"
import getCommunity from "./routes/getCommunity"
import getCommunityFile from "./routes/getCommunityFile"
import getCommunityMember from "./routes/getCommunityMember"
import getCommunityPost from "./routes/getCommunityPost"
import searchCommunity from "./routes/searchCommunity"


const groupRoutes = express()
groupRoutes.use(express.json())


groupRoutes.get("/getCommunity",getCommunity)
groupRoutes.post("/createCommunity",createCommunity)
groupRoutes.delete("/deleteCommunity",deleteCommunity)
groupRoutes.search("/searchCommunity", searchCommunity)
groupRoutes.get("/editCommunity",editCommunity)



groupRoutes.get("/getCommunityFile",getCommunityFile)


groupRoutes.get("/getCommunityPost",getCommunityPost)


groupRoutes.get("/getCommunityMember",getCommunityMember)




export default groupRoutes
