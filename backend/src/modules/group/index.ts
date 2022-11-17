import { group } from "console"
import express from "express"
import createCommunity from "./routes/createCommunity"
import deleteCommunity from "./routes/deleteCommunity"
import editCommunity from "./routes/editCommunity"
import searchCommunity from "./routes/searchCommunity"
import Communities from "./testData"

const groupRoutes = express()
groupRoutes.use(express.json())


groupRoutes.get("/Community",(req,res) => {
    res.send(Communities)
})

groupRoutes.get("/searchCommunity/:id", searchCommunity)

groupRoutes.get("/editCommunity/", editCommunity)

groupRoutes.delete("deleteCommunity", deleteCommunity)

groupRoutes.post("createCommunity",createCommunity)

export default groupRoutes
