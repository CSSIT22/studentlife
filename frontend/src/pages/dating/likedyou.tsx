import AppBody from "../../components/share/app/AppBody"
import YouAreMatchWithWhiteImg from "../../components/dating/pic/youarematchwithwhite.png"
import YouAreMatchWithBlackImg from "../../components/dating/pic/youarematchwithblack.png"
import HeartCheckingWhiteImg from "../../components/dating/pic/heartcheckingwhite.png"
import HeartCheckingBlackImg from "../../components/dating/pic/heartcheckingblack.png"
import ActivityPollWhiteImg from "../../components/dating/pic/activitypollwhite.png"
import ActivityPollBlackImg from "../../components/dating/pic/activitypollblack.png"
import RandomizationWhiteImg from "../../components/dating/pic/randomizationwhite.png"
import RandomizationBlackImg from "../../components/dating/pic/randomizationblack.png"
import TagOfInterestWhiteImg from "../../components/dating/pic/tagofinterestwhite.png"
import TagOfInterestBlackImg from "../../components/dating/pic/tagofinterestblack.png"
import DatingOptionsWhiteImg from "../../components/dating/pic/datingoptionwhite.png"
import DatingOptionsBlackImg from "../../components/dating/pic/datingoptionblack.png"
import DatingTutorialWhiteImg from "../../components/dating/pic/datingtutorialwhite.png"
import DatingTutorialBlackImg from "../../components/dating/pic/datingtutorialblack.png"
import { useBreakpointValue } from "@chakra-ui/react"

const LikedYou = () => {
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
            People who liked you
        </AppBody>
    )
}

export default LikedYou
