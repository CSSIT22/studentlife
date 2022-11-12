import {
    Box,
    Center,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    Button,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Textarea,
    Select,
    Flex,
} from "@chakra-ui/react"
import DatingAppBody from "../../../components/dating/DatingAppBody"
import { useState } from "react"

declare global {
    var isPassDate: boolean, isPassTime: boolean
}

const CreateActivityPoll = () => {
    // This use for set state to all variable
    const [header, setHeaderInput] = useState("")
    const handleInputHeaderChange = (e: any) => setHeaderInput(e.target.value)

    const [description, setDescriptionInput] = useState("")
    const handleInputDescriptionChange = (e: any) => setDescriptionInput(e.target.value)

    const [location, setLocationInput] = useState("")
    const handleInputLocationChange = (e: any) => setLocationInput(e.target.value)

    const [date, setDateInput] = useState("")
    const handleInputDateChange = (e: any) => setDateInput(e.target.value)

    const [time, setTimeInput] = useState("")
    const handleInputTimeChange = (e: any) => {
        setTimeInput(e.target.value), console.log(time)
    }
    //Tost for error message when submit
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    //Validate the Header
    const isTooLongHeader = header.length >= 100
    const isTooShortHeader = header.length < 10
    let isValidHeader = isTooLongHeader && isTooShortHeader // Use for check all Header validate
    //Validate the Description
    const isTooLongDescription = description.length >= 250
    //Validate the location
    const isTooLongLocation = location.length >= 100
    const isTooShortLocation = location.length < 5
    let isValidLocation = isTooLongLocation && isTooShortLocation // Use for check all Location validate
    //Validate the date (I don't know why it worked, but it worked lol)
    const isNoDate = date.length < 8
    let isValidDate = !isNoDate && !globalThis.isPassDate // Use for check all Date validate
    //Validate the date (I don't know why it worked, but it worked lol)
    const isNoTime = time.length < 3
    let isValidTime = !isNoTime && !globalThis.isPassTime // Use for check all Date validate

    //Restaurant name
    const res = ["Somchai Hotel", "Somsri Resturant", "Sompong Muu Ka Tra"]

    function isInThePast(d: any) {
        const today = new Date()
        //today.setHours(0, 0, 0, 0)
        const previous = new Date(today.getTime())
        previous.setDate(today.getDate() - 1)
        today.toLocaleDateString("th-TH", { timeZone: "Asia/Bangkok" })
        const date = new Date(d)
        //date.setHours(0, 0, 0, 0)
        date.toLocaleDateString("th-TH", { timeZone: "Asia/Bangkok" })
        // IDK Why it worked
        // It should be (date > previous && date !== previous) === true
        globalThis.isPassDate = (date < previous && date !== previous) === true // Set value for validation
        //console.log(today + " & " + date)
        return (date < previous && date !== previous) === true
    }

    function isInTimePast(d: any) {
        const today = new Date()
        const chosenDate = new Date(date)
        //Check if user pick the same date as today or not
        if (
            chosenDate.getDate() === today.getDate() &&
            chosenDate.getMonth() === today.getMonth() &&
            chosenDate.getFullYear() === today.getFullYear()
        ) {
            // console.log(
            //     today.getMinutes() +
            //         " and " +
            //         parseInt(d.substring(3, 5)) +
            //         (today.getHours() > parseInt(d.substring(0, 2)) && today.getMinutes() > parseInt(d.substring(3, 5)))
            // )
            //If user pick the same date check if the time have pass
            if (today.getHours() >= parseInt(d.substring(0, 2)) && today.getMinutes() >= parseInt(d.substring(3, 5))) {
                globalThis.isPassTime = true
                return true
            }
        }
        return false
    }

    function handleSubmit() {
        // Validate all value before submit to database
        if (!isTooLongHeader && !isTooShortHeader && !isTooLongDescription && isValidDate && !isNoTime && !isInTimePast(time)) {
            alert("Header: " + header + " Description: " + description + " Location: " + location + " Date: " + date + " Time: " + time)
        } else {
            // Error message
            toast({
                title: "Invalid input!",
                description: "Your poll is incomplete. Please edit and resubmit.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            })
        }
    }

    return (
        <DatingAppBody>
            <Box mt="50px" p="50px" bg="#E67F45" borderRadius={"20px"}>
                <Heading color={"white"} pb={"20px"}>
                    Create a poll
                </Heading>
                <Stack>
                    <Center>
                        {/* Header input & error control */}
                        <FormControl isInvalid={!isValidHeader} isRequired>
                            <FormLabel color={"white"}>Poll header</FormLabel>
                            <Input
                                borderRadius={"6px"}
                                id="header"
                                type="text"
                                value={header}
                                onChange={handleInputHeaderChange}
                                backgroundColor="white"
                                placeholder="Your poll header"
                                size="sm"
                                borderColor="white"
                                maxLength={100}
                                errorBorderColor="red"
                                isRequired
                                shadow="lg"
                            />
                            {!isTooShortHeader ? (
                                <FormHelperText></FormHelperText>
                            ) : (
                                <FormErrorMessage color="yellow">The minimum header length is 10 characters. Type something.</FormErrorMessage>
                            )}
                            {!isTooLongHeader ? (
                                <FormHelperText></FormHelperText>
                            ) : (
                                <FormErrorMessage color="yellow">The maximum header length is 100 characters. You cannot type more.</FormErrorMessage>
                            )}
                        </FormControl>
                    </Center>
                    <Center>
                        {/* Topic (tag of interest) input & error control */}
                        <FormControl isRequired>
                            <FormLabel color={"white"}>Poll topic</FormLabel>
                            <Button
                                borderRadius={"6px"}
                                onClick={onOpen}
                                //isOpen={isOpen}
                                backgroundColor="white"
                                color="gray"
                                size="sm"
                                p="20px"
                                pt="5px"
                                pb="5px"
                                shadow="lg"
                            >
                                Select poll topic
                            </Button>
                            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Wait for design...</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>
                                    <ModalFooter>
                                        <Button onClick={onClose}>Close</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </FormControl>
                    </Center>
                    <Center>
                        {/* Description input & error control */}
                        <FormControl isInvalid={isTooLongDescription} pt="8px">
                            <FormLabel color={"white"}>Poll description</FormLabel>
                            <Textarea
                                borderRadius={"6px"}
                                id="description"
                                value={description}
                                onChange={handleInputDescriptionChange}
                                backgroundColor="white"
                                placeholder="Description"
                                size="sm"
                                borderColor="white"
                                maxLength={250}
                                errorBorderColor="red"
                                isRequired
                                shadow="lg"
                            />
                            {!isTooLongDescription ? (
                                <FormHelperText></FormHelperText>
                            ) : (
                                <FormErrorMessage color="yellow">
                                    The maximum description length is 250 characters. You cannot type more.
                                </FormErrorMessage>
                            )}
                        </FormControl>
                    </Center>

                    <FormControl isInvalid={!isValidLocation} isRequired>
                        {/* Location input & error control */}
                        <FormLabel color={"white"}>Location</FormLabel>
                        <Flex>
                            <Input
                                borderRadius={"6px"}
                                id="location"
                                type="text"
                                value={location}
                                onChange={handleInputLocationChange}
                                backgroundColor="white"
                                placeholder="Location"
                                size="sm"
                                borderColor="white"
                                maxLength={100}
                                errorBorderColor="red"
                                isRequired
                                shadow="lg"
                            />
                            {/* IMPORTANT!!! */}
                            {/* If that user haven't use the restaurant function we should block this feature*/}
                            <Select
                                borderRadius={"6px"}
                                placeholder="Pick from your favorites."
                                size="sm"
                                bgColor="white"
                                pl="20px"
                                errorBorderColor="red"
                                shadow="lg"
                                onChange={(e: any) => {
                                    handleInputLocationChange(e)
                                }}
                            >
                                {res.map((value) => {
                                    return <option key={value}>{value}</option>
                                })}
                            </Select>
                        </Flex>
                        {!isTooShortLocation ? (
                            <FormHelperText color="white">You are now using {location} as a location.</FormHelperText>
                        ) : (
                            <FormErrorMessage color="yellow">The minimum header length is 5 characters. Type something.</FormErrorMessage>
                        )}
                        {!isTooLongLocation ? (
                            <FormHelperText></FormHelperText>
                        ) : (
                            <FormErrorMessage color="yellow">The maximum header length is 100 characters. You cannot type more.</FormErrorMessage>
                        )}
                    </FormControl>
                    {/* Date input & error control */}
                    <FormControl isInvalid={!isValidDate} isRequired>
                        <FormLabel color={"white"}>Date</FormLabel>
                        <Input
                            borderRadius={"6px"}
                            id="date"
                            type="date"
                            value={date}
                            onChange={handleInputDateChange}
                            backgroundColor="white"
                            size="sm"
                            borderColor="white"
                            errorBorderColor="red"
                            isRequired
                            shadow="lg"
                        />
                        {/* Somehow this two are switching IDK why*/}
                        {/* It should be isNoDate then isInThePast(date) */}
                        {isInThePast(date) ? (
                            <FormHelperText></FormHelperText>
                        ) : (
                            <FormErrorMessage color="yellow">You must provide a date.</FormErrorMessage>
                        )}
                        {isNoDate ? <FormHelperText></FormHelperText> : <FormErrorMessage color="yellow">The date has passed.</FormErrorMessage>}
                    </FormControl>
                    {/* Time input & error control */}
                    <FormControl isInvalid={!isValidTime} isRequired>
                        <FormLabel color={"white"}>Time</FormLabel>
                        <Input
                            borderRadius={"6px"}
                            id="time"
                            type="time"
                            value={time}
                            onChange={handleInputTimeChange}
                            backgroundColor="white"
                            size="sm"
                            borderColor="white"
                            errorBorderColor="red"
                            isRequired
                            shadow="lg"
                        />
                        {!isNoTime ? <FormHelperText></FormHelperText> : <FormErrorMessage color="yellow">You must provide a time.</FormErrorMessage>}
                        {!isInTimePast(time) ? (
                            <FormHelperText></FormHelperText>
                        ) : (
                            <FormErrorMessage color="yellow">The time has passed.</FormErrorMessage>
                        )}
                    </FormControl>
                    <Center>
                        {/* Submit button */}
                        <Button type="submit" borderRadius={"full"} colorScheme="orange" onClick={() => handleSubmit()} mt={"80px"} p="30px">
                            Done
                        </Button>
                    </Center>
                </Stack>
            </Box>
        </DatingAppBody>
    )
}

export default CreateActivityPoll
