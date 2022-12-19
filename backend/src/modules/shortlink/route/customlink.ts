import {Request , Response } from "express"
import { customAlphabet } from "nanoid"
const customlink = async(req : Request , res : Response)=>{
    const body = req.body
    const userId = req.user?.userId || ""
    try{
        const prisma = res.prisma
        let result = {}
        // check if password is send from client to server
        // if password exists then create new row in database
        if (body.password.length !== 0) {
            result = await prisma.shortLink.create({
                data: {
                    userId: userId,
                    originalLink: body.originalLink,
                    shortenLink: body.shortenLink,
                    password: body.password,
                },
            })
            // else create new row in database without password column empty
        } else {
            result = await prisma.shortLink.create({
                data: {
                    userId: userId,
                    originalLink: body.originalLink,
                    shortenLink: body.shortenLink
                },
            })
        }

        console.log(result)
        res.status(200).json({ result: result })
    }catch (err){
        console.log(err)
        res.status(500).json({message:"error" , err: err})
    }
}
export default customlink