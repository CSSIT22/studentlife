import { Request, Response } from "express"
import { send } from "process"
import pendingRequest from "../pendingRequest"

const getCommunityMember = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body
    const id = req.params.id
    const userId = req.user?.userId

    try {
        // const communityMember = await prisma.community_User.findMany({
        //     select: {
        //         userId: true,
        //     },
        //     where: {
        //         communityId: body.communityId,
        //     },
        // })
        // const communityMember = await prisma.community_User.findMany({
        //     where: {
        //         communityId: body.communityId,
        //     },
        //     include: {
        //         user: true,
        //     },
        // })
        // const pendingRequest = await prisma.community_User.findMany({
        //     where: {
        //         communityId: body.communityId,
        //         status: false,
        //     },
        //     include: {
        //         user: true,
        //     },
        // })
        // const members = communityMember.map((i: any) => {
        //     return {
        //         userId: i.user.userId,
        //         firstName: i.user.fName,
        //         lastName: i.user.lName,
        //         major: i.user.majorId,
        //         role: i.roleId,
        //         avatar: i.user.image,
        //     }
        // })

        // console.log(req)
        // console.log("userRole")
        // console.log(members, pendingRequest)
        // res.send({ members, pendingRequest })
        //     const members = await prisma.community_User.findMany({
        //         where: {
        //             communityId: communityID,
        //         },
        //         include: {
        //             user: true,
        //         },
        //     })
        //     const pendingRequest = await prisma.community_User.findMany({
        //         where: {
        //             communityId: communityID,
        //             status: false,
        //         },
        //         include: {
        //             user: true,
        //         },
        //     })
        //     const ownerCommunity = await prisma.community.findUnique({
        //         where: {
        //             communityId: communityID,
        //         },
        //         include: {
        //             owner: true,
        //         },
        //     })
        //     if (ownerCommunity?.owner?.userId === userid) {
        //         res.send({ members, pendingRequest })
        //         res.status(200)
        //     } else {
        //         res.send({ members })
        //         res.status(200)
        //     }
        // } catch (err) {
        //     console.log(err)
        //     res.status(404)
        // }
        const communityById = await prisma.community.findUnique({
            where: {
                communityId: id,
            },
            include: {
                tags: true,
                member: true,
                owner: true,
                posts: true,
            },
        })
        const tag = await prisma.tag.findMany({
            where: {
                tagId: { in: communityById?.tags.map((item: any) => item.tagId) },
            },
        })
        // const isUserPending = await prisma.community_User.findMany({
        //     where: {
        //         communityId: communityById?.communityId,
        //         userId: userId,
        //         status: false,
        //     },
        // })
        // const role = (role: string) => {
        //     if (role === "clavjra540000v32wccz4v12g") {
        //         return "admin"
        //     }
        //     if (role === "clavjrudj0002v32welorer2g") {
        //         return "co-adminr"
        //     }
        //     if (role === "clavjs04i0004v32wxmjn3kvk") {
        //         return "member"
        //     }
        // }
        const communityMember = await prisma.community_User.findMany({
            where: {
                communityId: communityById?.communityId,
            },
            include: {
                user: true,
            },
        })
        if (communityById?.communityId === id) {
            const data = {
                communityId: communityById?.communityId,
                communityName: communityById?.communityName,
                communityDesc: communityById?.communityDesc,
                communityPrivacy: communityById?.communityPrivacy,
                communityPhoto: communityById?.communityPhoto,
                tags: tag,
                isOwner: communityById?.communityOwnerId === userId,
                isPending: communityById?.member.some((item: any) => item.userId === userId && item.status === false),
                isMember:
                    communityById?.communityOwnerId === userId ||
                    communityById?.member.some((item: any) => item.userId === userId && item.status === true),
                memberCount: communityById?.member.length,
                communityMember: {
                    owner: communityById?.owner,
                    admin: communityMember.filter((item: any) => item.roleId === "clavjra540000v32wccz4v12g"),
                    coAdmin: communityMember.filter((item: any) => item.roleId === "clavjrudj0002v32welorer2g"),
                    member: communityMember.filter((item: any) => item.roleId === "clavjs04i0004v32wxmjn3kvk" && item.status === true),
                },
                pendingRequest: communityMember.filter((item: any) => item.status === false),
            }
            // res.send(data)
            res.send(data)
            res.sendStatus(200)
            // console.log(data)
            // console.log(isUserPending)
        } else {
            res.sendStatus(400)
        }
        // console.log(tag)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

export default getCommunityMember
