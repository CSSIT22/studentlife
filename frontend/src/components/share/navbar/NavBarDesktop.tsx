import { Avatar, Box, Container, Heading, HStack, Menu, MenuButton, MenuGroup, MenuItem, MenuList, SimpleGrid, Stack } from "@chakra-ui/react"
import { IoMdArrowDropdown } from "react-icons/io"
import { CgMenuRound } from "react-icons/cg"
import { AiOutlineMail, AiFillBell } from "react-icons/ai"
import { BiLogOut } from "react-icons/bi"
import { FaHistory, FaUserAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import NavBarWithNoti from "./NavBarWithNoti"
import SecondaryNav from "./SecondaryNav"
import { moreMenu, NavBarMenu } from "./NavBar"
import { FC } from "react"
import { secondaryNavProps } from "../app/AppBody"
import ExtarSecondaryNav from "./ExtarSecondaryNav"
import logo from "./pic/logo.png"

const NavBarDesktop: FC<{ secondarynav?: secondaryNavProps[] }> = ({ secondarynav: secondarynav }) => {
    return (
        <Box shadow={"md"} position="fixed" w="100%">
            <Box w="100%" bg="white" py={3}>
                <Container w="container.lg" maxW={"100%"}>
                    <Stack maxW="100%" direction={"row"} justifyContent="space-between">
                        {/* <Heading>Logo</Heading> */}
                        <img src={logo} style={{ width: "150px" }} />
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
                                                p={2}
                                                px={3}
                                                // bg={isOpen ? "orange.200" : "orange.300"}
                                                bgGradient="linear(to-b,orange.100,orange.300)"
                                                rounded={"2xl"}
                                                color="white"
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
            <Box w="100%" py={2} bg="white">
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
                                    <Heading fontWeight={"normal"} size="md">
                                        Menu
                                    </Heading>
                                </HStack>
                            </MenuButton>
                            <MenuList w="700">
                                <SimpleGrid columns={2} gap={2} p={5}>
                                    {moreMenu.map(({ to, name, Icon }) => (
                                        <HStack key={to} cursor="pointer" p={3} bg={"gray.100"} _hover={{ bg: "gray.200" }} rounded={"lg"}>
                                            <Heading fontWeight={"normal"} size="sm">
                                                <Icon />
                                            </Heading>

                                            <Heading fontWeight={"normal"} size="md">
                                                {name}
                                            </Heading>
                                        </HStack>
                                    ))}
                                </SimpleGrid>
                            </MenuList>
                        </Menu>
                    </Stack>
                </Container>
            </Box>
            {secondarynav && (
                <Box w="100%" bg="orange.300">
                    <Container w="container.lg" maxW={"100%"}>
                        <HStack>
                            {secondarynav.map((props) => (
                                <ExtarSecondaryNav key={props.name} {...props} />
                            ))}
                        </HStack>
                    </Container>
                </Box>
            )}
        </Box>
    )
}

export default NavBarDesktop
