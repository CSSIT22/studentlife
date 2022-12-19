import { ShortLink } from "@prisma/client"
import { Request, Response } from "express"
import { nanoid, customAlphabet } from "nanoid"

const getRedirect = async (req: Request, res: Response) => {
    const userId = req.user?.userId || ""

    //async = Does not folow the steps ()
    console.log(req.query.shorten)

    // Query returns User or null
    const shortLink: ShortLink | null = await res.prisma.shortLink.findFirst({
        //Select statement like a sql
        where: {
            shortenLink: (req.query.shorten as string) || "",
        },
    })

    console.log(shortLink)

    try {
        await res.prisma.shortLink_Permission_User.findFirstOrThrow({
            //Select statement like a sql
            where: {
                slId: shortLink?.slId,
                userId: userId,
            },
        })
    } catch (err) {
        return res.send("User has no link access permission")
    }

    res.redirect(shortLink?.originalLink || "") //getUser could be Null, thus we use or || ""  in case it is null.
}

export default getRedirect





