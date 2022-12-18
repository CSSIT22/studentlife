import { allFaculty, allMajor, allStudentId, yearType } from "@apiType/announcement"
import { Request, Response } from "express"

const getTypeTarget = async (req: Request, res: Response) => {
    const prisma = res.prisma
    try {
        let targetvalue = [
            {
                Faculty: <string[]>[],
                Major: <string[]>[],
                Year: <string[]>[],
            },
        ]
        const allFac:allFaculty[] = await prisma.faculty.findMany({
            select: {
                facultyName: true,
            },
        })
        allFac.forEach((el) => targetvalue[0].Faculty.push(el.facultyName))

        const allMajor:allMajor[] = await prisma.major.findMany({
            select: {
                majorName: true,
            },
        })
        allMajor.forEach((el) => targetvalue[0].Major.push(el.majorName))

        let year = new Date()
        const thaiYear = (year.getFullYear() + 543) % 100

        const allStudentId:allStudentId[] = await prisma.user_Profile.findMany({
            select: {
                studentId: true,
            },
        })
        const allYear = allStudentId.map((el) => {
            return el.studentId.substring(0, 2)
        })
        // find unique number
        const nn = new Set(allYear)
        const uniqueYear = [...nn]
        const resultYear:yearType[] = []
        for (let i = 0; i < uniqueYear.length; i++) {
            resultYear.push({ year: thaiYear - parseInt(uniqueYear[i]) + 1 + "" })
        }
        resultYear.forEach((el) => targetvalue[0].Year.push(el.year))

        res.status(200).send(targetvalue)
    } catch (err) {
        res.status(404).send("Target value not found")
    }
}

export default getTypeTarget
