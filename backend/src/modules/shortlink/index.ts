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
export default shortlinkRoutes

