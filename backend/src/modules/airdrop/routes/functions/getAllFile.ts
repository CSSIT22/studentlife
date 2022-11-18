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
        const fileList = await prisma.file_Info.findMany({
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
            include:{
                sender:{
                    select: {
                        userId:true,
                        fName: true,
                        lName: true,
                    },
                },
                comments:{}
            }
        })
        res.json(fileList)
    } catch (err) {
        console.log(err)
    }
}
export default getAllFile;