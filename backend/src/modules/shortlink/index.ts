import { verifyUser } from "./../backendService/middleware/verifyUser"
import express from "express"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const shortlinkRoutes = express()

shortlinkRoutes.get('/test',async(req,res)=>{
    const allUsers = await prisma.shortLink.findMany()
    res.json(allUsers)
    })

shortlinkRoutes.get('/shortlink' ,async (req,res)=>{
    const allUsers = await prisma.shortLink.findMany()
    res.status(200).json(res)
    console.log(allUsers)
    res.json({msg:"Hello world"})
})
shortlinkRoutes.get("/", async (req, res) => {
    const prisma = res.prisma
    // const result = await prisma.shortLink.createMany({

    // })
})
export default shortlinkRoutes

