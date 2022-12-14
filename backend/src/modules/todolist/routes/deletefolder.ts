import { Request, Response } from "express"

const deleteFolder = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userid = req.user?.userId || ""
    console.log(req.user)
    try {
        await prisma.task_Folder.findFirst({
            where: {
                folderId: req.body.folderId,
                userId: userid,
            },
        })
    } catch (e) {
        return res.status(400).send("User has no permission")
    }

    try {
        await prisma.task_Folder.delete({
            where: {
                folderId: req.body.folderId,
            },
        })
        res.status(200).send("Delete Folder Success")
    } catch (err) {
        return res.status(400)
    }
}

export default deleteFolder
