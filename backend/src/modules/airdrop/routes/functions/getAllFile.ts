const getAllFile = async (req: Request | any, res: Response | any) => {
    //fetch everone type
    try {
        const { prisma } = res
        const isShow = await prisma.user_Show_File.findMany({
            where: {
                userId: req.user?.userId,
            },
            select: {
                fileId: true,
            },
        })
        const everyone = await prisma.file_Info.findMany({
            where: {
                AND: [
                    {
                        fileSender: {
                            not: req.user?.userId,
                        },
                    },
                    {
                        AND: [
                            {
                                fileId: {
                                    notIn: isShow.map((item:any) => item.fileId),
                                },
                            },
                            {
                                sendType: "Everyone",
                            },
                        ],
                    },
                ],
            },
        })
        //result will add senderName
        const result = []
        for (const item of everyone) {
            const user = await prisma.user_Profile.findFirst({
                where: {
                    userId: item.fileSender,
                },
                select: {
                    fName: true,
                    lName: true,
                },
            })
            const senderId = item.fileSender
            result.push({
                ...item,
                fileSender: user?.fName + " " + user?.lName,
                senderId: senderId,
            })
        }
        const lastResult = result.map((item) => {
            return {
                ...item,
                comments: [],
            }
        })
        res.json(lastResult)
    } catch (err) {
        console.log(err)
    }
}
export default getAllFile;