import { Avatar, Box, Container, Heading, HStack, SimpleGrid, useBreakpointValue } from "@chakra-ui/react"

import { AiOutlineMail, AiFillBell } from "react-icons/ai"
import { Link, Navigate } from "react-router-dom"
import { NavBarMenu } from "./NavBar"
import NavBarWithNoti from "./NavBarWithNoti"

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
                            <Link to={to} key={to}>
                                <HStack
                                    py={3}
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
                            </Link>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>
        </>
    )
}

export default NavBarMobile
