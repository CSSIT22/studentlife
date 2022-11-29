import { File_Access, PrismaClient, User_Show_File } from "@prisma/client"
const getAllFile = async (req: Request | any, res: Response | any) => {
    //fetch everone type
    try {
        const { prisma } = res
        const isShow = await res.prisma.user_Show_File.findMany({
            where: {
                userId: req.user?.userId,
            },
            select: {
                fileId: true,
            },
        })
        // get file id from every access type
        const fileIdList: any = []
        // from major
        //user departmnent
        const user_depart = await prisma.user_Profile.findFirst({
            where: {
                userId: req.user?.userId,
            },
            select: {
                majorId: true,
            },
        })
        const major = await prisma.file_Access.findMany({
            where: {
                accessType: "MAJOR",
                major: {
                    some: {
                        majorId: user_depart?.majorId,
                    },
                },
            },
            select: {
                fileId: true,
            },
        })
        major.map((item: any) => {
            fileIdList.push(item.fileId)
        })

        //from community
        const user_commuid = await prisma.community.findMany({
            where: {
                member: {
                    some: {
                        userId: req.user?.userId,
                    },
                },
            },
            select: {
                communityId: true,
            },
        })
        let communityidlist: string[] = []
        user_commuid.map((item: any) => {
            communityidlist.push(item.communityId)
        })
        const user_commu = await prisma.file_Access.findMany({
            where: {
                accessType: "COMMUNITY",
                community: {
                    some: {
                        communityId: {
                            in: communityidlist,
                        },
                    },
                },
            },
            select: {
                fileId: true,
            },
        })
        user_commu.map((item: any) => {
            fileIdList.push(item.fileId)
        })

        //from specific
        const user_specific = await prisma.file_Access.findMany({
            where: {
                accessType: "DIRECT",
                direct: {
                    some: {
                        userId: req.user?.userId,
                    },
                },
            },
            select: {
                fileId: true,
            },
        })
        user_specific.map((item: any) => {
            fileIdList.push(item.fileId)
        })

        //all file that user can get
        const fileList = await prisma.file_Info.findMany({
            where: {
                AND: [
                    {
                        fileSender: {
                            not: req.user?.userId,
                        },
                    },
                    {
                        fileId: {
                            notIn: isShow.map((item: any) => item.fileId),
                        },
                    },
                ],
                OR: [
                    {
                        sendType: "Everyone",
                    },
                    {
                        fileId: {
                            in: fileIdList,
                        },
                    },
                ],
            },
            include: {
                sender: {
                    select: {
                        userId: true,
                        fName: true,
                        lName: true,
                    },
                },
                comments: {
                    orderBy: {
                        commentedAt: "desc",
                    },
                    include: {
                        commentor: {
                            select: {
                                fName: true,
                                lName: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                fileId: "desc",
            },
        })
        res.json(fileList)
    } catch (err) {
        console.log(err)
    }
}
export default getAllFile
