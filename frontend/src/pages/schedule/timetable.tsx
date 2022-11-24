import React from "react"
import AppBody from "../../components/share/app/AppBody"
import calendar from "../../components/schedule/calendar"
import Calendar from 'react-calendar';
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react"
import { Input, Switch, Flex, Spacer, Grid, GridItem, Select, Text } from "@chakra-ui/react"
import { Box, extendTheme, Heading, SimpleGrid, Textarea } from "@chakra-ui/react"
import { IconButton, useDisclosure, Button, ButtonGroup, Divider } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
// import { DESCRIPTION } from "src/components/notification/main/data/descTest"


const theme = extendTheme({
    radii: {
        none: "0",
        sm: "0.125rem",
        base: "14px",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
    },
    component: {
        Modal: {
            size: {
                xl: {
                    h: "689px",
                    w: "824px",
                },
            },
        },
    },
    colors: {
        brand: {
            "200": "#9AE6B4",
        },
    },
})

const timetable = () => {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const modal1 = useDisclosure()
    const modal2 = useDisclosure()
    const modal3 = useDisclosure()
    const calendarModal = useDisclosure()
    const detailModal = useDisclosure()
    const navigate = useNavigate()
    const [event, setEvent] = useState("")
    const handleInputEventChange = (e: any) => setEvent(e.target.value)

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [name, setNameInput] = useState("")
    const handleInputNameChange = (e: any) => setNameInput(e.target.value)

    const [description, setDescriptionInput] = useState("")
    const handleInputDescriptionChange = (e: any) => setDescriptionInput(e.target.value)

    const [location, setLocationInput] = useState("")
    const handleInputLocationChange = (e: any) => setLocationInput(e.target.value)

    const [time, setTimeInput] = useState("")
    const handleInputTimeChange = (e: any) => setTimeInput(e.target.value)
    const [dateSelect, setDateInput] = useState(new Date())
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const dateButton = document.getElementById('my-element')

    function handleTime() {
        const starttime = new Date(time)
        return starttime
    }
    function handleSubmit() {
        console.log("Name: " + name + " Description: " + description + " Location: " + location + " Time: " + handleTime())
    }
    function selectDate() {
        dateSelect
        console.log("Date: " + dateSelect)
    }

    return (
        <AppBody>
            <SimpleGrid columns={[1, 6]} spacing="30px">
                <IconButton aria-label="previous"
                    icon={<ChevronLeftIcon />}
                    ml={"8"}
                    shadow={"md"}
                    bgColor="white"
                    w="60px" h="62px"
                    borderRightRadius="55"
                    borderLeftRadius="55"
                    display={{ base: "none", md: "block" }} />

                <Button id="dateButton" boxShadow="md" p="6" rounded="md"
                    bg="white"

                    onClick={calendarModal.onOpen}
                    display={{ base: "none", md: "block" }}>
                    <Text textAlign={["center"]}>{dateSelect.getDate()}</Text>
                    {/* Date  */}
                    {/* <calendar 
                   date ={date}
                   setDate={setDate}/> */}
                </Button>
                <Modal id="calendarButton" 
                initialFocusRef={initialRef} 
                finalFocusRef={finalRef} 
                isOpen={calendarModal.isOpen} 
                onClose={calendarModal.onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Flex>
                                <FormControl mt={5}>
                                    <Calendar
                                        defaultActiveStartDate={dateSelect}
                                        onChange={(dateNow: any) => {
                                            setDateInput(dateNow)
                                        }}
                                    />
                                </FormControl>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                </Modal>
                <Button boxShadow="md" p="6" rounded="md" bg="white"
                    onClick={calendarModal.onOpen} display={{ base: "none", md: "block" }}>
                    {monthNames[dateSelect.getMonth()]}
                </Button>
                <Button boxShadow="md" p="6" rounded="md" bg="white"
                    onClick={calendarModal.onOpen} display={{ base: "none", md: "block" }}>
                    {dateSelect.getFullYear()}
                </Button>
                {/* <Button id="calendarButton" boxShadow="md" p="6" rounded="md" bg="white" isOpen={calendarModal.isOpen} onClose={calendarModal.onClose}>
                    Month
                </Button> */}
                {/* <Button boxShadow="md" p="6" rounded="md" bg="white">
                    Year
                </Button> */}
                <IconButton aria-label="next"
                    ml={"8"}
                    icon={<ChevronRightIcon />}
                    bgColor="white"
                    shadow={"md"}
                    w="60px" h="62px"
                    borderRightRadius="55"
                    borderLeftRadius="55"
                    display={{ base: "none", md: "block" }} />

                <IconButton
                    onClick={modal1.onOpen}

                    w={{ base: "38px", md: "60px" }}
                    h={{ base: "40px", md: "62px" }}
                    bg="#6CF5B4"
                    //colorScheme="green"
                    aria-label="Add event"
                    size="sm"
                    icon={<AddIcon color="#828282" />}
                    borderRightRadius="55"
                    borderLeftRadius="55"

                />
                <Modal id="addButton" initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={modal1.isOpen} onClose={modal1.onClose} size="xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            <Heading color="black">Add Event</Heading>
                            {/* <timetable getName = {setNameInput}/> */}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl isRequired>
                                <FormLabel color="black">
                                    <Text fontSize="24px">Event name</Text>
                                </FormLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    value={event}
                                    onChange={(e) => handleInputEventChange(e)}
                                    maxLength={100}
                                    isRequired
                                    ref={initialRef}
                                    placeholder="What's your event?"
                                />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel color="black">
                                    <Text fontSize="24px">Description</Text>
                                </FormLabel>
                                <Textarea
                                    id="description"

                                    value={description}
                                    onChange={handleInputDescriptionChange}
                                    placeholder="Description"
                                    size="md"
                                    isRequired
                                />
                            </FormControl>

                            <Flex>
                                <FormControl mt={4}>
                                    <FormLabel color="black">
                                        <Text fontSize="24px">Start Time</Text>
                                    </FormLabel>
                                    <Input placeholder="Select time" size="xs"
                                        id="time"
                                        type="time"
                                        value={time + " "}
                                        onChange={handleInputTimeChange} />
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
                                <Input
                                    id="location"
                                    type="text"
                                    value={location}
                                    onChange={(e) => {
                                        setLocationInput("")
                                        handleInputLocationChange(e)
                                    }}
                                    maxLength={100}
                                    isRequired
                                    placeholder="Place/ Platform"
                                />
                            </FormControl>

                            <FormControl display="flex" alignItems="center">
                                <Switch id="notification" size="lg" mt={4} />
                                <FormLabel htmlFor="notification" mb="0" color="#5A5A5A" mt={4}>
                                    Notification
                                </FormLabel>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                width="239px"
                                height="40px"
                                bg="#E65300"
                                type="submit"
                                onClick={() => handleSubmit()}>
                                Add
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </SimpleGrid>
            <br />

            <Box boxShadow="md" p="6" rounded="md" bg="white"
                display={{ base: "none", md: "block" }}>
                <Grid templateColumns="repeat(8, 1fr)" gap={2}>
                    <h4> </h4>
                    <h4>
                        <Text color="#FF3939">SUN</Text>
                    </h4>
                    <h4>MON</h4>
                    <h4>TUE</h4>
                    <h4>WED</h4>
                    <h4>THU</h4>
                    <h4>FRI</h4>
                    <h4>
                        <Text color="#FF3939">SAT</Text>
                    </h4>
                </Grid>
            </Box>
            <br />

            <Box boxShadow="md" p="4" rounded="md" bg="white">
                <Text>01:00</Text>
                {/* <Box zIndex="4"  position="fixed" bgColor="#FFA740"><Text color='black' width="88px" height="295px">Assignment</Text>  </Box>
                 */}

                <br />
                <Divider orientation="horizontal" />
                <Text>02:00</Text>
                {/* <Box zIndex="5" position="fixed" bgColor="#7EFF69"><Text color='black' width="88px" height="295px">Course</Text>  </Box> */}
                <br />
                <Divider orientation="horizontal" />
                <Text>03:00</Text>
                <br />
                <Divider />
                <Text>04:00</Text>
                <br />
                <Divider />
                <Text>05:00</Text>
                <br />
                <Divider />
                <Text>06:00</Text>
                <Box boxShadow="md" p="6" rounded="md" bg="white">
                    <Grid templateColumns="repeat(8, 1fr)" gap={2}>
                        <h4></h4>
                        <h4></h4>
                        <h4></h4>
                        <h4></h4>
                        <h4></h4>
                        <h4>
                            <Box bg='#7EFF69' w='100%' p="3" color='black' onClick={() => navigate("/schedule/showEvent/")}>{event}  </Box>
                            {/* onClick={detailModal.onOpen} cursor='pointer' */}
                        </h4>
                        <h4></h4>
                        <h4></h4>
                    </Grid>
                </Box>
                <br />
                <Divider />
                <Text>07:00</Text>
                <br />
                <Divider />
                <Text>08:00</Text>
                <br />
                <Divider />
                <Text>09:00</Text>
                <br />
                <Divider />
                <Text>10:00</Text>
                <br />
                <Divider />
                <Text>11:00</Text>
                <br />
                <Divider />
                <Text>12:00</Text>
                <br />
                <Divider />
                <Text>13:00</Text>
                <br />
                <Divider />
                <Text>14:00</Text>
                <br />
                <Divider />
                <Text>15:00</Text>
                <br />
                <Divider />
                <Text>16:00</Text>
                <br />
                <Divider />
                <Text>17:00</Text>
                <br />
                <Divider />
                <Text>18:00</Text>
                <br />
                <Divider />
                <Text>19:00</Text>
                <br />
                <Divider />
                <Text>20:00</Text>
                <br />
                <Divider />
                <Text>21:00</Text>
                <br />
                <Divider />
                <Text>22:00</Text>
                <br />
                <Divider />
                <Text>23:00</Text>
                <br />
                <Divider />
                <Text>24:00</Text>
                <br />
                <Divider />
                {/* <Grid templateColumns="repeat(8, 1fr)" gap={2}> */}
                <h4></h4>
                {/* this part is for edit evet modal     */}
            </Box>
        </AppBody>
    )
}

export default timetable

