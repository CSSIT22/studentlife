import { verifyUser } from "./../backendService/middleware/verifyUser"
import express from "express"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const shortlinkRoutes = express()

<<<<<<< HEAD
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

shortlinkRoutes.post('/test' , async(req,res)=>{
    const[name1,link] = req.body;
    const product = await prisma.shortLink.create({
        data:{
            name:name1,
            link:link
            
        }
    })
    res.status(201).json
})
=======
shortlinkRoutes.post("/generate", verifyUser, shortenlink)


shortlinkRoutes.get("/", async (req, res) => {
    const prisma = res.prisma
    // const result = await prisma.shortLink.createMany({

    // })
})

>>>>>>> fcbe71d0b33b37b6cdfebaf96a53597250baa819
export default shortlinkRoutes

