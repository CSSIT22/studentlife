import { nanoid } from "nanoid"
import { Request, Response } from "express"

const shortenlink = async (req: Request, res: Response) => {
    //async = Does not folow the steps ()
    console.log(req.body.originalLink)
    try {
        const prisma = res.prisma
        const result = await prisma.shortLink.create({
            //await = wait for the database
            data: {
                password: "", 
                expired: new Date(),
                permission: {
                    create: {
                        permType:"USER", 
                    }
                },

                userAccess: {
                    create: {
                        
                    }
                }
                userId: req.user?.userId || "",
                originalLink: req.body.originalLink || "",
                shortenLink: nanoid(),
                linkCreator: {
                    connect:{
                        userId: req.user?.userId || ""
                    }
                }
            },
        })
        console.log(result)
        res.status(200).json({ result: result })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "ERROR", err: error})
    }
}

export default shortenlink
