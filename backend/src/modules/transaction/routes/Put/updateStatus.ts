import { Request, Response } from "express"

const setTransStatus = async (req: Request, res: Response) => {
    try {
        const prisma = res.prisma
        const transId = req.body.transId
        const setStatus = await prisma.transaction_Detail.update({
            where: { transId: transId },
            data: {
                transStatus: "Success",
            },
        })
        return res.send(setStatus)
    } catch (error) {
        return res.status(404).send("An error has occured | " + error)
    }
}

export default setTransStatus
