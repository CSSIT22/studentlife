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

//will fix it later :( ลอง api ก่อนเด้อ
groupRoutes.get("/getcommunitys", (req, res) => {
    let communitys: any = {
        ownCommunitys: [
            {
                ID: 1,
                name: "Dota2",
                Owner: "1",
                Member: 666,
                Tag: [2, 4],
                Describe: "Best mental therapy center",
                roleID: 4,
                isPrivate: true,
                coverPhoto: "https://picsum.photos/id/500/200",
            },
            {
                ID: 2,
                name: "Memeworld",
                Owner: "3",
                Member: 300,
                Tag: [3],
                Describe: "Storage of meme around the world",
                roleID: 4,
                isPrivate: false,
                coverPhoto: "https://picsum.photos/id/501/200",
            },
        ],
        joinedCommunitys: [
            {
                ID: 1,
                name: "Dota2",
                Owner: "1",
                Member: 666,
                Tag: [2, 4],
                Describe: "Best mental therapy center",
                roleID: 4,
                isPrivate: true,
                coverPhoto: "https://picsum.photos/id/1/200",
            },
            {
                ID: 2,
                name: "Memeworld",
                Owner: "3",
                Member: 300,
                Tag: [3],
                Describe: "Storage of meme around the world",
                roleID: 4,
                isPrivate: false,
                coverPhoto: "https://picsum.photos/id/2/200",
            },
            {
                ID: 3,
                name: "IndianFood",
                Owner: "2",
                Member: 150,
                Tag: [1, 2],
                Describe: "No masara no flavor we can’t eat.",
                roleID: 1,
                isPrivate: true,
                coverPhoto: "https://picsum.photos/id/3/200",
            },
            {
                ID: 4,
                name: "ThaiStreetFood",
                Owner: "3",
                Member: 50,
                Tag: [1],
                Describe: "Secret thai street food that have to try once",
                roleID: 1,
                isPrivate: false,
                coverPhoto: "https://picsum.photos/id/4/200",
            },
        ],
        invitations: [
            {
                inviteID: 1,
                communityName: "Programmer community",
                memberNumber: 8000,
                coverPhoto: "https://picsum.photos/id/300/200",
                isPrivate: true,
                userName: "Passakorn puttama", //name of the person who invited
                expireDate: "28",
            },
            {
                inviteID: 2,
                communityName: "Noob community",
                memberNumber: 4000,
                coverPhoto: "https://picsum.photos/id/301/200",
                isPrivate: false,
                userName: "Kitty Melody", //name of the person who invited
                expireDate: "28",
            },
            {
                inviteID: 2,
                communityName: "Noob community",
                memberNumber: 4000,
                coverPhoto: "https://picsum.photos/id/302/200",
                isPrivate: false,
                userName: "Kitty Melody", //name of the person who invited
                expireDate: "28",
            },
        ],
    }
    res.send(communitys)
    // res.sendStatus(200)
})
groupRoutes.get("/getCommunity", getCommunity)
groupRoutes.post("/createCommunity", createCommunity)
groupRoutes.delete("/deleteCommunity", deleteCommunity)
groupRoutes.search("/searchCommunity", searchCommunity)
groupRoutes.get("/editCommunity", editCommunity)

groupRoutes.get("/getCommunityFile", getCommunityFile)

groupRoutes.get("/getCommunityPost", getCommunityPost)

groupRoutes.get("/getCommunityMember", getCommunityMember)

export default groupRoutes
