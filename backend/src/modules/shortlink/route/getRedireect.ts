import { ShortLink } from "@prisma/client"
import { Request, Response } from "express"
import { nanoid, customAlphabet } from "nanoid"

const getRedirect = async (req: Request, res: Response) => {
    //async = Does not folow the steps ()
    console.log(req.query.shorten)

    // Query returns User or null

    try {
        const getUser: ShortLink | null = await res.prisma.shortLink.findFirst({
            //Select statement like a sql
            where: {
                shortenLink: (req.query.shorten as string) || "",
            },
        })
    
        console.log(getUser)

        if (getUser?.password) {
            return res.redirect(`${process.env.SUCCESS_REDIRECT_URL}/link/enterpassword?shorten=${getUser.shortenLink}` || "") //getUser could be Null, thus we use or || ""  in case it is null.
        }
        return res.redirect(getUser?.originalLink || "")
    } catch (err: any) {
        console.log(err)
        res.status(400).json({err: "error in getRedirect shortlink"})
    }
    
    
}

export default getRedirect
