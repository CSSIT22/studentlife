import { PrismaClient } from "@prisma/client"
import { pushArgumentsWithLength } from "@redis/search/dist/commands"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"

const optionRoutes = express()
const prisma = new PrismaClient()

optionRoutes.get("/", (_, res) => {
    return res.send("Dating Module Option page API")
})

// Get all faculty From user profile
optionRoutes.get("/getFaculty", verifyUser, async (req: Request, res: Response) => {
    try {
        const allFacultyDB = await prisma.faculty.findMany()
        // console.log(allFacultyDB)
        return res.send(allFacultyDB)
    } catch (err) {
        return res.status(404).send("Faculty no found")
    }
})

// Get the previous option
optionRoutes.get("/getOption", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

// Set the option
optionRoutes.post("/setOption", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId: string | undefined = req.user?.userId
        const ageMin: number = req.body.ageMin
        const ageMax: number = req.body.ageMax
        const genderPref: string = req.body.genderPref
        const useAge: boolean = req.body.useAge
        const setPref: any = { userId: userId, ageMin: ageMin, ageMax: ageMax, genderPref: genderPref, useAge: useAge }
        const facultyPrefs: any = []
        // console.log("Pref: " + genderPref + useAge + userId)
        // setPref.push({ userId: userId, ageMin: ageMin, ageMax: ageMax, genderPref: genderPref, useAge: useAge })
        // req.body.facultyId.map((faculty: string) => {
        //     facultyPrefs.push({ userId: userId, facultyPref: faculty })
        // })
        // // console.log(req.body.facultyId)
        // await prisma.faculty_Pref.createMany({
        //     data: facultyPrefs,
        // })
        console.log(setPref)
        await prisma.dating_Options.create({
            data: setPref,
        })

        return res.send("Success")
    } catch {
        return res.status(400).send("Cannot set Option")
    }
})

// Update the option
optionRoutes.put("/updateOption", verifyUser, async (req: Request, res: Response) => {
    // Put Thitipa's code here
})

export default optionRoutes
