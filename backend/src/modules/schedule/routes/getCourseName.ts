import { Request, Response } from "express"

const getCourseName = async (req: Request, res: Response) => {
    const userid = req.user?.userId
    const prisma = res.prisma
    let body = req.params
    try {
        const getCourse = await prisma.course.findMany({
            select: {
                courseId: true,
                courseName: true,
            },
        })
        res.send(getCourse)
    } catch (err) {
        res.status(500).send(err)
    }
}
export default getCourseName
