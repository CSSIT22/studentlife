import { Avatar, Box, Container, Heading, HStack, SimpleGrid, useBreakpointValue } from "@chakra-ui/react"

import { AiOutlineMail, AiFillBell } from "react-icons/ai"
import { Link, Navigate } from "react-router-dom"
import { NavBarMenu } from "./NavBar"
import NavBarMobileButton from "./NavBarMobileButton"
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
                <SimpleGrid columns={5}>
                    {[...NavBarMenu, { to: "/more", Icon: Avatar, name: "More" }].map(({ Icon, to }) => (
                        <Link to={to} key={to}>
                            <NavBarMobileButton {...{ Icon, to }} />
                        </Link>
                    ))}
                </SimpleGrid>
            </Box>
        </>
    )
}

export default NavBarMobile
