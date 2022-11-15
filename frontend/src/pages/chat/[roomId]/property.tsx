import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Center,
    Container,
    Flex,
    HStack,
    Input,
    useDisclosure,
    VStack,
} from "@chakra-ui/react"
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
import propertyDetail from "./propertyEvent"

type room = { roomID: String; roomName: String; roomtype: "individual" | "group"; img: String }[]

function showProperty() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [eventNames, setEventName] = React.useState("")
    const [eventButtons, setEventButton] = React.useState("")

    let param = useParams()
    const navigate = useNavigate()

    function NavigateProfile() {
        return navigate(`/profile/${param.roomID}`)
        
    }

    const handleSizeClick = (event: any) => {
        setEventName(event.eventName)
        setEventButton(event.buttonValue)

        if (event.eventName === "View profile") {
            NavigateProfile()
        } else {
            onOpen()
        }
    }
    const eventsIndi = [
        { eventIcon: CgProfile, eventName: "View profile" },
        { eventIcon: MdOutlineDriveFileRenameOutline, eventName: "Set room name" , buttonValue : "Done"},
        { eventIcon: RiUserSettingsLine, eventName: "Set nickname" , buttonValue : "Done"},
        { eventIcon: MdPostAdd, eventName: "Add quote" , buttonValue : "Add"},
        { eventIcon: MdColorLens, eventName: "Change room color" , buttonValue : "Done"},
        { eventIcon: MdFlag, eventName: "Report" , buttonValue : "Verify and send"},
    ]
    const eventsGroup = [
        { eventIcon: FaUserFriends, eventName: "Member" , buttonValue : "Done"},
        { eventIcon: FaUserPlus, eventName: "Invite people" , buttonValue : "Invite"},
        { eventIcon: MdOutlineDriveFileRenameOutline, eventName: "Set room name" , buttonValue : "Done"},
        { eventIcon: AiFillPicture, eventName: "Set room profile" , buttonValue : "Done"},
        { eventIcon: MdPostAdd, eventName: "Add quote" , buttonValue : "Add"},
        { eventIcon: MdColorLens, eventName: "Change room color" , buttonValue : "Done"},
        { eventIcon: FaHome, eventName: "Create community" , buttonValue : "Create"},
        { eventIcon: MdFlag, eventName: "Report" , buttonValue : "Verify and send"},
        { eventIcon: FaDoorOpen, eventName: "Leave group" , buttonValue : "Leave"},
    ]
    return (
        <>
            <VStack spacing={8} alignItems={"flex-start"}>
                {eventsIndi.map((event) => (
                    <Button
                        onClick={() => handleSizeClick(event)}
                        leftIcon={<event.eventIcon />}
                        key={event.eventName}
                        variant="ghost"
                        size="lg"
                        iconSpacing={"5"}
                    >
                        {`${event.eventName}`}
                    </Button>
                ))}
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose} size={"lg"} isCentered>
                <ModalOverlay backdropFilter="blur(5px)" />
                <ModalContent>
                    <ModalHeader>
                        <Flex justifyContent={"center"}>
                            <Heading size="lg">{eventNames}</Heading>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{propertyDetail(eventNames)}</ModalBody>

                    <ModalFooter display={'flex'} justifyContent={'center'}>
                        <Button colorScheme="orange" onClick={onClose}>
                            {eventButtons}
                        </Button>
                        {/* <Button variant="ghost">Secondary Action</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function renderMember() {
    return <VStack></VStack>
}

const Property = () => {
    let param = useParams()

    const navigate = useNavigate()
    //function handle
    function Navigate() {
        return navigate(`/chat/${param.roomId}`)
        
    }

    return (
        <AppBody>
            <HStack align={"flex-start"} spacing={14}>
                <Clist />
                <VStack spacing={10}>
                    <HStack spacing={5}>
                        <Button aria-label="Back to chat room" size="md" leftIcon={<ArrowBackIcon />} onClick={Navigate}></Button>
                        <Heading size="lg">Chat properties</Heading>
                    </HStack>
                    <VStack pl={14} spacing={8} align="flex-start" fontSize="20">
                        {showProperty()}
                    </VStack>
                </VStack>
            </HStack>
        </AppBody>
    )
}
export default Property
