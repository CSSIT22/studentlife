import React from "react"
import { AiFillCamera } from "react-icons/ai"
import AppBody from "../../components/share/app/AppBody"
import YouAreMatchWithWhiteImg from "../../components/dating/pic/youarematchwithwhite.png"
import YouAreMatchWithBlackImg from "../../components/dating/pic/youarematchwithblack.png"
import HeartCheckingWhiteImg from "../../components/dating/pic/heartcheckingwhite.png"
import HeartCheckingBlackImg from "../../components/dating/pic/heartcheckingblack.png"
import ActivityPollWhiteImg from "../../components/dating/pic/activitypollwhite.png"
import ActivityPollBlackImg from "../../components/dating/pic/activitypollblack.png"
import { useBreakpointValue } from "@chakra-ui/react"

const DatingRandomization = () => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })
    return (
        <AppBody
            secondarynav={[
                {
                    name: "Randomization",
                    to: "/dating",
                    Icon: isMobile ? HeartCheckingWhiteImg : HeartCheckingBlackImg,
                },
                {
                    name: "Heart Checking",
                    to: "/dating/likedyou",
                },
                {
                    name: "You are match with",
                    to: "/dating/match",
                    Icon: isMobile ? YouAreMatchWithWhiteImg : YouAreMatchWithBlackImg,
                },
                {
                    name: "Activity poll",
                    to: "/dating/poll",
                    Icon: isMobile ? ActivityPollWhiteImg : ActivityPollBlackImg,
                },
                {
                    name: "Tag of interest",
                    to: "/dating/interest",
                    isRight: true,
                    disableText: true,
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
