const path = require("path")
const fs = require("fs")
const deleteExpiredFile = async (req: Request | any, res: Response | any) => {
    const today = new Date()
    const { prisma } = res
    const expiredFile = await prisma.file_Info.findMany({
        where: {
            fileExpired: {
                lt: today,
            },
        },
    })
    expiredFile.map(async (item: any) => {
        const directoryPath = path.join(__dirname, "../files" + "/" + item.sendType)
        fs.unlink(directoryPath + "/" + item.fileName, (err: any) => {
            if (err) {
                console.log(err)
            }
        })
        await prisma.file_Info.delete({
            where: {
                fileId: item.fileId,
            },
        })
    })
}
export default deleteExpiredFile
