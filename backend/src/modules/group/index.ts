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

const groupRoutes = express()
groupRoutes.use(express.json())

//Community
let ownCommunity: OwnCommunity[] = [
    // {
    //     communityId: 1,
    //     communityName: "Dota2",
    //     communityOwnerId: 1,
    //     communityMember: 100,
    //     communityPrivacy: false,
    //     lastActive: "1",
    //     communityCoverPhoto: "https://images.workpointnews.com/workpointnews/2022/08/11195913/1660222751_61185_1719373.jpg",
    // },
]
let joinedCommunity: JoinedCommunity[] = []
let invitedCommunity: InvitedCommunity[] = []
let suggestionsCommunity: SuggestionsCommunity[] = [
    {
        communityId: 2,
        communityName: "League of Legends",
        communityOwnerId: 2,
        communityMember: 100,
        communityPrivacy: true,
        communityCoverPhoto:
            "https://pentagram-production.imgix.net/cc7fa9e7-bf44-4438-a132-6df2b9664660/EMO_LOL_02.jpg?rect=0%2C0%2C1440%2C1512&w=640&crop=1&fm=jpg&q=70&auto=format&fit=crop&h=672",
    },
    {
        communityId: 3,
        communityName: "Learn to code",
        communityOwnerId: 3,
        communityMember: 100,
        communityPrivacy: false,
        communityCoverPhoto: "https://lawsonblake.com/content/images/2020/05/Learn-to-Code.jpg",
    },
    {
        communityId: 4,
        communityName: "Learn to Hack",
        communityOwnerId: 3,
        communityMember: 400,
        communityPrivacy: true,
        communityCoverPhoto: "https://lawsonblake.com/content/images/2020/05/Learn-to-Code.jpg",
    },
]

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
groupRoutes.get("/getcommunitys", (req, res) => {
    //mock up data 2 using for testing
    let community: CommunityType = {
        userId: req.user?.userId,
        count: 5,
        community: {
            ownCommunity: ownCommunity,
            joinedCommunity: joinedCommunity,
            invitedCommunity: invitedCommunity,
            suggestionsCommunity: suggestionsCommunity,
        },
    }
    res.send(community)
    // res.sendStatus(200)
})
groupRoutes.post("/createcommunitys", (req, res) => {
    ownCommunity.push({
        communityName: req.body.communityName,
        communityId: Date.now(),
        communityOwnerId: req.user?.userId,
        communityMember: 1,
        communityPrivacy: req.body.communityPrivacy,
        communityDesc: req.body.communityDesc,
        communityTags: req.body.communityTags,
        lastActive: "1",
        communityCoverPhoto: "https://images.workpointnews.com/workpointnews/2022/08/11195913/1660222751_61185_1719373.jpg",
    })
    res.sendStatus(201)
})

groupRoutes.post("/createCommunity", createCommunity)
groupRoutes.delete("/deleteCommunity", deleteCommunity)
groupRoutes.get("/searchCommunity", searchCommunity)
groupRoutes.post("/editCommunity", editCommunity)
groupRoutes.get("/getCommunity", getCommunity)

groupRoutes.post("/pendingRequest", pendingRequest)
groupRoutes.delete("/leaveCommunity", leaveCommunity)
groupRoutes.post("/joinCommunity", joinCommunity)
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

groupRoutes.get("/communityTest", communityTest)

export default groupRoutes
