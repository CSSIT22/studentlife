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
import {BiGroup} from "react-icons/bi"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import GroupFrom from "./groupform"

function Plustoggle() {
    let param = useParams()
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const [placement, setPlacement] = React.useState("bottom")
    const navigate = useNavigate()
    //function handle
    function Navigate() {
        return navigate(`/chat/${param.roomID}/property`)
    }
    //pop up

    // function GroupFrom() {
    //     const { isOpen, onOpen, onClose } = useDisclosure()
    //     return (
    //       <>
    //         <Button onClick={onOpen}>Open Modal</Button>
    
    //         <Modal isOpen={isOpen} onClose={onClose}>
    //           <ModalOverlay />
    //           <ModalContent>
    //             <ModalHeader>Modal Title</ModalHeader>
    //             <ModalCloseButton />
    //             <ModalBody>
    //               Test
    //             </ModalBody>
      
    //             <ModalFooter>
    //               <Button colorScheme='blue' mr={3} onClick={onClose}>
    //                 Close
    //               </Button>
    //               <Button variant='ghost'>Secondary Action</Button>
    //             </ModalFooter>
    //           </ModalContent>
    //         </Modal>
    //       </>
    //     )
    //   }

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
                            <GroupFrom />
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
