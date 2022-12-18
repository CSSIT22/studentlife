import { Request, Response } from "express"

const getCommunityId = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userId = req.user?.userId
    const id = req.params.id

    try {
        const community = await prisma.community.findUnique({
            where: {
                communityId: id,
            },
            select: {
                communityName: true,
                communityDesc: true,
                communityPrivacy: true,
                communityPhoto: true,
                communityOwnerId: true,
                communityId: true,
                //select tags
                tags: {
                    select: {
                        tag: true,
                    },
                },
                posts: true,
                member: {
                    select: {
                        userId: true,
                    },
                    where: {
                        status: true,
                    },
                },
                files: {
                    select: {
                        file: {
                            select: {
                                fileId: true,
                                fileName: true,
                                fileSender: true,
                            },
                        },
                    },
                },
                owner: {
                    select: {
                        userId: true,
                    },
                },
            },
        })
        //check if the user is a member of the community
        const isMember =
            (
                await prisma.community_User.findUnique({
                    where: {
                        userId_communityId: {
                            userId: userId || "",
                            communityId: id,
                        },
                    },
                })
            )?.status === true
        //check if the user is blacklisted from the community
        const isBlacklisted =
            (
                await prisma.community_Blacklist.findUnique({
                    where: {
                        userId_communityId: {
                            userId: userId || "",
                            communityId: id,
                        },
                    },
                })
            )?.userId === userId
        //get the role of the user and the status of the user
        const user = await prisma.community_User.findUnique({
            where: {
                userId_communityId: {
                    userId: userId || "",
                    communityId: id,
                },
            },
            select: {
                role: {
                    select: {
                        roleName: true,
                    },
                },
                userId: true,
                status: true,
                joined: true,
                user: {
                    select: {
                        fName: true,
                        lName: true,
                    },
                },
            },
        })

        //The access property is true
        //if the user is a member of the community,
        //if the community is public
        //if the user is the owner of the community
        //if the user is not blacklisted
        const access = isMember || community?.communityOwnerId === userId || (user?.role.roleName !== undefined && user?.status)
        res.send({
            user: {
                id: user?.userId || community?.communityOwnerId,
                access: access, //true if member, false if not a member
                role: community?.communityOwnerId === userId ? "OWNER" : user?.role.roleName, //role of the user
                status: user?.status, //true if member, false if pending, undefined if not a member
                isBlacklisted, //true if blacklisted, false if not blacklisted, undefined if not a member
                joined: user?.joined, //date when the user joined the community
                name: user?.user.fName + " " + user?.user.lName,
            },
            community: {
                id: community?.communityId,
                name: community?.communityName,
                desc: community?.communityDesc,
                privacy: community?.communityPrivacy, //true if private, false if public
                photo: community?.communityPhoto,
                tags: community?.tags.map((item: any) => item.tag),
                memberCount: (community?.member.length || 0) + 1, //+1 for the owner
                file: community?.files,
            },
        })
        res.status(200).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

export default getCommunityId
