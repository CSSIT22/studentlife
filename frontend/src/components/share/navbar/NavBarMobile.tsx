import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    HStack,
    Input,
    SimpleGrid,
    useBreakpointValue,
    useDisclosure,
    VStack,
} from "@chakra-ui/react"
import { FC } from "react"

import { AiOutlineMail, AiFillBell, AiOutlineMenu } from "react-icons/ai"
import { Link, Navigate } from "react-router-dom"
import { secondaryNavProps } from "../app/AppBody"
import { NavBarMenu } from "./NavBar"
import NavBarMobileButton from "./NavBarMobileButton"
import NavBarMobileSubNav from "./NavBarMobileSubNav"
import NavBarWithNoti from "./NavBarWithNoti"
import logo from "./pic/logo.png"

const NavBarMobile: FC<{ secondarynav?: secondaryNavProps[] }> = ({ secondarynav }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>
                        <Accordion allowToggle>
                            {secondarynav &&
                                secondarynav.map(({ to, name, Icon, subNav }) => (
                                    <AccordionItem key={name}>
                                        <AccordionButton>
                                            {subNav ? (
                                                <NavBarMobileSubNav {...{ name, Icon }} />
                                            ) : (
                                                <Link to={to || ""} style={{ width: "100%" }}>
                                                    <NavBarMobileSubNav {...{ name, Icon }} />
                                                </Link>
                                            )}
                                            {subNav && <AccordionIcon />}
                                        </AccordionButton>
                                        {subNav && (
                                            <AccordionPanel>
                                                <VStack alignItems={"flex-start"} pl={3}>
                                                    {subNav?.map(({ to: tosub, name: namesub, Icon: IconSub }) => (
                                                        <Link to={tosub || ""} key={tosub} style={{ width: "100%" }}>
                                                            <Box _hover={{ bg: "gray.100" }} p={2} w="100%">
                                                                <NavBarMobileSubNav {...{ name: namesub, Icon: IconSub }} />
                                                            </Box>
                                                        </Link>
                                                    ))}
                                                </VStack>
                                            </AccordionPanel>
                                        )}
                                    </AccordionItem>
                                ))}
                        </Accordion>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <Box w="100%" bg="white" py={3} pos={"fixed"} shadow="md">
                <Container w="100%" maxW="container.md">
                    <HStack w="100%" justifyContent="space-between">
                        <HStack>
                            {secondarynav && (
                                <Button onClick={onOpen}>
                                    <AiOutlineMenu />
                                </Button>
                            )}
                            <img src={logo} style={{ width: "100px" }} />
                        </HStack>
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
                <SimpleGrid columns={5} px={5}>
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
