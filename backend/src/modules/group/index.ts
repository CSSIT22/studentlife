import express from "express"
import createCommunity from "./routes/community/createCommunity"
import deleteCommunity from "./routes/community/deleteCommunity"
import editCommunity from "./routes/community/editCommunity"
import getCommunity from "./routes/getCommunity"
import getFile from "./routes/community/file/getCommunityFile"
import getCommunityMember from "./routes/community/member/getCommunityMember"
import getCommunityPost from "./routes/community/post/getCommunityPost"
import searchCommunity from "./routes/searchCommunity"
import deleteFile from "./routes/community/file/deleteFile"


const groupRoutes = express()
groupRoutes.use(express.json())

groupRoutes.get("/getCommunity", getCommunity)
groupRoutes.post("/createCommunity", createCommunity)
groupRoutes.delete("/deleteCommunity", deleteCommunity)
groupRoutes.search("/searchCommunity", searchCommunity)
groupRoutes.get("/editCommunity", editCommunity)


groupRoutes.get("/getCommunityFile", getFile)
groupRoutes.delete("/deleteFile", deleteFile)


groupRoutes.get("/getCommunityPost", getCommunityPost)


groupRoutes.get("/getCommunityMember", getCommunityMember)

export default groupRoutes
