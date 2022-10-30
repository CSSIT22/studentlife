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

const NavBarMobile = () => {
    return (
        <>
            <Box w="100%" bg="white" py={3} pos={"fixed"} shadow="md">
                <Container w="100%" maxW="container.md">
                    <HStack w="100%" justifyContent="space-between">
                        <Heading>Logo</Heading>
                        <HStack gap={5}>
                            <Link to="/chat">
                                <NavBarWithNoti label="Chat" notiCount={20} Icon={AiOutlineMail} />
                            </Link>
                            <Link to="/notification">
                                <NavBarWithNoti label="Notification" notiCount={1} Icon={AiFillBell} />
                            </Link>
                        </HStack>
                    </HStack>
                </Container>
            </Box>

            <Box w="100%" bg="white" pos={"fixed"} bottom={0} shadow="md">
                <Container w="100%" maxW="container.md">
                    <SimpleGrid columns={5}>
                        {[...NavBarMenu, { to: "/more", Icon: Avatar, name: "More" }].map(({ Icon, to }) => (
                            <HStack
                                py={3}
                                key={to}
                                _hover={{ bg: "orange.300", color: "white" }}
                                transition="0.2s"
                                cursor="pointer"
                                justifyContent="center"
                                alignItems={"center"}
                            >
                                {to !== "/more" ? (
                                    <Heading>
                                        <Icon />
                                    </Heading>
                                ) : (
                                    <Icon size="sm" />
                                )}
                            </HStack>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>
        </>
    )
}

export default NavBarMobile
