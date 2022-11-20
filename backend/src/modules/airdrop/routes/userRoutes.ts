import express, { Request, Response } from "express"
import { verifyUser } from "../.././backendService/middleware/verifyUser"
const userRoutes = express()

//getdepartment
userRoutes.get("/getdepartment", verifyUser,async (req: Request | any, res: Response | any) => {
    try {
        const user = req.user?.userId
        const {prisma} = res;
        const department =  await prisma.major.groupBy({
            by:["facultyId","majorName"],
        })
        res.json(department)
    } catch (err) {
        console.log(err)
    }
})
userRoutes.get("/community", async (req: Request, res: Response) => {
    try{
        const {prisma} = res;
    }catch(err){

    }
})
userRoutes.get("/specific", async (req: Request, res: Response) => {
    try{
        const {prisma} = res;
    }catch(err){
        
    }
})

userRoutes.get("/userprofile/:id", async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userId = req.params["id"]
        const profile = await prisma.user_Profile.findFirstOrThrow({
            where: { userId },
            select: { studentId: true, fName: true, lName: true, image: true, majorId: true },
        })
        res.json(profile)
    } catch (err) {
        res.status(400).send("Error find image")
    }
})
export default userRoutes
