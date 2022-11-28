import { PrismaClient } from "@prisma/client"
import express, { Response, Request } from "express"

const readFromDBRoutes = express()
const prisma = new PrismaClient()

readFromDBRoutes.get("/", (_, res) => {
    return res.send("Schedule module read DB API")
})
//schedule module
readFromDBRoutes.get("/timetable", async(req:Request, res: Response) =>{
    try{
        const timetableDB = await prisma.timetable.findMany()
        res.send(timetableDB)
    }catch(err){
        res.status(404).send("Timetable not found")
    }
})
readFromDBRoutes.get("/event", async (req: Request, res: Response) => {
    try {
        const eventDB = await prisma.event.findMany()
        res.send(eventDB)
    }catch (err){
        res.status(404).send("Event not found")
    }
})
readFromDBRoutes.get("/event_Place", async (req: Request, res: Response) => {
    try {
        const event_PlaceDB = await prisma.event_Place.findMany()
        res.send(event_PlaceDB)
    }catch (err){
        res.status(404).send("Event place not found")
    }
})
readFromDBRoutes.get("/event_Type", async (req: Request, res: Response) => {
    try {
        const event_TypeDB = await prisma.event_Type.findMany()
        res.send(event_TypeDB)
    }catch (err){
        res.status(404).send("Event place not found")
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