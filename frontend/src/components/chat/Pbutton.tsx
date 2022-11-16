import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Radio,
    RadioGroup,
    Stack,
    useDisclosure,
} from "@chakra-ui/react"
import React from "react"
import { CgMenuRound } from "react-icons/cg"
import { FaPlus } from "react-icons/fa"
import { HiOutlineMusicNote } from "react-icons/hi"
import { MdAttachMoney, MdFastfood } from "react-icons/md"
import { RiMenuFoldLine } from "react-icons/ri"

function Plustoggle() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const [placement, setPlacement] = React.useState("bottom")

    return (
        <>
            <RadioGroup defaultValue={"bottom"} children={undefined}></RadioGroup>
            <FaPlus size={"20px"} cursor={"pointer"} onClick={onOpen}>
                Open
            </FaPlus>
            <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody>
                        <Flex bg={"#FFF2E9"} justifyContent={"center"} gap={"25px"}>
                            <Box
                                as="button"
                                borderRadius="md"
                                bg="peachpuff"
                                color="orange.700"
                                px={10}
                                h={"15vh"}
                                _active={{ background: "transparent" }}
                                _hover={{ background: "transparent", transform: "scale(1.5)" }}
                            >
                                <MdFastfood size={"40px"} />
                            </Box>
                            <Box
                                as="button"
                                borderRadius="md"
                                bg="peachpuff"
                                color="orange.700"
                                px={10}
                                h={"15vh"}
                                // _active={{ background: "transparent" }}
                                _hover={{ background: "transparent", transform: "scale(1.5)" }}
                            >
                                <MdAttachMoney size={"40px"} />
                            </Box>
                            <Box
                                as="button"
                                borderRadius="md"
                                bg="peachpuff"
                                color="orange.700"
                                px={10}
                                h={"15vh"}
                                // _active={{ background: "transparent" }}
                                _hover={{ background: "transparent", transform: "scale(1.5)" }}
                            >
                                <HiOutlineMusicNote size={"40px"} />
                            </Box>
                            <Box
                                as="button"
                                borderRadius="md"
                                bg="peachpuff"
                                color="orange.700"
                                px={10}
                                h={"15vh"}
                                // _active={{ background: "transparent" }}
                                _hover={{ background: "transparent", transform: "scale(1.5)" }}
                            >
                                <RiMenuFoldLine size={"40px"} />
                            </Box>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Plustoggle
