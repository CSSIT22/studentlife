import { Button, Image, VStack } from "@chakra-ui/react"
import React from "react"
import AlgoTester from "./AlgoTester"
import Post from "./Post"

export const Feed = () => {
    function CurrentDate(): string {
        var date: Date = new Date()
        var dmy = date.toDateString()
        var hours = date.getHours().toString()
        var minutes = date.getMinutes().toString()
        // var seconds = date.getSeconds().toString()
        let currentDate: string = dmy + " " + hours + ":" + minutes /* + ":" + seconds */
        return currentDate
    }

    function RandomNumber() {
        return Math.floor(Math.random() * 1001)
    }

    return (
        <VStack>
            <AlgoTester></AlgoTester>
            <Post id={""} name={""} dateTime={""} message={""} likes={0} comments={0} shares={0} avatar={""} media={""}></Post>
        </VStack>
    )

}

export default Feed
function UseState(): [any, any] {
    throw new Error("Function not implemented.")
}
