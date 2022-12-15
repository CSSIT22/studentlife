import AppBody from "../share/app/AppBody"
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
    // Used for switching between white icon in desktop and black icon in mobile
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    return (
        // We use AppBody from shared component.
        <AppBody
            userSelect={props.userSelect}
            secondarynav={[
                {
                    name: "Discovery",
                    to: "/dating",
                    Icon: isMobile ? RandomizationWhiteImg : RandomizationBlackImg,
                },
                {
                    name: "History",
                    to: "/dating/likedyou",
                    Icon: isMobile ? HeartCheckingWhiteImg : HeartCheckingBlackImg,
                },
                {
                    name: "Matches",
                    to: "/dating/match",
                    Icon: isMobile ? YouAreMatchWithWhiteImg : YouAreMatchWithBlackImg,
                },
                {
                    name: "Activity polls",
                    to: "/dating/poll",
                    Icon: isMobile ? ActivityPollWhiteImg : ActivityPollBlackImg,
                },
                {
                    name: "Interests",
                    to: "/dating/interests",
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
                    to: "/dating/tutorial",
                    isRight: true,
                    disableText: true,
                    Icon: isMobile ? DatingTutorialWhiteImg : DatingTutorialBlackImg,
                },
            ]}
        >
            {/* Used so that we can show elements inside DatingAppBody */}
            {props.children}
        </AppBody>
    )
}

export default DatingAppBody
