import React from "react"
import { AiFillCamera } from "react-icons/ai"
import AppBody from "../../components/share/app/AppBody"

const DatingRandomization = () => {
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
