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
import { useNavigate, useParams } from "react-router-dom"

function Plustoggle() {
    let param = useParams()
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const [placement, setPlacement] = React.useState("bottom")
    const navigate = useNavigate()
    //function handle
    function Navigate() {
        return navigate(`/chat/${param.roomID}/property`)
    }

    return (
        <>
            <RadioGroup defaultValue={"bottom"} children={undefined}></RadioGroup>
            <Box marginLeft={5}>
                <FaPlus size={"20px"} cursor={"pointer"} onClick={onOpen} />
            </Box>
            <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody>
                        <Flex bg={"#FFF2E9"} justifyContent={"center"} gap={"25px"} h={"100px"} alignItems={"center"}>
                            <Button
                                borderRadius="md"
                                bg="peachpuff"
                                color="orange.700"
                                h={"80%"}
                                px={5}
                                _active={{ background: "transparent" }}
                                _hover={{ background: "transparent", transform: "scale(1.2)" }}
                            >
                                <MdFastfood size={"40px"} />
                            </Button>
                            <Button
                                borderRadius="md"
                                bg="peachpuff"
                                color="orange.700"
                                px={5}
                                h={"80%"}
                                _active={{ background: "transparent" }}
                                _hover={{ background: "transparent", transform: "scale(1.2)" }}
                            >
                                <MdAttachMoney size={"40px"} />
                            </Button>
                            <Button
                                borderRadius="md"
                                bg="peachpuff"
                                color="orange.700"
                                px={5}
                                h={"80%"}
                                _active={{ background: "transparent" }}
                                _hover={{ background: "transparent", transform: "scale(1.2)" }}
                            >
                                <HiOutlineMusicNote size={"40px"} />
                            </Button>
                            <Button
                                borderRadius="md"
                                bg="peachpuff"
                                color="orange.700"
                                px={5}
                                h={"80%"}
                                _active={{ background: "transparent" }}
                                _hover={{ background: "transparent", transform: "scale(1.2)" }}
                            >
                                <RiMenuFoldLine size={"40px"} onClick={Navigate} />
                            </Button>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Plustoggle
