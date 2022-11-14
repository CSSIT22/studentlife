import { VStack } from "@chakra-ui/react"
import React from "react"
import Post from "./Post"

const Feed = () => {
    return (
        <VStack>
            <Post
                name="Mr.Cat 1"
                dateTime="23m"
                message="Hello from the other side!"
                likes="2k"
                photoUrl="https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg"
            />
            <Post
                name="Mr.Cat 2"
                dateTime="1d"
                message="Seek success, but always be prepared for random cats."
                likes="134"
                photoUrl="https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg"
            />
            <Post
                name="Mr.Cat 3"
                dateTime="4h"
                message="Sometimes I stare at a door or a wall and I wonder what is this reality, why am I alive, and what is this all about?"
                likes="11"
                photoUrl="https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg"
            />
            <Post
                name="Mr.Cat 4"
                dateTime="14m"
                message="Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal. Unqualified, the word football normally means the form of football that is the most popular where the word is used. Sports commonly called football include association football (known as soccer in North America and Oceania);
                gridiron football (specifically American football or Canadian football); Australian rules football; rugby union and rugby league; and Gaelic football. These various forms of football share to varying extent common origins and are known as football codes."
                likes="15k"
                photoUrl="https://upload.wikimedia.org/wikipedia/commons/4/48/RedCat_8727.jpg"
            />
        </VStack>
    )
}

export default Feed
