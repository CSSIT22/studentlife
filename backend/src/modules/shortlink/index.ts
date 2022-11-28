import express from "express"
import shortenlink from "./route/shortenlink"

const shortlinkRoutes = express()
shortlinkRoutes.use(express.json())

shortlinkRoutes.post("/generate", shortenlink)

shortlinkRoutes.get("/test", (req, res) => {
    res.send("himom")
})

shortlinkRoutes.get('/',async(req,res)=>{
    const prisma = res.prisma
    const result = await prisma.shortLink.createMany({
        
    })
})



export default shortlinkRoutes
