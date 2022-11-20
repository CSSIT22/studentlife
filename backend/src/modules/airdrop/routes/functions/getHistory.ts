const getHistory = async (req: Request | any, res: Response | any) => {
    const user = req.user?.userId
    const { prisma } = res
    const history = await prisma.file_History.findMany({
        where: {
            userId: user,
        },
        include: {
            file: {
                include: {
                    sender: true,
                },
            },
        },
    })
    res.json(history)

    //query here
}
export default getHistory
