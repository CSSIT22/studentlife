import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"
import calExp from "../../user/expsystem/calExp"

const optionRoutes = express()
const prisma = new PrismaClient()

optionRoutes.get("/", (_, res) => {
    return res.send("Dating Module Option page API")
})

// Get all faculty From user profile
optionRoutes.get("/getFaculty", verifyUser, async (req: Request, res: Response) => {
    try {
        const allFacultyDB = await prisma.faculty.findMany()
        return res.send(allFacultyDB)
    } catch (err) {
        return res.status(404).send("Faculty no found")
    }
})

// Get the previous option
optionRoutes.get("/getOption", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        if (userId == null) {
            return res.send()
        } else {
            const userOptionDB = await prisma.dating_Options.findFirst({
                where: {
                    userId: userId,
                },
                include: {
                    faculties: true,
                },
            })
            return res.send(userOptionDB)
        }
    } catch (err) {
        return res.status(404).send("User Option not found")
    }
})

// Set the option
optionRoutes.post("/setOption", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId: string | undefined = req.user?.userId
        const ageMin: number = req.body.ageMin
        const ageMax: number = req.body.ageMax
        const genderPref: string = req.body.genderPref
        const useAge: boolean = req.body.useAge
        const facultyPrefs: any = []
        // console.log("Pref: " + req.body.facultyPref)
        req.body.facultyPref.map((faculty: string) => {
            facultyPrefs.push({ userId: userId, facultyPref: faculty })
        })
        const setPref: any = { userId: userId, ageMin: ageMin, ageMax: ageMax, genderPref: genderPref, useAge: useAge }
        await prisma.dating_Options.create({
            data: setPref,
        })
        await prisma.faculty_Pref.createMany({
            data: facultyPrefs,
        })
        calExp(prisma, req.user?.userId || "", "DatingOption")

        return res.send("Success")
    } catch {
        return res.status(400).send("Cannot set Option")
    }
})

// Update the option
optionRoutes.put("/updateOption", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId: string | undefined = req.user?.userId
        const ageMin: number = req.body.ageMin
        const ageMax: number = req.body.ageMax
        const genderPref: string = req.body.genderPref
        const useAge: boolean = req.body.useAge
        const facultyPrefs: any = []
        req.body.facultyPref.map((faculty: string) => {
            facultyPrefs.push({ userId: userId, facultyPref: faculty })
        })
        const setPref: any = { userId: userId, ageMin: ageMin, ageMax: ageMax, genderPref: genderPref, useAge: useAge }

        await prisma.dating_Options.deleteMany({
            where: {
                userId: userId,
            },
        })

        await prisma.dating_Options.create({
            data: setPref,
        })

        await prisma.faculty_Pref.createMany({
            data: facultyPrefs,
        })

        return res.send("Success")
    } catch {
        return res.status(400).send("Cannot update Option")
    }
})

export default optionRoutes
