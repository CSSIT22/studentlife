import express, { Request, Response } from "express"
import { verifyUser } from "../.././backendService/middleware/verifyUser"
const userRoutes = express()

//getdepartment
userRoutes.get("/getdepartment", verifyUser,async (req: Request, res: Response) => {
    try {
        const user = req.user?.userId
        const {prisma} = res;
        const department = await prisma.user_Profile.findFirstOrThrow({
            where: {
                userId: user,
            },
            select: {
                majorId: true,
            },
        })
        const departmentList = await prisma.user_Profile.findMany({
            where: {
                AND: [
                    {
                        userId: {
                            not: user,
                        },
                    },
                    {
                        majorId: department?.majorId,
                    },
                ],
            },
            select: {
                fName: true,
                lName: true,
            },
        })
        const result: string[] = []
        departmentList.map((item) => {
            result.push(item.fName + " " + item.lName)
        })
        // console.log(departmentList)
        res.json(result)
    } catch (err) {
        console.log(err)
    }
})
userRoutes.get("/community", async (req: Request, res: Response) => {})
userRoutes.get("/specific", async (req: Request, res: Response) => {})

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
