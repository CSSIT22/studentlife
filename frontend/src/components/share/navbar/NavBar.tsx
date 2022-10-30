import {
    Avatar,
    Box,
    Container,
    Flex,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    SimpleGrid,
    Stack,
    Text,
    Tooltip,
    useBreakpoint,
    useBreakpointValue,
} from "@chakra-ui/react"
import React from "react"
import { IoMdArrowDropdown } from "react-icons/io"
import { CgMenuRound } from "react-icons/cg"
import { AiOutlineMail, AiFillBell, AiOutlineHome, AiOutlineHeart } from "react-icons/ai"
import { HiSpeakerphone } from "react-icons/hi"
import { BiGroup, BiLogOut } from "react-icons/bi"
import { FaHistory, FaUserAlt } from "react-icons/fa"
import { BsPatchQuestion } from "react-icons/bs"
import { Link, NavLink } from "react-router-dom"
import NavBarWithNoti from "./NavBarWithNoti"
import SecondaryNav from "./SecondaryNav"
import NavBarDesktop from "./NavBarDesktop"
import NavBarMobile from "./NavBarMobile"

const NavBarMenu = [
    { to: "/", Icon: AiOutlineHome, name: "Home" },
    { to: "/dating", Icon: AiOutlineHeart, name: "Dating" },
    { to: "/qa", Icon: BsPatchQuestion, name: "Q&A" },
    { to: "/groups", Icon: BiGroup, name: "Communities" },
]

const moreMenu = [
    { to: "/announcement", Icon: HiSpeakerphone, name: "Announcement" },
    { to: "/airdrop", Icon: HiSpeakerphone, name: "Airdrop" },
    { to: "/shop", Icon: HiSpeakerphone, name: "Shop" },
    { to: "/restaurant", Icon: HiSpeakerphone, name: "Restaurant" },
    { to: "/shopreview", Icon: HiSpeakerphone, name: "ShopReview" },
]

const NavBar = () => {
    const isMobile = useBreakpointValue({ base: true, md: false })
    return <>{isMobile ? <NavBarMobile /> : <NavBarDesktop />}</>
}

export default NavBar
