import { PrismaClient } from "@prisma/client"
import express, { Response, Request } from "express"

const readFromDBRoutes = express()
const prisma = new PrismaClient()

readFromDBRoutes.get("/", (_, res) => {
    return res.send("Schedule module read DB API")
})
//schedule module

readFromDBRoutes.get("/event", async (req: Request, res: Response) => {
    try {
        const eventDB = await prisma.event.findMany()
        res.send(eventDB)
    }catch (err){
        res.status(404).send("Event not found")
    }
})

readFromDBRoutes.get("/assignment", async (req: Request, res: Response) =>{
    try{
        const assignmentDB = await prisma.assignment.findMany()
    }catch(err){
        res.status(404).send("Assignment not found")
    }
})
readFromDBRoutes.get("/course", async (req: Request, res:Response)=>{
    try{
        const courseDB = await prisma.course.findMany()
    } catch(err){
        res.status(404).send("Course not found")
    }
})
export default readFromDBRoutes