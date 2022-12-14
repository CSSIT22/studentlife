import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
const axios = require("axios")
const drive = axios.create({
    baseURL: "https://drive.modlifes.me",
    headers: {
        Authorization: "Bearer GjkhtiJ12!",
        "Content-Type": " multipart/form-data",
    },
})

const deleteExpiredFile = async (req: Request<any>, res: Response<any>) => {
    const today = new Date()
    //new prisma
    const prisma = new PrismaClient()
    const expiredFile = await prisma.file_Info.findMany({
        where: {
            AND: [
                {
                    fileExpired: {
                        lt: today,
                    },
                },
                {
                    fileExpired: {
                        gt: new Date(1000000000000),
                    },
                },
            ],
        },
    })
    expiredFile.map(async (item: any) => {
        // const deleteFromDrive = await drive.delete(`/${item.fileId}`)
        await prisma.file_Info.delete({
            where: {
                fileId: item.fileId,
            },
        })
    })
    console.log("Check expired file")
}
export default deleteExpiredFile
