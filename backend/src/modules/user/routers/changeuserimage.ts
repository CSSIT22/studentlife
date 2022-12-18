import { Request, Response } from "express"
const fs = require("fs")
const changeuserimage = async (req: Request, res: Response) => {
    try {
        const data = fs.readFileSync("path/to/image.jpg")
        const imageBuffer = Buffer.from(data).toString("base64")

        const { prisma } = res
        const userId = req.user?.userId || ""

        await prisma.user_Profile.update({
            where: { userId: userId },
            data: { image: { connect: { userId } } },
        })
        res.json({ message: "Profile picture updated successfully" })
    } catch (err) {
        res.status(400).send("Error To Change image")
    }
}

export default changeuserimage
