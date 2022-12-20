import { Request, Response } from "express"

const getCommunity = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userId = req.user?.userId

    try {
        const communityUser = await prisma.community_User.findMany({
            where: {
                userId: userId,
                status: true,
            },
        })

        const communityUserInvite = await prisma.community_User.findMany({
            select: {
                communityId: true,
                status: true,
            },
            where: {
                userId: userId,
                status: false,
            },
        })

        const joinedCommunitys = await prisma.community.findMany({
            where: {
                communityId: { in: communityUser.map((item: any) => item.communityId) },
            },
            include: {
                member: {
                    where: {
                        status: true,
                    },
                },
            },
        })

        const ownCommunitys = await prisma.community.findMany({
            where: {
                communityOwnerId: userId,
            },
            include: {
                member: {
                    where: {
                        status: true,
                    },
                },
            },
        })

        const pendingRequest = await prisma.community.findMany({
            where: {
                communityId: { in: communityUserInvite.map((item: any) => item.communityId) },
            },
            include: {
                member: {
                    where: {
                        userId: userId,
                    },
                },
                owner: true,
            },
        })

        const invitations = await prisma.community.findMany({
            where: {
                communityId: { in: communityUserInvite.map((item: any) => item.communityId) },
            },
        })

        const suggest = await prisma.community.findMany({
            where: {
                communityId: { notIn: communityUser.map((item: any) => item.communityId) },
                NOT: { communityOwnerId: userId },
            },
            include: {
                member: {
                    where: {
                        status: true,
                    },
                },
            },
        })
        const lastOwnActivity = await prisma.community.findMany({
            where: {
                communityOwnerId: userId,
            },
            select: {
                posts: {
                    orderBy: {
                        post: {
                            lastEdit: "desc",
                        },
                    },
                    take: 1,
                    select: {
                        post: {
                            select: {
                                lastEdit: true,
                            },
                        },
                    },
                },
                communityId: true,
            },
        })
        const lastActivity = await prisma.community.findMany({
            where: {
                //joined
                communityId: { in: communityUser.map((item: any) => item.communityId) },
            },

            select: {
                posts: {
                    orderBy: {
                        post: {
                            lastEdit: "desc",
                        },
                    },
                    take: 1,
                    select: {
                        post: {
                            select: {
                                lastEdit: true,
                            },
                        },
                    },
                },
                communityId: true,
            },
        })
        //return this format to frontend 9 hours ago, 2 days ago, 1 week ago, 1 month ago, 1 year ago
        const lastActivityFormat = (date: any) => {
            if (date == undefined) return "never"
            const now = new Date()
            const diff = now.getTime() - date.getTime()
            const diffDays = Math.floor(diff / (1000 * 3600 * 24))
            const diffHours = Math.floor(diff / (1000 * 3600))
            const diffMinutes = Math.floor(diff / (1000 * 60))
            const diffSeconds = Math.floor(diff / 1000)
            if (diffDays > 365) {
                return `${Math.floor(diffDays / 365)} year ago`
            } else if (diffDays > 30) {
                return `${Math.floor(diffDays / 30)} month ago`
            } else if (diffDays > 7) {
                return `${Math.floor(diffDays / 7)} week ago`
            } else if (diffDays > 0) {
                return `${diffDays} day ago`
            } else if (diffHours > 0) {
                return `${diffHours} hour ago`
            } else if (diffMinutes > 0) {
                return `${diffMinutes} minute ago`
            } else if (diffSeconds > 0) {
                return `${diffSeconds} second ago`
            } else {
                return "just now"
            }
        }

        const commuinities: any = {
            count: joinedCommunitys.length + ownCommunitys.length, //send count of joined and own community
            userId: userId,
            communityList: {
                joined: joinedCommunitys.map((item: any) => {
                    const last = lastActivity.find((last: any) => last.communityId === item.communityId)
                    return {
                        ...item,

                        lastActive: lastActivityFormat(last?.posts[0]?.post?.lastEdit),
                    }
                }),
                own: ownCommunitys?.map((item: any) => {
                    const last = lastOwnActivity.find((last: any) => last.communityId === item.communityId)
                    return {
                        ...item,
                        lastActive: lastActivityFormat(last?.posts[0]?.post?.lastEdit),
                    }
                }),
                invite: invitations,
                suggest: suggest,
                pendingRequest: pendingRequest,
            },
            test: "test",
            test2: lastActivity,

            // ownCommunitys,
            // countOwn,
            // joinedCommunitys,
            // countJoined,
            // invitations,
            // countInvite
        }

        res.send(commuinities)
    } catch (err) {
        res.status(404)
    }
}

export default getCommunity
