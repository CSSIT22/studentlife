import { Button, Image, VStack } from "@chakra-ui/react"
import React from "react"
import Post from "./Post"

const Feed = () => {
    function currentDate(): string {
        var date: Date = new Date()
        var dmy = date.toDateString()
        var hours = date.getHours().toString()
        var minutes = date.getMinutes().toString()
        var seconds = date.getSeconds().toString()
        let currentDate: string = dmy + " " + hours + ":" + minutes + ":" + seconds
        return currentDate
    }

    return (
        <VStack>
            <Post
                name="Mr.Cat 1"
                dateTime={currentDate()} /*"23m"*/
                message="Hello from the other side!"
                likes={20}
                avatar="https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg"
                media="https://img.freepik.com/premium-vector/boy-waving-hand-greeting-cute-people-illustration_107355-500.jpg?w=1380"
                score={112312341240}
            />
            <Post
                name="Mr.Cat 2"
                dateTime={currentDate()} /*"1d"*/
                message="Seek success, but always be prepared for random cats."
                likes={132}
                avatar="https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg"
                media="https://img.freepik.com/premium-vector/smiling-young-man-showing-thumbs-up-illustration-hand-drawn-style_213307-233.jpg?w=1380"
                score={0}
            />
            <Post
                name="Mr.Cat 3"
                dateTime={currentDate()} /*"4h"*/
                message="Sometimes I stare at a door or a wall and I wonder what is this reality, why am I alive, and what is this all about?"
                likes={11}
                avatar="https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg"
                media="https://img.freepik.com/premium-vector/big-obstacle-concept-illustration_1133-825.jpg?w=1800"
                score={0}
            />
            <Post
                name="Mr.Cat 4"
                dateTime={currentDate()} /*"14m"*/
                message="Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal. Unqualified, the word football normally means the form of football that is the most popular where the word is used. Sports commonly called football include association football (known as soccer in North America and Oceania);
                gridiron football (specifically American football or Canadian football); Australian rules football; rugby union and rugby league; and Gaelic football. These various forms of football share to varying extent common origins and are known as football codes."
                likes={150}
                avatar="https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg"
                media=""
                score={0}
            />
        </VStack>
    )
}

export default Feed
