import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"

const readDBRoutes = express()
const prisma = new PrismaClient()

readDBRoutes.get("/", (_, res) => {
    return res.send("Dating Module Read DB API")
})

// Dating's module
readDBRoutes.get("/interest", async (req: Request, res: Response) => {
    try {
        const interestDB = await prisma.interest.findMany()
        res.send(interestDB)
    } catch (err) {
        res.status(404).send("Interest not found")
    }
})

readDBRoutes.get("/user_Interest", async (req: Request, res: Response) => {
    try {
        const user_InterestDB = await prisma.user_Interest.findMany()
        res.send(user_InterestDB)
    } catch (err) {
        res.status(404).send("User interest not found")
    }
})

readDBRoutes.get("/dating_Enroll", async (req: Request, res: Response) => {
    try {
        const dating_EnrollDB = await prisma.dating_Enroll.findMany()
        res.send(dating_EnrollDB)
    } catch (err) {
        res.status(404).send("Dating enroll not found")
    }
})

readDBRoutes.get("/heart_History", async (req: Request, res: Response) => {
    try {
        const heart_HistoryDB = await prisma.heart_History.findMany()
        res.send(heart_HistoryDB)
    } catch (err) {
        res.status(404).send("Heart history not found")
    }
})

readDBRoutes.get("/poll_Interest", async (req: Request, res: Response) => {
    try {
        const poll_InterestDB = await prisma.poll_Interest.findMany()
        res.send(poll_InterestDB)
    } catch (err) {
        res.status(404).send("Poll interest not found")
    }
})

readDBRoutes.get("/activity_Poll", async (req: Request, res: Response) => {
    try {
        const activity_PollDB = await prisma.activity_Poll.findMany()
        res.send(activity_PollDB)
    } catch (err) {
        res.status(404).send("Activity poll not found")
    }
})

readDBRoutes.get("/user_Rating", async (req: Request, res: Response) => {
    try {
        const user_RatingDB = await prisma.user_Rating.findMany()
        res.send(user_RatingDB)
    } catch (err) {
        res.status(404).send("User rating not found")
    }
})

readDBRoutes.get("/poll_Applicant", async (req: Request, res: Response) => {
    try {
        const poll_ApplicantDB = await prisma.poll_Applicant.findMany()
        res.send(poll_ApplicantDB)
    } catch (err) {
        res.status(404).send("Poll applicant not found")
    }
})

readDBRoutes.get("/dating_Options", async (req: Request, res: Response) => {
    try {
        const dating_OptionsDB = await prisma.dating_Options.findMany()
        res.send(dating_OptionsDB)
    } catch (err) {
        res.status(404).send("Dating options not found")
    }
})

readDBRoutes.get("/faculty_Pref", async (req: Request, res: Response) => {
    try {
        const faculty_PrefDB = await prisma.faculty_Pref.findMany()
        res.send(faculty_PrefDB)
    } catch (err) {
        res.status(404).send("Faculty preference not found")
    }
})

readDBRoutes.get("/card_Queue", async (req: Request, res: Response) => {
    try {
        const card_QueueDB = await prisma.card_Queue.findMany()
        res.send(card_QueueDB)
    } catch (err) {
        res.status(404).send("Card queue not found")
    }
})

// User's module
readDBRoutes.get("/user_Profile", async (req: Request, res: Response) => {
    try {
        const user_ProfileDB = await prisma.user_Profile.findMany()
        res.send(user_ProfileDB)
    } catch (err) {
        res.status(404).send("User profile not found")
    }
})

readDBRoutes.get("/faculty", async (req: Request, res: Response) => {
    try {
        const facultyDB = await prisma.faculty.findMany()
        res.send(facultyDB)
    } catch (err) {
        res.status(404).send("Faculty not found")
    }
})

readDBRoutes.get("/detail", async (req: Request, res: Response) => {
    try {
        const detailDB = await prisma.detail.findMany()
        res.send(detailDB)
    } catch (err) {
        res.status(404).send("Detail not found")
    }
})

readDBRoutes.get("/user_Blocked", async (req: Request, res: Response) => {
    try {
        const user_BlockedDB = await prisma.user_Blocked.findMany()
        res.send(user_BlockedDB)
    } catch (err) {
        res.status(404).send("Blocked user not found")
    }
})

readDBRoutes.get("/follow", async (req: Request, res: Response) => {
    try {
        const followDB = await prisma.follow.findMany()
        res.send(followDB)
    } catch (err) {
        res.status(404).send("Follow not found")
    }
})

// Restaurant's module
readDBRoutes.get("/restaurant", async (req: Request, res: Response) => {
    try {
        const restaurantDB = await prisma.restaurant.findMany()
        res.send(restaurantDB)
    } catch (err) {
        res.status(404).send("Restaurant not found")
    }
})

readDBRoutes.get("/restaurant_Detail", async (req: Request, res: Response) => {
    try {
        const restaurant_DetailDB = await prisma.restaurant_Detail.findMany()
        res.send(restaurant_DetailDB)
    } catch (err) {
        res.status(404).send("Restaurant Detail not found")
    }
})

readDBRoutes.get("/restaurant_Favorite_By_User", async (req: Request, res: Response) => {
    try {
        const restaurant_Favorite_By_UserDB = await prisma.restaurant_Favorite_By_User.findMany()
        res.send(restaurant_Favorite_By_UserDB)
    } catch (err) {
        res.status(404).send("Favorite restaurant not found")
    }
})

// Chat's module
readDBRoutes.get("/user_To_Room", async (req: Request, res: Response) => {
    try {
        const user_To_RoomDB = await prisma.user_To_Room.findMany()
        res.send(user_To_RoomDB)
    } catch (err) {
        res.status(404).send("User to room not found")
    }
})

readDBRoutes.get("/chat_Room", async (req: Request, res: Response) => {
    try {
        const chat_RoomDB = await prisma.chat_Room.findMany()
        res.send(chat_RoomDB)
    } catch (err) {
        res.status(404).send("Chat room not found")
    }
})

readDBRoutes.get("/chat_Group", async (req: Request, res: Response) => {
    try {
        const chat_GroupDB = await prisma.chat_Group.findMany()
        res.send(chat_GroupDB)
    } catch (err) {
        res.status(404).send("Chat group not found")
    }
})

readDBRoutes.get("/chat_User", async (req: Request, res: Response) => {
    try {
        const chat_UserDB = await prisma.chat_User.findMany()
        res.send(chat_UserDB)
    } catch (err) {
        res.status(404).send("Chat User not found")
    }
})

// Schedule's module
readDBRoutes.get("/timetable", async (req: Request, res: Response) => {
    try {
        const timetableDB = await prisma.timetable.findMany()
        res.send(timetableDB)
    } catch (err) {
        res.status(404).send("Timetable not found")
    }
})

readDBRoutes.get("/event", async (req: Request, res: Response) => {
    try {
        const eventDB = await prisma.event.findMany()
        res.send(eventDB)
    } catch (err) {
        res.status(404).send("Event not found")
    }
})

export default readDBRoutes
