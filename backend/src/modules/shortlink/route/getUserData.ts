import { Request, Response} from "express"

const getUserData = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const userData = await prisma.user_Profile.findMany({
            select: {
                userId: true,
                fName: true,
                lName: true,
                studentId : true,
            },
            orderBy: {
                studentId : "asc"
            },
            take: 100
        })
        res.status(200).json({users: userData})
    } catch (err: any) {
        console.log(err)
        res.status(400).json({message: err})
    }
}

export default getUserData