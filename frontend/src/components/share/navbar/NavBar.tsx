import { useBreakpointValue } from "@chakra-ui/react"
import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai"
import { HiOutlineUserGroup, HiSpeakerphone } from "react-icons/hi"
import { BsPatchQuestion } from "react-icons/bs"
import NavBarDesktop from "./NavBarDesktop"
import NavBarMobile from "./NavBarMobile"
import { FC } from "react"
import { secondaryNavProps } from "../app/AppBody"
import API from "src/function/API"

export const logout = () => {
    API.get("/auth/logout").then(() => {
        document.location.reload()
    })
}

export const NavBarMenu = [
    { to: "/", Icon: AiOutlineHome, name: "Home" },
    { to: "/dating", Icon: AiOutlineHeart, name: "Dating" },
    { to: "/qa", Icon: BsPatchQuestion, name: "Q&A" },
    { to: "/groups", Icon: HiOutlineUserGroup, name: "Communities" },
]

export const moreMenu = [
    { to: "/announcement", Icon: HiSpeakerphone, name: "Announcement" },
    { to: "/shortnotes", Icon: HiSpeakerphone, name: "Short notes" },
    { to: "/Blog", Icon: HiSpeakerphone, name: "Blog" },
    { to: "/airdrop", Icon: HiSpeakerphone, name: "Airdrop" },
    { to: "/shop", Icon: HiSpeakerphone, name: "Shop" },
    { to: "/restaurant", Icon: HiSpeakerphone, name: "Restaurant" },
    { to: "/qa", Icon: HiSpeakerphone, name: "Question and answer" },
    { to: "/shopreview", Icon: HiSpeakerphone, name: "ShopReview" },
    { to: "/link", Icon: HiSpeakerphone, name: "Short link" },
    { to: "/todolist", Icon: HiSpeakerphone, name: "To-Do List" },
    { to: "/dating/rating", Icon: HiSpeakerphone, name: "Rating" },
    { to: "/schedule", Icon: HiSpeakerphone, name: "Schedule" },
]

const NavBar: FC<{ secondarynav?: secondaryNavProps[] }> = ({ secondarynav }) => {
    const isMobile = useBreakpointValue({ base: false, md: true }, { ssr: false })
    return <>{!isMobile ? <NavBarMobile secondarynav={secondarynav} /> : <NavBarDesktop secondarynav={secondarynav} />}</>
}

export default NavBar
