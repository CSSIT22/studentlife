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
                        role: {
                            select: {
                                roleName: true,
                            },
                        },
                    },
                },
            },
        })
        // let i = 0
        //find all post in community and include media post and user role
        const getStudentPost = await prisma.student_Post.findMany({
            // take: 20,
            // skip: i,
            // orderBy: { score: "desc" },
            // include: {
            //     postOwner: true,
            // },
            where: {
                communityPost: {
                    communityId: id,
                },
            },
            include: {
                postOwner: true,
                files: true,
                communityPost: {
                    select: {
                        isPinned: true,
                    },
                },
            },
            orderBy: {
                lastEdit: "desc",
            },
        })
        // i += 20

        const fullName = (fName: string, lName: string) =>
            `${fName.charAt(0)}${fName?.slice(1).toLocaleLowerCase()} ${lName.charAt(0)}${lName.slice(1).toLocaleLowerCase()}`

        const communityPost = await prisma.community_Post.findMany({
            select: {
                post: true,
                isPinned: true,
                community: {
                    select: {
                        communityId: true,
                        owner: {
                            select: {
                                userId: true,
                                image: true,
                                fName: true,
                                lName: true,
                                majorId: true,
                            },
                        },
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
                                role: {
                                    select: {
                                        roleName: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            where: {
                communityId: id,
            },
            orderBy: {
                post: {
                    score: "desc",
                    // lastEdit: "desc",
                },
            },
        })

        res.send({
            postTest: communityPost,
            post: getStudentPost.map((post) => ({
                id: post.postId,
                body: post.body,
                user: {
                    id: post.postOwner.userId,
                    image: post.postOwner.image,
                    name: fullName(post.postOwner.fName, post.postOwner.lName),
                    major: post.postOwner.majorId,
                    role:
                        post.postOwner.userId == community?.owner?.userId
                            ? "OWNER"
                            : community?.member.find((member) => member.user.userId == post.postOwner.userId)?.role.roleName,
                    undefined:
                        community?.member.find((member) => member.user.userId == post.postOwner.userId)?.role.roleName == undefined &&
                        post.postOwner.userId != community?.owner?.userId,
                },
                isPinned: communityPost.find((communityPost) => communityPost.post.postId == post.postId)?.isPinned,
                date: post.lastEdit,
                score: post.score,
                seen: post.seen,
                postMedia: post.files.find((file) => (post.postId = file.postId))?.fileAddress,
            })),
            // post: communityPost.map((post) => ({
            //     id: post.post.postId,
            //     body: post.post.body,
            //     user: {
            //         id:
            //             post.post.userId == community?.owner?.userId
            //                 ? community.owner.userId
            //                 : post.community.member.find((member) => member.user.userId == post.post.userId)?.user.userId,
            //         image:
            //             post.post.userId == community?.owner?.userId
            //                 ? community.owner.image
            //                 : post.community.member.find((member) => member.user.userId == post.post.userId)?.user.image,
            //         name:
            //             post.post.userId == community?.owner?.userId
            //                 ? fullName(community.owner.fName, community.owner.lName)
            //                 : fullName(
            //                       post.community.member.find((member) => member.user.userId == post.post.userId)?.user.fName || "",
            //                       post.community.member.find((member) => member.user.userId == post.post.userId)?.user.lName || ""
            //                   ),
            //         major:
            //             post.post.userId == community?.owner?.userId
            //                 ? community.owner.majorId
            //                 : post.community.member.find((member) => member.user.userId == post.post.userId)?.user.majorId,
            //         role:
            //             post.post.userId == community?.owner?.userId
            //                 ? "OWNER"
            //                 : post.community.member.find((member) => member.user.userId == post.post.userId)?.role.roleName,
            //     },
            //     isPinned: post.isPinned,
            //     date: post.post.lastEdit,
            //     score: post.post.score,
            //     seen: post.post.seen,
            // })),
            testPost: community,
            owner: fullName(community?.owner?.fName || "", community?.owner?.lName || ""),
        })
        res.status(200)
    } catch (err) {
        res.status(404)
    }
}

export default getCommunityPost
