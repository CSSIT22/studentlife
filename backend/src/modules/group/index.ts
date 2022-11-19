import express from "express"
import createCommunity from "./routes/community/createCommunity"
import deleteCommunity from "./routes/community/deleteCommunity"
import editCommunity from "./routes/community/editCommunity"
import getCommunity from "./routes/getCommunity"
import getCommunityFile from "./routes/community/file/getCommunityFile"
import getCommunityMember from "./routes/community/member/getCommunityMember"
import getCommunityPost from "./routes/community/post/getCommunityPost"
import searchCommunity from "./routes/searchCommunity"
import deleteFile from "./routes/community/file/deleteFile"
import joinCommunity from "./routes/community/joinCommunity"
import leaveCommunity from "./routes/community/leaveCommunity"
import deleteMember from "./routes/community/member/deleteCommunityMember"
import setRole from "./routes/community/member/setRole"

const groupRoutes = express()
groupRoutes.use(express.json())

groupRoutes.get("/getCommunity", getCommunity)
groupRoutes.post("/createCommunity", createCommunity)
groupRoutes.delete("/deleteCommunity", deleteCommunity)
groupRoutes.search("/searchCommunity", searchCommunity)
groupRoutes.post("/editCommunity", editCommunity)

groupRoutes.post("/joinCommunity", joinCommunity)
groupRoutes.delete("/leaveCommunity", leaveCommunity)

groupRoutes.get("/getCommunityFile", getCommunityFile)
groupRoutes.delete("/deleteFile", deleteFile)


groupRoutes.get("/getCommunityPost", getCommunityPost)



groupRoutes.get("/getCommunityMember", getCommunityMember)
groupRoutes.delete("/deleteMember", deleteMember)
groupRoutes.post("/setRole", setRole)
// groupRoutes.post("/banMember", banMember)






export default groupRoutes
