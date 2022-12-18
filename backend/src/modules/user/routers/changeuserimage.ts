import { Request, Response } from "express"
import { Prisma } from "@prisma/client"
const fs = require("fs")
const buffer = require("buffer")
const changeimageuser = async (req: Request, res: Response) => {
    try {
        const imageData = fs.readFileSync("path/to/image/file.jpg")
        const base64ImageData = buffer.Buffer.from(imageData).toString("base64")

        const { prisma } = res
        const userId = req.user?.userId || ""

        await prisma.user_Profile.update({
            where: { userId },
            data: {
                image: base64ImageData,
            },
        })
        res.json({ message: "Profile picture updated successfully" })
    } catch (err) {
        res.status(400).send("Error To Change image")
    }
}

export default changeimageuser
