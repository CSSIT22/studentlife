import {
    Avatar,
    Box,
    Button,
    Container,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Portal,
    SimpleGrid,
    Stack,
} from "@chakra-ui/react"
import { IoMdArrowDropdown } from "react-icons/io"
import { CgMenuRound } from "react-icons/cg"
import { AiOutlineMail, AiFillBell } from "react-icons/ai"
import { BiLogOut } from "react-icons/bi"
import { FaHistory, FaUserAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import NavBarWithNoti from "./NavBarWithNoti"
import SecondaryNav from "./SecondaryNav"
import { logout, moreMenu, NavBarMenu } from "./NavBar"
import { FC, useContext } from "react"
import { secondaryNavProps } from "../app/AppBody"
import ExtarSecondaryNav from "./ExtarSecondaryNav"
import logo from "./pic/logo.png"
import { authContext } from "src/context/AuthContext"
import NotiTable from "src/components/notification/NotiTable"
import API from "src/function/API"
import { useNavigate } from "react-router-dom"

const NavBarDesktop: FC<{ secondarynav?: secondaryNavProps[] }> = ({ secondarynav: secondarynav }) => {
    const user = useContext(authContext)
    const navigate = useNavigate()
    return (
        <Box zIndex={"dropdown"} shadow={"md"} position="fixed" w="100%">
            <Box w="100%" bg="white" py={3}>
                <Container w="container.lg" maxW={"100%"}>
                    <Stack maxW="100%" direction={"row"} justifyContent="space-between">
                        {/* <Heading>Logo</Heading> */}
                        <img src={logo} style={{ width: "150px" }} />
                        <Stack gap={5} alignItems="center" direction="row">
                            <Link to="/chat">
                                <NavBarWithNoti label="Chat" notiCount={20} Icon={AiOutlineMail} />
                            </Link>
                            <Popover>
                                <PopoverTrigger>
                                    <Button variant={"unstyled"}>
                                        <NavBarWithNoti label="Notification" notiCount={1} Icon={AiFillBell} />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverBody>
                                        <NotiTable />
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
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
                                                <Avatar
                                                    size="sm"
                                                    src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + user?.userId}
                                                ></Avatar>
                                                <Heading size="sm">{user?.fName}</Heading>
                                                <Heading size="md" m={0} p={0} transform={`rotate(${isOpen ? "180" : "0"}deg)`} transition="0.5s">
                                                    <IoMdArrowDropdown />
                                                </Heading>
                                            </HStack>
                                        </MenuButton>
                                        <MenuList>
                                            <MenuGroup title="User">
                                                <Link to="/user">
                                                    <MenuItem icon={<FaUserAlt />}>Profile</MenuItem>
                                                </Link>
                                                <MenuItem as={Link} to={"/auth/revokeTokens"} icon={<FaHistory />}>
                                                    Login Activity
                                                </MenuItem>
                                            </MenuGroup>
                                            <MenuGroup title="Danger Area">
                                                <MenuItem onClick={logout} icon={<BiLogOut />}>
                                                    Logout
                                                </MenuItem>
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
                                        <Link to={to} key={to}>
                                            <HStack cursor="pointer" p={3} bg={"gray.100"} _hover={{ bg: "gray.200" }} rounded={"lg"}>
                                                <Heading fontWeight={"normal"} size="sm">
                                                    <Icon />
                                                </Heading>

                                                <Heading fontWeight={"normal"} size="md">
                                                    {name}
                                                </Heading>
                                            </HStack>
                                        </Link>
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
                        <HStack w="100%" justifyContent={"space-between"}>
                            <HStack>
                                {secondarynav
                                    .filter((item) => !item.isRight)
                                    .map((props) => (
                                        <ExtarSecondaryNav key={props.name} {...props} />
                                    ))}
                            </HStack>
                            <HStack>
                                {secondarynav
                                    .filter((item) => item.isRight)
                                    .map((props) => (
                                        <ExtarSecondaryNav key={props.name} {...props} />
                                    ))}
                            </HStack>
                        </HStack>
                    </Container>
                </Box>
            )}
        </Box>
    )
}

export default NavBarDesktop
