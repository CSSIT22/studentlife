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
    Hide,
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

import React, { useEffect } from "react"
import AppBody from "../../../components/share/app/AppBody"
import { useNavigate, useParams } from "react-router-dom"
import Clist from "src/components/chat/Chat-list"
import propertyDetail from "./propertyEvent"
import API from "src/function/API"
import { RoomType } from "../[roomID]"

function showProperty() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [eventNames, setEventName] = React.useState("")
    const [eventButtons, setEventButton] = React.useState("")
    const [Room, setRoom] = React.useState<RoomType>()
    const [userChatWith, setUserChatWith] = React.useState<any>([])
    
    let param = useParams()
    const navigate = useNavigate()

    function NavigateProfile() {
        return navigate(`/user/${userChatWith.anotherUserId}`)
    }

    useEffect(() => {
        API.get(`/chat/${param.roomId}`).then((e) => setRoom(e.data)
        )
        API.get(`/chat/${param.roomId}/getUserID`).then((e) => setUserChatWith(e.data)
        )
    }, [param])

    function renderRoomProp() {
        if (Room?.roomType === "INDIVIDUAL") {
            return (
                eventsIndi.map((event) => (
                    <Button
                        onClick={() => handleSizeClick(event)}
                        leftIcon={<event.eventIcon />}
                        key={event.eventName}
                        variant="ghost"
                        size="lg"
                        iconSpacing={"5"}
                        _hover={{ background: "transparent", transform: "scale(1.1)" }}
                        _active={{ background: "orange.200" }}
                    >
                        {`${event.eventName}`}
                    </Button>
                ))
            )
        }
        else if (Room?.roomType === "GROUP") {
            return (
                eventsGroup.map((event) => (
                    <Button
                        onClick={() => handleSizeClick(event)}
                        leftIcon={<event.eventIcon />}
                        key={event.eventName}
                        variant="unstyled"
                        size="lg"
                        iconSpacing={"5"}
                        _hover={{ background: "transparent", transform: "scale(1.1)" }}
                        _active={{ background: "transparent" }}
                    >
                        {`${event.eventName}`}
                    </Button>
                ))
            )
        }
    }

    useEffect(() => {
        API.get(`chat/${param.roomId}`).then((e) => setRoom(e.data))
    }, [param])

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
        { eventIcon: MdOutlineDriveFileRenameOutline, eventName: "Set room name"},
        { eventIcon: MdPostAdd, eventName: "Add quote", buttonValue : 'Done'},
        { eventIcon: MdColorLens, eventName: "Change room color" },
        { eventIcon: MdFlag, eventName: "Report"},
    ]
    const eventsGroup = [
        { eventIcon: FaUserFriends, eventName: "Member"},
        { eventIcon: FaUserPlus, eventName: "Invite people"},
        { eventIcon: MdOutlineDriveFileRenameOutline, eventName: "Set room name"},
        { eventIcon: MdPostAdd, eventName: "Add quote" , buttonValue : 'Done'},
        { eventIcon: MdColorLens, eventName: "Change room color" },
        { eventIcon: MdFlag, eventName: "Report" },
        { eventIcon: FaDoorOpen, eventName: "Leave group" },
    ]

    return (
        <>
            <VStack spacing={6} alignItems={"flex-start"}>
                {renderRoomProp()}
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose} size={{ md: 'lg' }} isCentered>
                <ModalOverlay backdropFilter="blur(5px)" />
                <ModalContent>
                    <ModalHeader>
                        <Flex justifyContent={"center"}>
                            <Heading size="lg">{eventNames}</Heading>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{propertyDetail(eventNames)}</ModalBody>
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
        return navigate(`/chat/${param.roomId}`)
    }

    return (
        <AppBody>
            <HStack align={"flex-start"} spacing={14}>
                <Hide below="md">
                    <Clist />
                </Hide>
                <VStack spacing={10} display={"flex"} justifyContent={"center"}>
                    <HStack spacing={5}>
                        <Button aria-label="Back to chat room" size="md" variant='unstyled' _hover={{ transform: "scale(1.5)" }} transitionDuration="300ms" onClick={Navigate}><ArrowBackIcon /></Button>
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
