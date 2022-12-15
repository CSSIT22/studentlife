import { post } from "./../../../../../types/announcement/index"
import { getPost } from "./../index"
import { Request, Response } from "express"
import axios from "axios"

const getTargetGroup = async (req: Request, res: Response) => {
    // const postid = parseInt(req.params.id+"")
    const postId = req.body.postId
    const targetType = req.body.targetType
    const targetValue = req.body.targetValue
    const prisma = res.prisma

    try {
        const postuserid = await prisma.announcement.findMany({
            where:{
                postId: postId
            },
            select:{
                userId:true,
                annLanguage: {
                    select:{
                        annTopic: true
                    }
                }
            }
        })
        if (targetType == "Major") {
            const majorUsers = await prisma.user_Profile.findMany({
                where: {
                    majorId: targetValue,
                },
                select: {
                    userId: true,
                },
            })
            // console.log(majorUsers)
            // res.send(majorUsers)
            let majoruserid = []
            for (let i = 0; i < majorUsers.length; i++) {
                const creatintable = await prisma.announcement_Pin.create({
                    data: {
                        postId: postId,
                        userId: majorUsers[i].userId,
                    },
                })
                majoruserid.push(majorUsers[i].userId)
            }
            // axios.post("http://localhost:8000/notification/addnotiobject", {
            //     template: "ANNOUNCEMENT_NEW",
            //     value: [postuserid[0].annLanguage[0].annTopic],
            //     userId: majoruserid,
            //     module: "ANNOUNCEMENT",
            //     url: "/announcement/",
            //     sender: postuserid[0].userId,
            // })

        } else if (targetType == "Faculty") {
            const majors = await prisma.major.findMany({
                where: {
                    facultyId: targetValue,
                },
                select: {
                    majorId: true,
                },
            })
            // console.log(majors)
            // let majorIds: string[] = []
            // for( let i =0 ; i < majors.length ;i++){
            //     majorIds[i] = majors[i].majorId
            // }
            // console.log(majorIds)
            let allUserIds = []

            for (let i = 0; i < majors.length; i++) {
                const majorusers = await prisma.user_Profile.findMany({
                    where: {
                        majorId: majors[i].majorId,
                    },
                    select: {
                        userId: true,
                    },
                })
                for (let i = 0; i < majorusers.length; i++) {
                    allUserIds.push(majorusers[i].userId)
                }
            }
            // console.log(allUserIds)
            for (let i = 0; i < allUserIds.length; i++) {
                const creatintable = await prisma.announcement_Pin.create({
                    data: {
                        postId: postId,
                        userId: allUserIds[i],
                    },
                })
            }

            // axios.post("http://localhost:8000/notification/addnotiobject", {
            //     template: "ANNOUNCEMENT_NEW",
            //     value: [postuserid[0].annLanguage[0].annTopic],
            //     userId: allUserIds,
            //     module: "ANNOUNCEMENT",
            //     url: "/announcement/",
            //     sender: postuserid[0].userId,
            // })
        } else if (targetType == "Year") {
            let year = new Date()
            const thaiYear = (year.getFullYear() + 543) % 100
            // console.log(thaiYear)
            const key = thaiYear - parseInt(targetValue) + 1
            // console.log(key)
            const allStudentId = await prisma.user_Profile.findMany({
                select: {
                    studentId: true,
                },
            })
            // console.log(allStudentId)
            // console.log(allStudentId[0].studentId.substring(0,2))
            const selectStudentId = []
            for (let i = 0; i < allStudentId.length; i++) {
                if (parseInt(allStudentId[i].studentId.substring(0, 2)) == key) {
                    selectStudentId.push(allStudentId[i])
                }
            }
            // console.log(selectStudentId.length)
            let selectedUserIds = []
            for (let i = 0; i < selectStudentId.length; i++) {
                const userId = await prisma.user_Profile.findMany({
                    where: {
                        studentId: selectStudentId[i].studentId,
                    },
                    select: {
                        userId: true,
                    },
                })
                for (let i = 0; i < userId.length; i++) {
                    selectedUserIds.push(userId[i].userId)
                }
            }
            // console.log(selectedUserIds)
            for (let i = 0; i < selectedUserIds.length; i++) {
                const creatintable = await prisma.announcement_Pin.create({
                    data: {
                        postId: postId,
                        userId: selectedUserIds[i],
                    },
                })
            }
            // axios.post("http://localhost:8000/notification/addnotiobject", {
            //     template: "ANNOUNCEMENT_NEW",
            //     value: [postuserid[0].annLanguage[0].annTopic],
            //     userId: selectedUserIds,
            //     module: "ANNOUNCEMENT",
            //     url: "/announcement/",
            //     sender: postuserid[0].userId,
            // })

        } else if (targetType == "Everyone") {
            const everyUserId = await prisma.user_Profile.findMany({
                select: {
                    userId: true,
                },
            })
            let userid = []
            for (let i = 0; i < everyUserId.length; i++) {
                userid.push(everyUserId[i].userId);
            }
            // console.log(everyUserId)
            for (let i = 0; i < everyUserId.length; i++) {
                const creatintable = await prisma.announcement_Pin.create({
                    data: {
                        postId: postId,
                        userId: everyUserId[i].userId,
                    },
                })
            }
            res.send(everyUserId)

            // axios.post("http://localhost:8000/notification/addnotiobject", {
            //     template: "ANNOUNCEMENT_NEW",
            //     value: [postuserid[0].annLanguage[0].annTopic],
            //     userId: userid,
            //     module: "ANNOUNCEMENT",
            //     url: "/announcement/",
            //     sender: postuserid[0].userId,
            // })
            
        }
    } catch (err: any) {
        // console.log(err)
        res.status(404).send("Target Group not found")
    }
}

export default getTargetGroup
