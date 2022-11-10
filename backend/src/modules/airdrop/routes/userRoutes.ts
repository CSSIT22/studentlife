import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const userRoutes = express()
const prisma = new PrismaClient()

userRoutes.get("/getdepartment", async (req: Request, res: Response) => {
    try {
        const user = req.user?.userId
        const department = await prisma.user_Profile.findFirstOrThrow({
            where: {
                userId: user,
            },
            select: {
                majorId: true,
            },
        } )
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
        const result:string[] = [];
        departmentList.map((item)=>{
            result.push(item.fName+" "+item.lName)
        })
        console.log(departmentList)
        res.json(result)
    } catch (err) {
        console.log(err)
    }
})

export default userRoutes
