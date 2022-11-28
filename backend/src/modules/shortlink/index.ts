import express from "express"

const shortlinkRoutes = express()

shortlinkRoutes.get('/',async(req,res)=>{
    const prisma = res.prisma
    const result = await prisma.shortLink.createMany({
        
    })
})



export default shortlinkRoutes
