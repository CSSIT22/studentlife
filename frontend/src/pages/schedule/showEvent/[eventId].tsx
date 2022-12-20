import React, { useEffect, useState } from 'react'
import AppBody from 'src/components/share/app/AppBody'
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box, SimpleGrid, Heading, useToast, useBoolean, useBreakpointValue, Spinner } from "@chakra-ui/react"
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
import { AiOutlineClockCircle } from 'react-icons/ai'


const showEvent = () => {
    const modal2 = useDisclosure()
    const modal3 = useDisclosure()
    const navigate = useNavigate()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const param = useParams()
    const [event, setEvent] = useState<any>({})
    const [isLoading, setLoading] = useState(true);
    const isMobile = useBreakpointValue({
        base: true,
        md: false,
    })
    const addHours = (date: Date): Date => {
        const result = new Date(date);
        result.setHours(result.getHours() - 7);
        return result;
    };
    // useEffect(() => {
    //     API.get("/schedule/getNewEvent"+ param.eventId)
    //     .then((item) => setEvent(item.data))
    // },[])
    const [isError, { on }] = useBoolean()
    useEffect(() => {
        console.log(param);
        API.get("/schedule/getNewEvent/" + param.eventId).then((res) => {
            setEvent(res.data)
        })
            .catch((err) => {
                on()
            }).finally(() => {
                setLoading(false)
            })
    }, [])
    // if(isError) return <AppBody><Heading> Event does not exist</Heading></AppBody>

    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()

    const deleteEvent = (eventId: string) => {
        API.post("/schedule/deleteEvent", { eventId: eventId }).then((res) => {
            console.log(res.data);
        }).then(() => {
            navigate("/schedule")
        })
    }


    if (isLoading) {
        return (
            <AppBody><Spinner /></AppBody>
        )
    }

    if (isError) {
        return (
            <AppBody>Error!!!</AppBody>
        )
    }

    return (
        <AppBody>
            <Box display="flex" alignItems={"center"} >
                <IconButton aria-label="previous"
                    icon={<ChevronLeftIcon />}
                    onClick={() => navigate("/schedule/")
                    }
                    w="60px" h="62px"
                    borderRightRadius="55"
                    borderLeftRadius="55" mt="3"

                    bgColor="white"
                    shadow="xl" />
                <br />
                <Heading ml="2" color="black"> Your Event</Heading>
                <Box ml="2"><AiOutlineClockCircle size={30} color="black" /> </Box>
            </Box>

            <Box boxShadow="md" pt="3" pl="6" pb="3" rounded="md" bg="white" mt={"6"} w={{ md: "983px" }}>
                <Text fontWeight="bold" textAlign={["center"]} fontSize={{ md: "5xl", base: "2xl" }} color={"#000000"} >
                    {event.eventName}
                </Text>
            </Box>
            <br />
            <Box boxShadow="md" pt="3" pl="6" pb="3" rounded="md" bg="white" w={{ md: "983px" }} >
                <Text textAlign={["left"]} color="#858585" mb="5px"> Description: </Text>
                <Text textAlign={["left"]} fontSize="2xl" color={"#000000"}>
                    {event.desc}
                </Text>

            </Box><br />
            <SimpleGrid columns={[1, 3]} spacing={{ base: "25px", md: "60px" }}>
                <Box boxShadow="md" pt="3" pl="6" pb="3" rounded="md" bg="white" w={{ md: "283px" }} h={{ md: "102px" }}>
                    <Text textAlign={["left"]} color="#858585" mb="5px"> Time: </Text>
                    <Text textAlign={["left"]} fontSize="xl" color={"#000000"}>
                        {new Date(event.stTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}

                    </Text>
                </Box>
                <Box boxShadow="md" pt="3" pl="6" pb="3" rounded="md" bg="white" w={{ md: "283px" }} h={{ md: "102px" }}>
                    <Text textAlign={["left"]} color="#858585" mb="5px"> Type: </Text>
                    <Text textAlign={["left"]} fontSize="2xl" color={"#000000"} >
                        {event.eventTypeId}
                    </Text>
                </Box>
                <Box boxShadow="md" pt="3" pl="6" pb="3" rounded="md" bg="white" w={{ md: "283px" }} h={{ md: "102px" }}>
                    <Text textAlign={["left"]} color="#858585" mb="5px"> Location: </Text>
                    <Text textAlign={["left"]} fontSize="2xl" color={"#000000"}>
                        {event.place}
                    </Text>
                </Box>
            </SimpleGrid>
            <Flex justifyContent="center" gap="8" mt="6" ml={{ base: "30", md: "1" }}>
                <Button id="editEvent"
                    onClick={modal2.onOpen}
                    bg="gray"
                    colorScheme="white"

                    bgColor="#E1AB20">
                    Edit
                </Button>
                <EditEventModal {...{ modal2 }} eventId={param.eventId} />
                {/* this part is for delete modal */}
                <Button id="deleteEvent" onClick={modal3.onOpen} bgColor="#D92445" colorScheme="white" >
                    Delete
                </Button>

                <Modal isCentered id="deleteEvent" isOpen={modal3.isOpen} onClose={modal3.onClose} size="sm" >
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
                            <Flex justifyContent="center" gap="8" mt="5">
                                <Button variant="ghost" bg="#38A169" onClick={() => {
                                    onDeleteClose()
                                    deleteEvent(event.eventId)

                                }}>
                                    <Text color="white">Yes</Text>
                                </Button>


                                <Button bg="#E53E3E" pl="3" onClick={modal3.onClose}>
                                    <Text color="white" textAlign="center">No</Text>
                                </Button></Flex>
                        </ModalBody>

                        <ModalFooter>


                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>

        </AppBody>
    )
}

export default showEvent
