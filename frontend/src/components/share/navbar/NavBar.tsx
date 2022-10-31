import { useBreakpointValue } from "@chakra-ui/react"
import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai"
import { HiSpeakerphone } from "react-icons/hi"
import { BiGroup } from "react-icons/bi"
import { BsPatchQuestion } from "react-icons/bs"
import NavBarDesktop from "./NavBarDesktop"
import NavBarMobile from "./NavBarMobile"
import { FC } from "react"
import { secondaryNavProps } from "../app/AppBody"

export const NavBarMenu = [
    { to: "/", Icon: AiOutlineHome, name: "Home" },
    { to: "/dating", Icon: AiOutlineHeart, name: "Dating" },
    { to: "/qa", Icon: BsPatchQuestion, name: "Q&A" },
    { to: "/groups", Icon: BiGroup, name: "Communities" },
]

export const moreMenu = [
    { to: "/announcement", Icon: HiSpeakerphone, name: "Announcement" },
    { to: "/airdrop", Icon: HiSpeakerphone, name: "Airdrop" },
    { to: "/shop", Icon: HiSpeakerphone, name: "Shop" },
    { to: "/restaurant", Icon: HiSpeakerphone, name: "Restaurant" },
    { to: "/shopreview", Icon: HiSpeakerphone, name: "ShopReview" },
]

const NavBar: FC<{ secondarynav?: secondaryNavProps[] }> = ({ secondarynav }) => {
    const isMobile = useBreakpointValue({ base: false, md: true }, { ssr: false })
    return <>{!isMobile ? <NavBarMobile secondarynav={secondarynav} /> : <NavBarDesktop secondarynav={secondarynav} />}</>
}

export default NavBar
