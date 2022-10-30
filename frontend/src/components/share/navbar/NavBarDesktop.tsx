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

const NavBarDesktop = () => {
    return (
        <Box shadow={"md"} position="fixed" w="100%">
            <Box w="100%" bg="white" py={3}>
                <Container w="container.lg" maxW={"100%"}>
                    <Stack maxW="100%" direction={"row"} justifyContent="space-between">
                        <Heading>Logo</Heading>
                        <Stack gap={5} alignItems="center" direction="row">
                            <Link to="/chat">
                                <NavBarWithNoti label="Chat" notiCount={20} Icon={AiOutlineMail} />
                            </Link>
                            <Link to="/notification">
                                <NavBarWithNoti label="Notification" notiCount={1} Icon={AiFillBell} />
                            </Link>
                            <Menu>
                                {({ isOpen }) => (
                                    <>
                                        <MenuButton>
                                            <HStack
                                                p={3}
                                                px={5}
                                                bg={isOpen ? "orange.200" : "orange.100"}
                                                rounded={"full"}
                                                cursor="pointer"
                                                transition="0.5s"
                                            >
                                                <Avatar size="sm"></Avatar>
                                                <Heading size="sm">@CS22</Heading>
                                                <Heading size="md" m={0} p={0} transform={`rotate(${isOpen ? "180" : "0"}deg)`} transition="0.5s">
                                                    <IoMdArrowDropdown />
                                                </Heading>
                                            </HStack>
                                        </MenuButton>
                                        <MenuList>
                                            <MenuGroup title="User">
                                                <MenuItem icon={<FaUserAlt />}>Profile</MenuItem>
                                                <MenuItem icon={<FaHistory />}>Login Activity</MenuItem>
                                            </MenuGroup>
                                            <MenuGroup title="Danger Area">
                                                <MenuItem icon={<BiLogOut />}>Logout</MenuItem>
                                            </MenuGroup>
                                        </MenuList>
                                    </>
                                )}
                            </Menu>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Box w="100%" py={2} bg="gray.100">
                <Container w="container.lg" maxW={"100%"}>
                    <Stack direction={"row"} justifyContent="space-between">
                        <Stack direction={"row"} gap={5}>
                            {NavBarMenu.map((props) => (
                                <SecondaryNav key={props.to} {...props} />
                            ))}
                        </Stack>
                        <Menu>
                            <MenuButton>
                                <HStack cursor={"pointer"}>
                                    <Heading size="md">
                                        <CgMenuRound />
                                    </Heading>
                                    <Heading size="md">Menu</Heading>
                                </HStack>
                            </MenuButton>
                            <MenuList w="700">
                                <SimpleGrid columns={3} gap={5} p={5}>
                                    {moreMenu.map(({ to, name, Icon }) => (
                                        <HStack
                                            key={to}
                                            cursor="pointer"
                                            p={5}
                                            py={8}
                                            bgGradient="linear(to-b,purple.100,purple.300)"
                                            rounded={"3xl"}
                                        >
                                            <Heading size="md">
                                                <Icon />
                                            </Heading>

                                            <Heading size="md">{name}</Heading>
                                        </HStack>
                                    ))}
                                </SimpleGrid>
                            </MenuList>
                        </Menu>
                    </Stack>
                </Container>
            </Box>
        </Box>
    )
}

export default NavBarDesktop
