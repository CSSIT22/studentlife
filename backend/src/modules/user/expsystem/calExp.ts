import { PrismaClient } from "@prisma/client"

let exptable = {
    Dating: 10,
    Announce: 15,
    chatAddfriend: 20,
    DatingTuT: 20,
    DatingOption: 20,
    DatingInterest: 20,
    DatingDiscoveryLeft: 20,
    DatingDiscoveryRight: 20,
    DatingSkip: 20,
    DatingRate: 20,
    DatingPoll: 20,
    DatingPollJoinActivity: 20,
}
// calExp(prisma, req.user?.userId || "", "chatAddfriend")
type expType = keyof typeof exptable

export const calExp = async (prisma: PrismaClient, userId: string, exp: expType) => {
    let addexp = exptable[exp]
    // console.log(addexp)
    try {
        const oldXP = await prisma.eXP.findUnique({
            where: {
                userId: userId,
            },
            select: {
                currentXP: true,
            },
        })
        const result = await prisma.eXP.upsert({
            where: {
                userId: userId,
            },
            update: {
                currentXP: (oldXP?.currentXP || 0) + Math.floor(Math.random() * 100),
            },
            create: {
                userId: userId,
                currentXP: 0,
            },
        })
        console.log(result)
    } catch (err: any) {
        console.log(err)
    }
}

export default calExp
