import { Request, Response } from "express"

const getWeekTasks = async (req: Request, res: Response) => {
    try {
        const addDays = (d: Date, days: number) => {
            let date = new Date(d)
            date.setDate(date.getDate() + days)
            return date
        }
        const startDate = new Date(req.params.startDate)
        const tasks = await res.prisma.event.findMany({
            where: { stTime: { gte: startDate }, endTime: { lte: addDays(startDate, 6) }, userId: req.user?.userId || "" },
            select: { eventName: true, eventId: true, place: true, stTime: true, endTime: true },
        })
        res.send(tasks)
    } catch (err) {
        return res.status(400).send(err)
    }
}

export default getWeekTasks
