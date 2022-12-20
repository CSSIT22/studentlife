import { Request, Response } from "express"

const getCommunityMember = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const userId = req.user?.userId
    const id = req.params.id
    const access = req.params.accesss

    try {
        const community = await prisma.community.findUnique({
            where: {
                communityId: id,
            },
            select: {
                member: {
                    select: {
                        user: {
                            select: {
                                userId: true,
                                image: true,
                                fName: true,
                                lName: true,
                                majorId: true,
                            },
                        },
                    },
                    where: {
                        status: true,
                    },
                },
                communityOwnerId: true,
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

        const member = await prisma.community_User.findMany({
            where: {
                communityId: id,
            },
            select: {
                role: {
                    select: {
                        roleName: true,
                    },
                },
                user: {
                    select: {
                        userId: true,
                        image: true,
                        fName: true,
                        lName: true,
                        majorId: true,
                    },
                },
                joined: true,
                status: true,
            },
        })
        const blacklist = await prisma.community_Blacklist.findMany({
            where: {
                communityId: id,
            },
            select: {
                user: {
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

        const list = (role: string) =>
            member
                .filter((member:any) => member.role.roleName === role && member.status === true)
                .map((member:any) => {
                    return {
                        id: member.user.userId,
                        image: member.user.image,
                        name: fullName(member.user.fName, member.user.lName),
                        majorId: member.user.majorId,
                        role,
                    }
                })
        const fullName = (fName: string, lName: string) =>
            `${fName.charAt(0)}${fName?.slice(1).toLocaleLowerCase()} ${lName.charAt(0)}${lName.slice(1).toLocaleLowerCase()}`
        res.send({
            access,
            owner: {
                id: community?.owner?.userId,
                image: community?.owner?.image,
                name: fullName(community?.owner?.fName || "", community?.owner?.lName || ""),
                majorId: community?.owner?.majorId,
                role: "OWNER",
            },
            admin: list("ADMIN"),
            coAdmin: list("CO_ADMIN"),
            member: list("MEMBER"),
            pending: member
                .filter((member:any) => member.status == false)
                .map((member:any) => {
                    return {
                        id: member.user.userId,
                        image: member.user.image,
                        name: fullName(member.user.fName, member.user.lName),
                        majorId: member.user.majorId,
                        role: member.role.roleName,
                        isPending: true,
                        joined: member.joined,
                    }
                }),
            blacklist: blacklist.map((blacklist:any) => {
                return {
                    id: blacklist.user.userId,
                    image: blacklist.user.image,
                    name: fullName(blacklist.user.fName, blacklist.user.lName),
                    majorId: blacklist.user.majorId,
                    isBlacklisted: true,
                }
            }),
        })
        res.status(200).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

export default getCommunityMember
