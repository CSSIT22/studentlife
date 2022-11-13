import { PrismaClient } from "@prisma/client"

const calExp = async (prisma: PrismaClient, userId: string) => {
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
