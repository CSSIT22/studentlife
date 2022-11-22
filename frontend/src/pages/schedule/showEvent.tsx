import React from 'react'
import AppBody from 'src/components/share/app/AppBody'
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box, SimpleGrid } from "@chakra-ui/react"
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, useDisclosure, Text, Flex, Select, Switch, Input, Textarea } from "@chakra-ui/react"
import { Grid, GridItem } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
  } from '@chakra-ui/react'

const showEvent = () => {
    const modal2 = useDisclosure()
    const modal3 = useDisclosure()
    const navigate =  useNavigate()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    
  return (
    <AppBody>
        <IconButton aria-label="previous" icon={<ChevronLeftIcon />} onClick={() => navigate("/schedule/timetable/")} w="60px" h="62px" borderRightRadius="55" borderLeftRadius="55" />
        <br />
            <Box boxShadow="md" p="6" rounded="md" bg="white" >
                <Text textAlign={["center"]} fontSize="5xl"> 
                Assignment
                </Text> 
            </Box>
            <br />
            <Box boxShadow="md" p="6" rounded="md" bg="white" >
                <Text textAlign={["center"]} fontSize="md"> 
                Do Tower of Hanoi p.405 - 409
                </Text> 
            </Box><br />
            <SimpleGrid columns={[1, 3]} spacing="30px">
            <Box boxShadow="md" p="6" rounded="md" bg="white" >
                <Text textAlign={["center"]} fontSize="2xl"> 
                06:00-06:30 AM
                </Text> 
            </Box>
            <Box boxShadow="md" p="6" rounded="md" bg="white" >
                <Text textAlign={["center"]} fontSize="2xl"> 
                Assignment
                </Text> 
            </Box>
            <Box boxShadow="md" p="6" rounded="md" bg="white" >
                <Text textAlign={["center"]} fontSize="2xl"> 
                MS Team
                </Text> 
            </Box>
            </SimpleGrid>
            <br />
<Button id="editEvent" onClick={modal2.onOpen} bg="gray" colorScheme="white">
                Edit
            </Button>
            <Modal id="editEvent" isOpen={modal2.isOpen} onClose={modal2.onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color="black">
                        <Text fontSize="3xl">Edit Event</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel color="black">
                                <Text fontSize="24px">Event name</Text>
                            </FormLabel>
                            <Input ref={initialRef} placeholder="Meeting with PM" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel color="black">
                                <Text fontSize="24px">Description</Text>
                            </FormLabel>
                            <Textarea placeholder="Detail about event" size="md" />
                        </FormControl>

                        <Flex>
                            <FormControl mt={4}>
                                <FormLabel color="black">
                                    <Text fontSize="24px">Start Time</Text>
                                </FormLabel>
                                <Input placeholder="Select time" size="xs" type="time" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel color="black">
                                    <Text fontSize="24px">End Time</Text>
                                </FormLabel>
                                <Input placeholder="Select time" size="xs" type="time" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel color="black">
                                    <Text fontSize="24px">Event Type</Text>
                                </FormLabel>
                                <Select placeholder="Select Event Type" width="151px" height="32px">
                                    <option>Course</option>
                                    <option>Assignment</option>
                                    <option>Activity</option>
                                </Select>
                            </FormControl>
                        </Flex>
                        <FormControl mt={4}>
                            <FormLabel color="black">Location</FormLabel>
                            <Input placeholder="Place/ Platform" />
                        </FormControl>

                        <FormControl display="flex" alignItems="center">
                            <Switch id="notification" size="lg" mt={4} />
                            <FormLabel htmlFor="notification" mb="0" color="#5A5A5A" mt={4}>
                                Notification
                            </FormLabel>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" width="239px" height="40px" bg="#E1AB20">
                            Edit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* this part is for delete modal */}
            <Button id="deleteEvent" onClick={modal3.onOpen} bg="red" colorScheme="white">
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

                        <Button variant="ghost" bg="#38A169">
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