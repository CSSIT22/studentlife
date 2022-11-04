import React from "react"
import { AiFillCamera } from "react-icons/ai"
import AppBody from "../../components/share/app/AppBody"
import YouAreMatchWithWhiteImg from "../../components/dating/pic/youarematchwithwhite.png"
import YouAreMatchWithBlackImg from "../../components/dating/pic/youarematchwithblack.png"
import { useBreakpointValue } from "@chakra-ui/react"

const DatingRandomization = () => {
    const icon = useBreakpointValue({
        base: YouAreMatchWithBlackImg,
        md: YouAreMatchWithWhiteImg,
    })
    return (
        <AppBody
            secondarynav={[
                {
                    name: "Randomization",
                    to: "/dating",
                },
                {
                    name: "Heart Checking",
                    to: "/dating/likedyou",
                },
                {
                    name: "You are match with",
                    to: "/dating/match",
                    Icon: icon,
                },
                {
                    name: "Activity poll",
                    to: "/dating/poll",
                },
                {
                    name: "Tag of interest",
                    to: "/dating/interest",
                    isRight: true,
                    disableText: true,
                    Icon: AiFillCamera,
                },
                {
                    name: "Option",
                    to: "/dating/option",
                    isRight: true,
                    disableText: true,
                },
                {
                    name: "Tutorial",
                    to: "/dating/tutorial/welcome",
                    isRight: true,
                    disableText: true,
                },
            ]}
        >
            Randomization
        </AppBody>
    )
}

export default DatingRandomization
