import express from "express"
import createCommunity from "./routes/createCommunity"
import deleteCommunity from "./routes/community/deleteCommunity"
import editCommunity from "./routes/community/editCommunity"
import getCommunity from "./routes/getCommunity"
import getFile from "./routes/community/file/getCommunityFile"
import getCommunityMember from "./routes/community/member/getCommunityMember"
import getCommunityPost from "./routes/community/post/getCommunityPost"
import searchCommunity from "./routes/searchCommunity"
import deleteFile from "./routes/community/file/deleteFile"
import communityTest from "./routes/communityTest"
import pendingRequest from "./routes/community/pendingRequest"
import deleteCommunityMember from "./routes/community/member/deleteCommunityMember"
import acceptRequest from "./routes/community/acceptRequest"
import declineRequest from "./routes/community/declineRequest"
import joinCommunity from "./routes/community/joinCommunity"
import leaveCommunity from "./routes/community/leaveCommunity"
import banMember from "./routes/community/member/banMember"
import setRole from "./routes/community/member/setRole"
import unBanMember from "./routes/community/member/unBanMember"
import getCommunityId from "./routes/community/getCommunityId"
import getTag from "./routes/getTag"
import multer from "multer"
import createPost from "./routes/community/post/createPost"
import deletePost from "./routes/community/post/deletePost"
import pinPost from "./routes/community/post/pinPost"
import unPinPost from "./routes/community/post/unPinPost"
import editPost from "./routes/community/post/editPost"
import likePost from "./routes/community/post/likePost"
import dislikePost from "./routes/community/post/dislikePost"
const upload = multer()
const groupRoutes = express()
groupRoutes.use(express.json())

groupRoutes.get("/getCommunity", getCommunity)

groupRoutes.post("/createCommunity", upload.array("upload"), createCommunity)
groupRoutes.delete("/deleteCommunity", deleteCommunity)
groupRoutes.get("/searchCommunity", searchCommunity)
groupRoutes.patch("/editCommunity:id", upload.array("upload"), editCommunity)
groupRoutes.get("/getCommunity", getCommunity)

groupRoutes.post("/pendingRequest", pendingRequest)
groupRoutes.delete("/leaveCommunity", leaveCommunity)
groupRoutes.post("/joinCommunity", joinCommunity)
groupRoutes.post("/acceptRequest", acceptRequest)
groupRoutes.delete("/declineRequest", declineRequest)

groupRoutes.get("/getCommunityFile/:id", getFile)
groupRoutes.delete("/deleteFile", deleteFile)

// groupRoutes.post("/creatingCommunityPost/:id", creatingCommunityPost)

groupRoutes.get("/getCommunityMember/:id", getCommunityMember)
groupRoutes.delete("/deleteCommunityMember", deleteCommunityMember)
groupRoutes.post("/banMember", banMember)
groupRoutes.post("/setRole", setRole)
groupRoutes.delete("/unBanMember", unBanMember)

groupRoutes.get("/getCommunityId/:id", getCommunityId)
groupRoutes.get("/communityTest", communityTest)
groupRoutes.get("/getTag", getTag)

//Post
groupRoutes.get("/getCommunityPost/:id", getCommunityPost)
groupRoutes.post("/createPost", createPost)
groupRoutes.delete("/deletePost", deletePost)
groupRoutes.post("/pinPost", pinPost)
groupRoutes.post("/unPinPost", unPinPost)
groupRoutes.post("/editPost", editPost)
groupRoutes.post("/likePost", likePost)
groupRoutes.post("/dislikePost", dislikePost)

export default groupRoutes
