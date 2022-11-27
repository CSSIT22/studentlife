import { PrismaClient } from "@prisma/client"
import { pushArgumentsWithLength } from "@redis/search/dist/commands"
import express, { Request, Response } from "express"
import { verifyUser } from "../../backendService/middleware/verifyUser"
import { UserOption } from "@apiType/dating"
import createCommunity from "./../../group/routes/createCommunity"

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
    try {
        const userId = req.user?.userId
        if (userId == null) {
            return res.send()
        } else {
            const userOptionDB = await prisma.dating_Options.findFirst({
                where: {
                    userId: userId,
                },
            })
            // const option: any = {userOptionDB?.useAge, userOptionDB?.ageMin, userOptionDB?.ageMax, userOptionDB?.genderPref}
            return res.send(userOptionDB)
        }
    } catch (err) {
        return res.status(404).send("User Option not found")
    }
})

// Set the option
optionRoutes.post("/setOption", verifyUser, async (req: Request, res: Response) => {
    // try {
    const userId: string | undefined = req.user?.userId
    const facPref: string[] = req.body.facultyPref
    const ageMin: number = req.body.ageMin
    const ageMax: number = req.body.ageMax
    const genderPref: string = req.body.genderPref
    const useAge: boolean = req.body.useAge

    const facultyPrefs: any = []
    console.log("Do post")
    console.log("Pref: " + req.body.facultyPref)
    req.body.facultyPref.map((faculty: string) => {
        facultyPrefs.push({ userId: userId, facultyPref: faculty })
    })
    const setPref: any = { userId: userId, ageMin: ageMin, ageMax: ageMax, genderPref: genderPref, useAge: useAge, faculties: facultyPrefs }
    console.log("Plz work " + facultyPrefs.userId)
    // await prisma.faculty_Pref.createMany({
    //     data: facultyPrefs,
    // })
    console.log(setPref)
    await prisma.dating_Options.create({
        data: setPref,
    })

    return res.send("Success")
    // } catch {
    //     return res.status(400).send("Cannot set Option")
    // }
})

// optionRoutes.post("/setOptionF", verifyUser, async (req: Request, res: Response) => {
//     try {
//         const userId: string | undefined = req.user?.userId
//         const facPref: string[] = req.body.facultyPref
//         const facultyPrefs: any = []
//         console.log("Pref: " + req.body.facultyPref)
//         for (let index = 0; index < facPref.length; index++) {
//             facultyPrefs.push({ userId: userId, facultyPref: facPref[index] })
//         }

//         console.log("Plz work " + facultyPrefs)
//         await prisma.faculty_Pref.createMany({
//             data: facultyPrefs,
//         })

//         return res.send("Success")
//     } catch {
//         return res.status(400).send("Cannot set Option")
//     }
// })

// Update the option
optionRoutes.put("/updateOption", verifyUser, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        const ageMin: number = req.body.ageMin
        const ageMax: number = req.body.ageMax
        const genderPref: string = req.body.genderPref
        const useAge: boolean = req.body.useAge
        const setPref: any = { userId: userId, ageMin: ageMin, ageMax: ageMax, genderPref: genderPref, useAge: useAge }
        const facultyPrefs: any = []
        console.log("Pref: " + req.body.facultyPref)
        req.body.facultyPref.map((faculty: string) => {
            facultyPrefs.push({ userId: userId, facultyPref: faculty })
        })
        console.log("Plz work " + facultyPrefs)
        facultyPrefs.map((faculty: any) => {
            console.log("Test map: " + faculty.userId + " " + faculty.facultyPref)
        })

        await prisma.dating_Options.update({
            where: {
                userId: userId,
            },
            data: setPref,
        })
        return res.send("Success")
    } catch {
        return res.status(400).send("Cannot update Option")
    }
})

export default optionRoutes
