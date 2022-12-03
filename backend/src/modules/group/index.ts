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

const groupRoutes = express()
groupRoutes.use(express.json())

groupRoutes.get("/getCommunity", getCommunity)
groupRoutes.post("/createtest", (req, res) => {
    const body = req.body
    const userid = req.user?.userId
    const createCommunity: any = {
        communityName: body.communityName,
        communityOwnerId: userid,
        communityDesc: body.communityDesc,
        communityPrivacy: body.communityPrivacy,
        communityPhoto: body.communityCoverPhoto,
        communityTags: body.communityTags,
    }
    console.log("hello")
    console.log(createCommunity)
    console.log(req.body.communityName)
    console.log(req.body.communityTags)
    res.sendStatus(201)
})

groupRoutes.post("/createCommunity", createCommunity)
groupRoutes.delete("/deleteCommunity/:id", deleteCommunity)
groupRoutes.get("/searchCommunity", searchCommunity)
groupRoutes.patch("/editCommunity:id", editCommunity)
groupRoutes.get("/getCommunity", getCommunity)

groupRoutes.post("/pendingRequest", pendingRequest)
groupRoutes.delete("/leaveCommunity/:id", leaveCommunity)
groupRoutes.post("/joinCommunity/:id", joinCommunity)
groupRoutes.post("/acceptRequest", acceptRequest)
groupRoutes.delete("/declineRequest", declineRequest)

groupRoutes.get("/getCommunityFile", getFile)
groupRoutes.delete("/deleteFile", deleteFile)

groupRoutes.get("/getCommunityPost", getCommunityPost)

groupRoutes.get("/getCommunityMember", getCommunityMember)
groupRoutes.delete("/deleteCommunityMember", deleteCommunityMember)
groupRoutes.post("/banMember", banMember)
groupRoutes.post("/setRole", setRole)
groupRoutes.delete("/unBanMember", unBanMember)

groupRoutes.get("/getCommunityId/:id", getCommunityId)
groupRoutes.get("/communityTest", communityTest)
groupRoutes.get("/getTag",getTag)

export default groupRoutes
