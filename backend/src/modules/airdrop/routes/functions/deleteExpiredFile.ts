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
    let expiredList:any[] = []
    const expiredFile = await prisma.file_Info.findMany({
        where: {
            AND:[
                {
                    OR:[
                        {
                            sendType: "Everyone"
                        },{
                            OR:[
                                {
                                    sendType: "Department"
                                },{
                                    sendType: "Specific"
                                }
                            ]
                        }
                    ]
                },
                {
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
                }
            ]
            
        },
    }).then((res:any)=>{
        expiredList = res
    }).catch((err: any) => {
    })
    expiredList?.map(async (item: any) => {
        // const deleteFromDrive = await drive.delete(`/${item.fileId}`)
        await prisma.file_Info.delete({
            where: {
                fileId: item.fileId,
            },
        }).then((result:any) => {
            console.log("delete expired file")
        }).catch((err:any) => {
        });
    })
}
export default deleteExpiredFile
