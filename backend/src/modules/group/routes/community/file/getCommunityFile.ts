import { Request, Response } from "express"

const getFile = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userId = req.user?.userId
    const id = req.params.id
    const access = req.params.accesss
    const body = req.body
    
    try {

        const community = await prisma.community.findUnique({
            where: {
                communityId: id,
            },
            select: {
                member: {
                    select: {
                        user: {
                            select: {
                                userId: true,
                                image: true,
                                fName: true,
                                lName: true,
                                majorId: true,
                            },
                        },
                    },
                    where: {
                        status: true,
                    },
                },
                communityOwnerId: true,
                owner: {
                    select: {
                        userId: true,
                        image: true,
                        fName: true,
                        lName: true,
                        majorId: true,
                    },
                },
            },
        })

        const communityFile = await prisma.community_File.findMany({
            where: {
                communityId: id,
            },
            select: {
                file:{
                    select:{
                        fileId:true,
                        fileName:true,
                        fileDesc:true
                    }
                },
            },
        })


        res.send({
            access,
            communityFile
        })

        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
    }
}

export default getFile
