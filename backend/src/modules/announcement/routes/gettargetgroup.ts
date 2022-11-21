import { post } from "./../../../../../types/announcement/index"
import { getPost } from "./../index"
import { Request, Response } from "express"



const getTargetGroup = async (req: Request, res: Response) => {
    // const postid = parseInt(req.params.id+"")
    const postId = req.body.postId
    const targetType = req.body.targetType
    const targetValue = req.body.targetValue
    const prisma = res.prisma
    
    try {
        if (targetType == "Major") {
            const majorUsers = await prisma.user_Profile.findMany({
                where: {
                    majorId: targetValue,
                },
                select: {
                    userId: true,
                },
            })
            console.log(majorUsers)
            res.send(majorUsers)
        } 
        else if (targetType == "Faculty") {
            const majors = await prisma.major.findMany({
                where:{
                    facultyId: targetValue,
                },
                select:{
                    majorId: true
                }
            })
            console.log(majors)
            // let majorIds: string[] = []
            // for( let i =0 ; i < majors.length ;i++){
            //     majorIds[i] = majors[i].majorId
            // }
            // console.log(majorIds)
            let allUserIds =[]

            for(let i =0;i<majors.length;i++){
                const majorusers = await prisma.user_Profile.findMany({
                    where:{
                        majorId: majors[i].majorId
                    },
                    select:{
                        userId: true
                    }
                })
                for(let i=0;i<majorusers.length;i++){
                    allUserIds.push(majorusers[i])
                }
            }
            console.log(allUserIds)
            res.send(allUserIds)
            
        } 
        else if (targetType == "Year") {
            let year = new Date()
            const thaiYear = (year.getFullYear() +543) % 100
            // console.log(thaiYear)
            const key = thaiYear - parseInt(targetValue) + 1
            // console.log(key)
            const allStudentId = await prisma.user_Profile.findMany({
                select:{
                    studentId: true
                }
            })
            // console.log(allStudentId)
            // console.log(allStudentId[0].studentId.substring(0,2))
            const selectStudentId = []
            for(let i=0;i<allStudentId.length;i++){
                if(parseInt(allStudentId[i].studentId.substring(0,2))==key){
                    selectStudentId.push(allStudentId[i])
                }
            }
            // console.log(selectStudentId.length)
            let selectedUserIds =[]
            for(let i =0;i<selectStudentId.length;i++){
                const userId = await prisma.user_Profile.findMany({
                    where:{
                        studentId: selectStudentId[i].studentId
                    },
                    select:{
                        userId: true
                    }
                })
                for(let i=0;i<userId.length;i++){
                    selectedUserIds.push(userId[i])
                }
            }
            console.log(selectedUserIds)
            res.send(selectedUserIds)
            // console.log(allUserIds.length)  
        }
        else if(targetType=="Everyone"){
            const everyUserId = await prisma.user_Profile.findMany({
              select:{
                userId: true
              }   
            }) 
            console.log(everyUserId)
            res.send(everyUserId)
        }
    } catch (err: any) {
        console.log(err)
        res.status(500)
    }
}

export default getTargetGroup
