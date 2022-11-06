import AppBody from "../../components/share/app/AppBody"
import YouAreMatchWithWhiteImg from "./pic/youarematchwithwhite.png"
import YouAreMatchWithBlackImg from "./pic/youarematchwithblack.png"
import HeartCheckingWhiteImg from "./pic/heartcheckingwhite.png"
import HeartCheckingBlackImg from "./pic/heartcheckingblack.png"
import ActivityPollWhiteImg from "./pic/activitypollwhite.png"
import ActivityPollBlackImg from "./pic/activitypollblack.png"
import RandomizationWhiteImg from "./pic/randomizationwhite.png"
import RandomizationBlackImg from "./pic/randomizationblack.png"
import TagOfInterestWhiteImg from "./pic/tagofinterestwhite.png"
import TagOfInterestBlackImg from "./pic/tagofinterestblack.png"
import DatingOptionsWhiteImg from "./pic/datingoptionwhite.png"
import DatingOptionsBlackImg from "./pic/datingoptionblack.png"
import DatingTutorialWhiteImg from "./pic/datingtutorialwhite.png"
import DatingTutorialBlackImg from "./pic/datingtutorialblack.png"
import { useBreakpointValue } from "@chakra-ui/react"

const DatingAppBody = (props: any) => {
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
                    Icon: isMobile ? RandomizationWhiteImg : RandomizationBlackImg,
                },
                {
                    name: "Heart checking",
                    to: "/dating/likedyou",
                    Icon: isMobile ? HeartCheckingWhiteImg : HeartCheckingBlackImg,
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
                    Icon: isMobile ? TagOfInterestWhiteImg : TagOfInterestBlackImg,
                },
                {
                    name: "Option",
                    to: "/dating/option",
                    isRight: true,
                    disableText: true,
                    Icon: isMobile ? DatingOptionsWhiteImg : DatingOptionsBlackImg,
                },
                {
                    name: "Tutorial",
                    to: "/dating/tutorial/welcome",
                    isRight: true,
                    disableText: true,
                    Icon: isMobile ? DatingTutorialWhiteImg : DatingTutorialBlackImg,
                },
            ]}
        >
            {props.children}
        </AppBody>
    )
}

export default DatingAppBody
