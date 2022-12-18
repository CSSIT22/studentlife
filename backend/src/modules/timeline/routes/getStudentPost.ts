import { Student_Post } from "@prisma/client"
import { Request, Response } from "express"

interface studentResonseType extends Student_Post {
    postOwner: {
        fName: string
        lName: string
        userId: string
    }
    studentsReacted: number
}
// get post from Student_Profile
const getStudentPost = async (req: Request, res: Response) => {
    try {
        const { prisma } = res
        const i = parseInt(req.params.i) * 20
        const thisUserId = req.user ? req.user.userId : ""

        const following = await res.prisma.user_Profile.findMany({
            where: {
                userFollowers: {
                    some: {
                        userId: req.user?.userId || "",
                    },
                },
            },
            select: { userId: true },
        })
        const selectbyposts1 = await res.prisma.student_Post.findMany({
            where: {
                userId: {
                    in: following.map((item) => item.userId),
                },
            },
            select: { postId: true },
        })
        const selectByGroupBy = await res.prisma.student_Reacted.groupBy({
            by: ["postId"],
            where: {
                postId: {
                    in: selectbyposts1.map((item) => item.postId),
                },
            },
            _count: {
                userId: true,
            },
            orderBy: { _count: { userId: "desc" } },
            take: 20,
            skip: i,
        })

        const selectbyposts = await res.prisma.student_Post.findMany({
            where: {
                postId: {
                    in: selectByGroupBy.map((item) => item.postId),
                },
            },
            include: {
                postOwner: {
                    select: {
                        fName: true,
                        lName: true,
                        userId: true,
                    },
                },
                files: {
                    select: {
                        fileAddress: true,
                    },
                },
                _count: {
                    select: { studentsReacted: true },
                },
            },
        })

        // console.log(selectByGroupBy)

        const resp: studentResonseType[] = selectByGroupBy.map((item) => {
            const p = selectbyposts.filter((i) => i.postId === item.postId)[0]
            return {
                ...p,
                studentsReacted: p._count.studentsReacted,
                score: p._count.studentsReacted,
            }
        })

        // const response: studentResonseType[] = selectbyposts.map((item) => ({
        //     ...item,
        //     studentsReacted: item._count.studentsReacted,
        //     score: item._count.studentsReacted,
        // }))

        // const getStudentP = await res.prisma.user_Profile.findFirst({
        //     where: { userId: req.user?.userId || "" },
        //     select: {
        //         userFollowing: {
        //             select: {
        //                 following: {
        //                     select: {
        //                         posts: {
        //                             include: {
        //                                 _count: { select: { studentsReacted: true } },
        //                                 postOwner: { select: { fName: true, lName: true, userId: true } },
        //                             },
        //                         },
        //                     },
        //                 },
        //             },
        //         },
        //     },
        // })

        // const temp: studentResonseType[][] = getStudentP?.userFollowing.map((item) =>
        //     item.following.posts.map((post) => ({ ...post, studentsReacted: post._count.studentsReacted }))
        // ) || [[]]
        // let response: studentResonseType[] = []
        // for (let r of temp) {
        //     for (let p of r) {
        //         response.push(p)
        //     }
        // }
        res.send(resp)
    } catch (error) {
        res.status(400).send("Error: can not get post in getStudentPost.ts")
    }
}

export default getStudentPost
