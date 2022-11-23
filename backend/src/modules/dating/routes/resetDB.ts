import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"

const resetDBRoutes = express()
const prisma = new PrismaClient()

resetDBRoutes.get("/", (_, res) => {
    return res.send("Dating Module Reset DB API")
})

// Dating's module
// resetDBRoutes.get("/interest", async (req: Request, res: Response) => {
//     try {
//         const interestDB = await prisma.interest.deleteMany()
//         res.send(interestDB)
//     } catch (err) {
//         res.status(404).send("Interest not found")
//     }
// })

// resetDBRoutes.get("/user_Interest", async (req: Request, res: Response) => {
//     try {
//         const user_InterestDB = await prisma.user_Interest.deleteMany()
//         res.send(user_InterestDB)
//     } catch (err) {
//         res.status(404).send("User interest not found")
//     }
// })

// resetDBRoutes.get("/dating_Enroll", async (req: Request, res: Response) => {
//     try {
//         const dating_EnrollDB = await prisma.dating_Enroll.deleteMany()
//         res.send(dating_EnrollDB)
//     } catch (err) {
//         res.status(404).send("Dating enroll not found")
//     }
// })

// resetDBRoutes.get("/heart_History", async (req: Request, res: Response) => {
//     try {
//         const heart_HistoryDB = await prisma.heart_History.deleteMany()
//         res.send(heart_HistoryDB)
//     } catch (err) {
//         res.status(404).send("Heart history not found")
//     }
// })

// resetDBRoutes.get("/poll_Interest", async (req: Request, res: Response) => {
//     try {
//         const poll_InterestDB = await prisma.poll_Interest.deleteMany()
//         res.send(poll_InterestDB)
//     } catch (err) {
//         res.status(404).send("Poll interest not found")
//     }
// })

// resetDBRoutes.get("/activity_Poll", async (req: Request, res: Response) => {
//     try {
//         const activity_PollDB = await prisma.activity_Poll.deleteMany()
//         res.send(activity_PollDB)
//     } catch (err) {
//         res.status(404).send("Activity poll not found")
//     }
// })

// resetDBRoutes.get("/user_Rating", async (req: Request, res: Response) => {
//     try {
//         const user_RatingDB = await prisma.user_Rating.deleteMany()
//         res.send(user_RatingDB)
//     } catch (err) {
//         res.status(404).send("User rating not found")
//     }
// })

// resetDBRoutes.get("/poll_Applicant", async (req: Request, res: Response) => {
//     try {
//         const poll_ApplicantDB = await prisma.poll_Applicant.deleteMany()
//         res.send(poll_ApplicantDB)
//     } catch (err) {
//         res.status(404).send("Poll applicant not found")
//     }
// })

// resetDBRoutes.get("/dating_Options", async (req: Request, res: Response) => {
//     try {
//         const dating_OptionsDB = await prisma.dating_Options.deleteMany()
//         res.send(dating_OptionsDB)
//     } catch (err) {
//         res.status(404).send("Dating options not found")
//     }
// })

// resetDBRoutes.get("/faculty_Pref", async (req: Request, res: Response) => {
//     try {
//         const faculty_PrefDB = await prisma.faculty_Pref.deleteMany()
//         res.send(faculty_PrefDB)
//     } catch (err) {
//         res.status(404).send("Faculty preference not found")
//     }
// })

// resetDBRoutes.get("/card_Queue", async (req: Request, res: Response) => {
//     try {
//         const card_QueueDB = await prisma.card_Queue.deleteMany()
//         res.send(card_QueueDB)
//     } catch (err) {
//         res.status(404).send("Card queue not found")
//     }
// })

export default resetDBRoutes
