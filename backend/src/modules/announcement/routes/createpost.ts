import  axios  from 'axios';
import { post } from "@apiType/announcement"
import { Request, Response } from "express"
import { getPost, setPost } from ".."

const createPost = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const id = req.user?.userId
    const { topic, detail, targetType, targetValue, expiredPost, addmorelang } = req.body
    try {
        // claxt4vk80000suv9drqmx48w
        let approvalid = []
        const approval = await prisma.user_To_Role.findMany({
            where:{
                roleId: "claxt4vk80000suv9drqmx48w"
            },
            select:{
                userId: true
            }
        })
        for (let i = 0; i < approval.length; i++) {
            approvalid.push(approval[i].userId);
        }
        // console.log(approvalid)
        
        // axios.post("http://localhost:8000/notification/addnotiobject",{
        //     "template": "ANNOUNCEMENT_WAIT_FOR_APPROVE",
        //     "value": [],
        //     "userId": approvalid,
        //     "module":"ANNOUNCEMENT",
        //     "url":"/announcement/approval",
        //     "sender":id,
        // })

        let filterNo: number
        if (targetType == "Everyone") {
            const newFilter = await prisma.announcement_Filter.findFirstOrThrow({
                where: {
                    filterType: targetType,
                },
                select: {
                    filterId: true,
                },
            })
            filterNo = newFilter.filterId
            // console.log(filterNo);
        } else {
            const newFilter = await prisma.announcement_Filter.findFirstOrThrow({
                where: {
                    filterType: targetType,
                    value: targetValue,
                },
                select: {
                    filterId: true,
                },
            })
            filterNo = newFilter.filterId
            // console.log(filterNo);
        }

        // console.log(req.body);
        let ll = []
        ll.push({ languageId: 1000, annTopic: topic, annDetail: detail })
        addmorelang.map((el: any) => ll.push({ languageId: el.languageId, annTopic: el.annTopic, annDetail: el.annDetail }))
        // console.log(ll);
        const addHours = (date: Date): Date => {
            const result = new Date(date)
            result.setHours(result.getHours() + 7)
            return result
        }

        const newPost = await prisma.announcement.create({
            data: {
                annExpired: expiredPost,
                userId: req.user?.userId || "",
                filterId: filterNo,
                annLanguage: {
                    createMany: { data: ll },
                },
                annCreated: addHours(new Date()),
                annPost: {
                    create: {},
                },
            },
        })
        res.send(newPost)
        res.status(200)
    } catch (err) {
        // console.log(err);
        res.status(400).send(err)
    }
    // const newPost = {
    //     postId: Date.now(),
    //     userId: req.user?.userId || "",
    //     lang_id: 1000,
    //     topic: topic,
    //     detail: detail,
    //     sender: "SAMO-SIT",
    //     status: "waiting",
    //     pinStatus: false,
    //     isApprove: false,
    //     targetType: targetType,
    //     targetValue: targetValue,
    //     postAt: new Date(),
    //     expiredOfPost: expiredPost,
    //     expiredAfterDelete: new Date(),
    //     addMoreLang: addmorelang,
    // }
    // let newData: post[] = []
    // for (let i = 0; i < getPost().length; i++) {
    //     newData.push(getPost()[i])
    // }
    // newData.push(newPost)
    // setPost([getPost().map((el) => (el)), newPost])
    // console.log(newData);
    // setPost(newData)
    // return res.send(newPost)
    // console.log(newData);

    // setPost(newData)
}

export default createPost
