const uploadFile = async (req: Request | any, res: Response | any) => {
    const sender = await req.user?.userId
    const { prisma } = res
    try {
        const payload: any = []
        ;(req.files as Array<Express.Multer.File>).map((item: any) => {
            const newDate = new Date(req.body.expireDate)
            payload.push({
                fileName: item.originalname,
                fileSender: sender,
                sendType: req.body.type,
                fileDesc: req.body.description,
                fileExpired: newDate,
            })
        })
        const fileUpload = await prisma.file_Info.createMany({
            data: payload,
        })
        //get recent upload file
        const recentUpload = await prisma.file_Info.findMany({
            where: {
                fileSender: sender,
            },
            orderBy: {
                fileId: "desc",
            },
            select:{
                fileId:true,
            },
            take: fileUpload.count,
        })
        //insert file id and sender to history
        const hisPayload:any = [];
        recentUpload.map((item:any) => {
            hisPayload.push({
                fileId:item.fileId,
                userId:sender,
                historyType:"UPLOAD",
                createdAt:new Date(Date.now() + 60 * 60 * 1000),
            })
        })
        const history = await prisma.file_History.createMany({
            data:hisPayload,
        })


        //handle multiple receiver
        if (req.body.receiver != null && req.body.receiver != "everyone") {
            if (req.body.type == "department") {
                const receiverListId = []
                for (const item of req.body.receiver) {
                    const receiver = await prisma.user_Profile.findFirst({
                        where: {
                            AND: [
                                {
                                    fName: item.split(" ")[0],
                                },
                                {
                                    lName: item.split(" ")[0],
                                },
                            ],
                        },
                        select: {
                            userId: true,
                        },
                    })
                    receiverListId.push(receiver?.userId)
                }
                // insert file access to department table
            } else if (req.body.type == "community") {
                const receiverListId = []
                for (const item of req.body.receiver) {
                    const receiver = await prisma.community.findFirst({
                        where: {
                            AND: [
                                {
                                    communityName: item,
                                },
                            ],
                        },
                        select: {
                            communityId: true,
                        },
                    })
                    receiverListId.push(receiver?.communityId)
                }
            } else if (req.body.type == "specific") {
                if (req.body.type == "department") {
                    const receiverListId = []
                    for (const item of req.body.receiver) {
                        const receiver = await prisma.user_Profile.findFirst({
                            where: {
                                AND: [
                                    {
                                        fName: item.split(" ")[0],
                                    },
                                    {
                                        lName: item.split(" ")[0],
                                    },
                                ],
                            },
                            select: {
                                userId: true,
                            },
                        })
                        receiverListId.push(receiver?.userId)
                    }
                    // insert file access to specific table
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}
export default uploadFile;