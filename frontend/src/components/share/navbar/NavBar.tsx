import { useBreakpointValue } from "@chakra-ui/react"
import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai"
import { HiOutlineUserGroup, HiSpeakerphone } from "react-icons/hi"
import { BsPatchQuestion } from "react-icons/bs"
import NavBarDesktop from "./NavBarDesktop"
import NavBarMobile from "./NavBarMobile"
import { FC } from "react"
import { secondaryNavProps } from "../app/AppBody"

export const NavBarMenu = [
    { to: "/", Icon: AiOutlineHome, name: "Home" },
    { to: "/dating", Icon: AiOutlineHeart, name: "Dating" },
    { to: "/qa", Icon: BsPatchQuestion, name: "Q&A" },
    { to: "/groups", Icon: HiOutlineUserGroup, name: "Communities" },
]

export const moreMenu = [
    { to: "/announcement", Icon: HiSpeakerphone, name: "Announcement" },
    { to: "/airdrop", Icon: BsFillCloudArrowUpFill, name: "Airdrop" },
    { to: "/shortlink-feature", Icon: AiOutlineLink, name: "link-feature" },
    { to: "/shop", Icon: AiTwotoneShop, name: "Shop" },
    { to: "/restaurant", Icon: IoFastFoodSharp, name: "Restaurant" },
    { to: "/shopreview", Icon: MdReviews, name: "ShopReview" },
]

const NavBar: FC<{ secondarynav?: secondaryNavProps[] }> = ({ secondarynav }) => {
    const isMobile = useBreakpointValue({ base: false, md: true }, { ssr: false })
    return <>{!isMobile ? <NavBarMobile secondarynav={secondarynav} /> : <NavBarDesktop secondarynav={secondarynav} />}</>
}

export default NavBar
