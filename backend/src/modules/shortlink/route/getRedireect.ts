import { ShortLink } from "@prisma/client"
import { Request, Response } from "express"
import { nanoid, customAlphabet } from "nanoid"

const getRedirect = async (req: Request, res: Response) => {
    //async = Does not folow the steps ()
    console.log(req.query.shorten)

    // Query returns User or null
    const getUser: ShortLink | null = await res.prisma.shortLink.findFirst({
        //Select statement like a sql
        where: {
            shortenLink: (req.query.shorten as string) || "",
        },
    })

    console.log(getUser)

    res.redirect(getUser?.originalLink || "") //getUser could be Null, thus we use or || ""  in case it is null.
}

export default getRedirect
