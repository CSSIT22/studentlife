import React, { useEffect, useState } from 'react'
import AppBody from 'src/components/share/app/AppBody'
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box, SimpleGrid, Heading, useToast } from "@chakra-ui/react"
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, useDisclosure, Text, Flex, Select, Switch, Input, Textarea } from "@chakra-ui/react"
import { Grid, GridItem } from '@chakra-ui/react'
import { useNavigate, useParams } from "react-router-dom";
import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
} from '@chakra-ui/react'
import API from 'src/function/API'
import EditEventModal from 'src/components/schedule/model/editEventModal'
import { user } from 'src/components/transaction/shared/testuser'


const showEvent = () => {
    const modal2 = useDisclosure()
    const modal3 = useDisclosure()
    const navigate = useNavigate()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const param = useParams()
    const [event, setEvent] = useState<any>({})

    // useEffect(() => {
    //     API.get("/schedule/getNewEvent"+ param.eventId)
    //     .then((item) => setEvent(item.data))
    // },[])

    const getEvent = API.get("/schedule/getNewEvent/" + param.eventId)
    useEffect(() => {

        console.log(param);

        getEvent.then((res) => {
            setEvent(res.data)
            console.log(res.data)
        })
    }, [])

    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()

    const deleteEvent = (eventId: string) => {
        API.post("/schedule/deleteEvent", { eventId: eventId }).then((res) => {
            console.log(res.data);
        }).then(() => {
            navigate({
                pathname: "/schedule"
            })
        })
    }
   
    return (
        <AppBody>

            <IconButton aria-label="previous"
                icon={<ChevronLeftIcon />}
                onClick={() => navigate("/schedule/")}
                w="60px" h="62px"
                borderRightRadius="55"
                borderLeftRadius="55" />
            <br />
            <Box boxShadow="md" p="6" rounded="md" bg="white" mt={"6"} >
                <Text textAlign={["center"]} fontSize="5xl" color={"#000000"} >
                    {event.eventName}
                </Text>
            </Box>
            <br />
            <Box boxShadow="md" p="6" rounded="md" bg="white" w={"980px"} h={"152px"}>
                <Text textAlign={["left"]} color="#858585"> Description </Text>
                <Text textAlign={["center"]} fontSize="2xl" color={"#000000"}>
                    {event.desc}
                </Text>

            </Box><br />
            <SimpleGrid columns={[1, 3]} spacing="30px">
                <Box boxShadow="md" p="6" rounded="md" bg="white" w={"283px"} h={"102px"}>
                    <Text textAlign={["left"]} color="#858585"> Time </Text>
                    <Text textAlign={["center"]} fontSize="xl" color={"#000000"}>
                        { new Date(event.stTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}

                    </Text>
                </Box>
                <Box boxShadow="md" p="6" rounded="md" bg="white" w={"283px"} h={"102px"}>
                    <Text textAlign={["left"]} color="#858585"> Type </Text>
                    <Text textAlign={["center"]} fontSize="2xl" color={"#000000"}>
                        {event.eventTypeId}
                    </Text>
                </Box>
                <Box boxShadow="md" p="6" rounded="md" bg="white" w={"283px"} h={"102px"}>
                    <Text textAlign={["left"]} color="#858585"> Location </Text>
                    <Text textAlign={["center"]} fontSize="2xl" color={"#000000"}>
                        {event.placeId}
                    </Text>
                </Box>
            </SimpleGrid>
            <br />
            <Button id="editEvent"
                onClick={modal2.onOpen}
                bg="gray"
                colorScheme="white"
                ml={"825"}
                bgColor="#E1AB20">
                Edit
            </Button>
            <EditEventModal {...{ modal2 }} />
            {/* this part is for delete modal */}
            <Button id="deleteEvent" onClick={modal3.onOpen} bgColor="#D92445" colorScheme="white" ml={"25"}>
                Delete
            </Button>

            <Modal id="deleteEvent" isOpen={modal3.isOpen} onClose={modal3.onClose} size="sm">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color="#E53E3E">
                        <Text textAlign={["center"]} fontSize="5xl">
                            Delete Event
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text textAlign={["center"]} fontSize="sm">
                            Are you sure you would like to delete this event?
                        </Text>
                        <Text textAlign={["center"]} fontSize="sm">
                            You might not be able to recover it back.
                        </Text>
                    </ModalBody>

                    <ModalFooter>

                    <Button variant="ghost" bg="#38A169" onClick={() => {
                            onDeleteClose()
                            deleteEvent(event.eventId)
                            // toast({
                            //     title: 'Event Deleted.',
                            //     desciption: "Event " + event.eventId + " deleted successfully",
                            //     status: 'success',
                            //     duration: 9000,
                            //     isClosable: true,
                            // })
                        }}>
                            <Text color="white">Yes</Text>
                        </Button>
                        <Button bg="#E53E3E" mr={3} onClick={modal3.onClose}>
                            <Text color="white">No</Text>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </AppBody>
    )
}

export default showEvent
