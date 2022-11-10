import { Box, Button, Container, Flex, HStack, useDisclosure, VStack } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

import { ArrowBackIcon } from "@chakra-ui/icons"
import { CgProfile } from "react-icons/cg"
import { MdOutlineDriveFileRenameOutline, MdPostAdd, MdColorLens, MdFlag } from "react-icons/md"
import { RiUserSettingsLine } from "react-icons/ri"
import { FaUserFriends, FaUserPlus, FaHome, FaDoorOpen } from "react-icons/fa"
import { AiFillPicture } from "react-icons/ai"

import React from "react"
import AppBody from "../../../components/share/app/AppBody"
import { useNavigate, useParams } from "react-router-dom"
import Clist from "src/components/chat/Chat-list"

type room = { roomID: String; roomName: String; roomtype: "individual" | "group"; img: String }[]

function showModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Test Test Test</ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const Property = () => {
    let param = useParams()

    const navigate = useNavigate()
    //function handle
    function Navigate() {
        return navigate(`/chat/${param.roomID}`)
    }

    return (
        <AppBody>
            <Flex>
                <Clist />
                <HStack spacing={5}>
                    <Button aria-label="Back to chat room" size="md" leftIcon={<ArrowBackIcon />} onClick={Navigate}></Button>
                    <Heading size="lg">Chat properties</Heading>
                </HStack>
                <VStack marginLeft={12} marginTop={10} spacing={8} align="flex-start" fontSize="20">
                    <Button leftIcon={<CgProfile />} variant="ghost" size="lg">
                        View Profile
                    </Button>
                    <Button leftIcon={<MdOutlineDriveFileRenameOutline />} variant="ghost" size="lg">
                        Set room name
                    </Button>
                    <Button leftIcon={<RiUserSettingsLine />} variant="ghost" size="lg">
                        Set nickname
                    </Button>
                    <Button leftIcon={<MdPostAdd />} variant="ghost" size="lg">
                        Add quote
                    </Button>
                    <Button leftIcon={<MdColorLens />} variant="ghost" size="lg">
                        Change room color
                    </Button>
                    <Button leftIcon={<MdFlag />} variant="ghost" size="lg">
                        Report user
                    </Button>
                    {/* Group */}
                    <Button leftIcon={<FaUserFriends />} variant="ghost" size="lg">
                        Member
                    </Button>
                    <Button leftIcon={<FaUserPlus />} variant="ghost" size="lg">
                        Invite people
                    </Button>
                    <Button leftIcon={<AiFillPicture />} variant="ghost" size="lg">
                        Set room profile
                    </Button>
                    <Button leftIcon={<FaHome />} variant="ghost" size="lg">
                        Create community
                    </Button>
                    <Button leftIcon={<FaDoorOpen />} variant="ghost" size="lg">
                        Leave group
                    </Button>
                    <Button>{showModal()}</Button>
                </VStack>
            </Flex>
        </AppBody>
    )
}
export default Property
