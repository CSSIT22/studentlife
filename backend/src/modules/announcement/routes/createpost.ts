import { post } from "@apiType/announcement"
import { Request, Response } from "express"
import { getPost, setPost } from ".."

const createPost = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const id = req.user?.userId
    const { topic, detail, targetType, targetValue, expiredPost, addmorelang } = req.body
    const fId = Date.now();
    try {
        const newFilter = await prisma.announcement_Filter.create({
            data: {
                filterId:fId,
                filterType:targetType,
                value:targetValue
            }
        })
        // let lang;
        // for(let i =0;i<addmorelang.length;i++){
        //     const lang = addmorelang[i].map((el:any) => ({
        //         languageId:el.lang_id, annTopic:el.topic,annDetail:el.detail
        //     }))
        // }
        //  = addmorelang.map((el:any) => (
        //     {languageId:el.lang_id,annTopic:el.topic,annDetail:el.detail}
        // ))
       
        const ll = addmorelang.map((el:any) => (
            {languageId:el.languageId,annTopic:el.annTopic,annDetail:el.annDetail}
        ))
        ll.push({languageId:1000,annTopic:topic,annDetail:detail})
        console.log(ll);
        
        const newPost = await prisma.announcement.create({
            data: {
                annExpired:expiredPost,
                userId: req.user?.userId || "",
                filterId:fId,
                annLanguage:{
                    createMany:{data:ll}
                },
                annPost:{
                    create:{}
                },
                annPin:{
                    create:{
                        userId: req.user?.userId || ""
                    }
                },
            }
        })

        res.status(200)
    }catch(err) {
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
