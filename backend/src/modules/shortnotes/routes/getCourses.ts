import { Request, Response } from "express"
import { prisma } from "@prisma/client"
import { course } from ".."

const getCourses = async (req: Request, res: Response) => {
    //const prisma = res.prisma
    //const course = await prisma.course.findMany()
    res.send(course)
    console.log(course)
}

export default getCourses
