import { Request, Response } from "express"

const getCommunityPost = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const userId = req.user?.userId
    const id = req.params.id

    try {
        const community = await prisma.community.findUnique({
            where: {
                communityId: id,
            },
            select: {
                owner: {
                    select: {
                        userId: true,
                        image: true,
                        fName: true,
                        lName: true,
                        majorId: true,
                    },
                },
            },
        })
        const fullName = (fName: string, lName: string) =>
            `${fName.charAt(0)}${fName?.slice(1).toLocaleLowerCase()} ${lName.charAt(0)}${lName.slice(1).toLocaleLowerCase()}`
        const communityPost = await prisma.community_Post.findMany({
            select: {
                postId: true,
            },
            where: {
                communityId: body.communityId,
            },
        })
        res.send({
            post: [],
            owner: fullName(community?.owner?.fName || "", community?.owner?.lName || ""),
        })
        res.status(200)
    } catch (err) {
        res.status(404)
    }
}

export default getCommunityPost
