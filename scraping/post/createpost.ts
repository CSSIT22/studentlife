import { prisma, PrismaClient } from '@prisma/client'
import axios from 'axios'
import ps from './json/result.json'
interface post {
    text: string
    time: string
    img?: string
}

const randomuserId = (users: {userId:string}[])=>{
    const random = Math.floor(Math.random() * users.length);

    return users[random].userId
}


(async()=>{
    const prisma = new PrismaClient()
    const users = await prisma.user_Profile.findMany({select:{userId:true}})
    console.log(ps.length)
    const posts:post[] = ps as post[]
    for(let post of posts){
        try{
            const createdPost = await prisma.student_Post.create({data:{
                body: post.text,
                userId: randomuserId(users),
                ... post.img ?{images: {create:{imageAddress:post.img}}} :{},
                lastEdit: new Date(post.time)
            }})
            console.log(createdPost);
            
        }catch(err){
            console.log(err);
        }
    }
})()