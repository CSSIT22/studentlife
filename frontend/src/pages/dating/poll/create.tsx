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
    GridItem,
    Grid,
} from "@chakra-ui/react"
import DatingAppBody from "../../../components/dating/DatingAppBody"
import { useState } from "react"
import DatingPollCreateRangeSlider from "../../../components/dating/DatingPollCreateRangeSlider"
import { INTERESTS } from "../../../components/dating/shared/interests"
import DatingInterestDynamicButton from "../../../components/dating/DatingInterestDynamicButton"
import DatingInterestTag from "../../../components/dating/DatingInterestTag"
import DatingInterestSearch from "../../../components/dating/DatingInterestSearch"

declare global {
    var isPassDate: boolean, isPassTime: boolean, isLongDate: boolean, people: number[], tag: number[], topic: string[]
}

const CreateActivityPoll = () => {
    // This use for set state to all variable
    const [header, setHeaderInput] = useState("")
    const handleInputHeaderChange = (e: any) => setHeaderInput(e.target.value)

    const [description, setDescriptionInput] = useState("")
    const handleInputDescriptionChange = (e: any) => setDescriptionInput(e.target.value)

    const [location, setLocationInput] = useState("")
    const handleInputLocationChange = (e: any) => setLocationInput(e.target.value)

    const [locationD, setLocationInputD] = useState("")
    const handleInputLocationChangeD = (e: any) => setLocationInputD(e.target.value)

    const [date, setDateInput] = useState("")
    const handleInputDateChange = (e: any) => setDateInput(e.target.value)

    const [time, setTimeInput] = useState("")
    const handleInputTimeChange = (e: any) => setTimeInput(e.target.value)

    const [sliderValue, setSliderValue] = useState<number[]>(globalThis.people) //For age min,max
    globalThis.people = [2, 5] //need db + condition

    // All states which are used for DatingInterestDynamicButton and DatingInterestTag components
    // to be used with some functions & Some of them are used in this file.
    const [interests, setInterests] = useState(INTERESTS)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedInterests, setSelectedInterest] = useState<String[] | String>([])
    const [tagIsClicked, setTagIsClicked] = useState(false)

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
    let isNoTopic = handleTopic().length < 1

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
            //If user pick the same date check if the time have pass
            if (today.getHours() >= parseInt(d.substring(0, 2)) && today.getMinutes() >= parseInt(d.substring(3, 5))) {
                globalThis.isPassTime = true
                return true
            }
        }
        return false
    }

    function handleTopic() {
        globalThis.topic = []
        for (let i = 0; i < selectedInterests.length; i++) {
            for (let j = 0; j < interests.length; j++) {
                if (selectedInterests[i] === interests[j].interestId) {
                    globalThis.topic.push(interests[j].interestName)
                    break
                }
            }
            if (i !== selectedInterests.length - 1) {
                globalThis.topic.push(", ")
            }
        }
        return globalThis.topic
    }

    function handleDateTime() {
        const dateTime = new Date(date + " " + time)
        return dateTime
    }

    function handleSubmit() {
        // Validate all value before submit to database
        if (!isTooLongHeader && !isTooShortHeader && !isTooLongDescription && isValidDate && !isNoTime && !isInTimePast(time)) {
            // console.log({ d: handleDateTime() })
            console.log(
                "Header: " +
                    header +
                    " Tag: " +
                    selectedInterests +
                    " Description: " +
                    description +
                    " Location: " +
                    location +
                    " Date: " +
                    date +
                    " Time: " +
                    time +
                    " Date & Time: " +
                    { d: handleDateTime() } +
                    " people: " +
                    sliderValue
            )
            toast({
                title: "Poll created.",
                description: "You have successfully created a poll.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            })
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
            <Box mt="50px" p="50px" bg="white" borderRadius={"20px"} color={"black"}>
                <Heading pb={"20px"}>Create a poll</Heading>
                <Stack>
                    <Center>
                        {/* Header input & error control */}
                        <FormControl isInvalid={!isValidHeader} isRequired>
                            <FormLabel>Poll header</FormLabel>
                            <Input
                                borderRadius={"6px"}
                                id="header"
                                type="text"
                                value={header}
                                onChange={handleInputHeaderChange}
                                backgroundColor="white"
                                placeholder="Your poll header"
                                size="sm"
                                borderColor="black"
                                maxLength={100}
                                errorBorderColor="red"
                                isRequired
                                shadow="lg"
                            />
                            {!isTooShortHeader ? (
                                <FormHelperText></FormHelperText>
                            ) : (
                                <FormErrorMessage color="red">The minimum header length is 10 characters. Type something.</FormErrorMessage>
                            )}
                            {!isTooLongHeader ? (
                                <FormHelperText></FormHelperText>
                            ) : (
                                <FormErrorMessage color="red">The maximum header length is 100 characters. You cannot type more.</FormErrorMessage>
                            )}
                        </FormControl>
                    </Center>
                    <Center>
                        {/* Topic (tag of interest) input */}
                        <FormControl>
                            <Flex justifyContent={"space-between"}>
                                <FormLabel>Poll topics</FormLabel>
                                <Button
                                    borderRadius={"6px"}
                                    onClick={onOpen}
                                    backgroundColor="#E65300"
                                    color={"white"}
                                    size="sm"
                                    p="20px"
                                    pt="5px"
                                    pb="5px"
                                    shadow="lg"
                                    borderColor="black"
                                    colorScheme={"#E65300"}
                                >
                                    Select poll topics
                                </Button>
                            </Flex>
                            <Modal
                                onClose={() => {
                                    onClose()
                                    //, (globalThis.topic = []), setSelectedInterest([])
                                }}
                                isOpen={isOpen}
                                size="lg"
                                isCentered
                                onEsc={onClose}
                                scrollBehavior="inside"
                                closeOnOverlayClick={false}
                            >
                                <ModalOverlay backdropBlur={"base"} />
                                <ModalContent>
                                    <ModalHeader>
                                        <Grid
                                            templateAreas={`"topic button" "desc desc"`}
                                            gridTemplateRows={"50px 50px"}
                                            gridTemplateColumns={"12rem px"}
                                            h="125px"
                                            pt="5"
                                        >
                                            {/* Interests topic */}
                                            <GridItem pl="2" area={"topic"}>
                                                <Heading color="Black" fontWeight="700" fontSize={{ base: "36px", md: "43px" }} lineHeight="120%">
                                                    Topics
                                                </Heading>
                                            </GridItem>
                                            <GridItem pl="2" area={"desc"}>
                                                {/* Interest description */}
                                                <Box display="flex">
                                                    <Heading color="black" fontWeight="400" fontSize={{ base: "15px", md: "18px" }} lineHeight="150%">
                                                        Please select your poll topics: (
                                                    </Heading>
                                                    {/* numOfInterest will change when you select/deselect the tags */}
                                                    <Heading color="black" fontWeight="400" fontSize={{ base: "15px", md: "18px" }} lineHeight="150%">
                                                        {selectedInterests.length}
                                                    </Heading>
                                                    <Heading color="black" fontWeight="400" fontSize={{ base: "15px", md: "18px" }} lineHeight="150%">
                                                        &nbsp;of 5 selected)
                                                    </Heading>
                                                </Box>
                                            </GridItem>
                                            {/* DatingInterestDynamicButton component: Skip & Done button */}
                                        </Grid>
                                        {/* DatingInterestSearch component: Search Bar */}
                                        <Box pb="10">
                                            <DatingInterestSearch
                                                searchQuery={searchQuery}
                                                setSearchQuery={setSearchQuery}
                                                setInterests={setInterests}
                                                INTERESTS={INTERESTS}
                                            />
                                        </Box>
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        {/* Grid: Used for separating topic, button, and description into three areas */}

                                        {/* CheckboxGroup : List of tags of interest */}
                                        {interests.map(({ interestId, interestName }) => (
                                            // DatingInterestTag component: Used for generating interactive tag
                                            <DatingInterestTag
                                                key={interestId}
                                                interestId={interestId}
                                                interestName={interestName}
                                                onOpen={onOpen}
                                                selectedInterests={selectedInterests}
                                                numOfSelectedInterest={selectedInterests.length}
                                                setSelectedInterest={setSelectedInterest}
                                                tagIsClicked={tagIsClicked}
                                                setTagIsClicked={setTagIsClicked}
                                                type={"topics"}
                                                buttonLocation={"bottom right"}
                                            />
                                        ))}
                                    </ModalBody>
                                    <ModalFooter>
                                        <GridItem pl="2" area={"button"} mt={{ base: "6px", md: "10px" }} onClick={onClose}>
                                            <DatingInterestDynamicButton
                                                numOfSelectedInterest={selectedInterests.length}
                                                selectedInterests={selectedInterests}
                                                tagIsClicked={tagIsClicked}
                                            />
                                        </GridItem>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                            {isNoTopic ? (
                                <></>
                            ) : (
                                <FormHelperText color="gray">
                                    You have selected {handleTopic()} as {selectedInterests.length > 1 ? " the topics." : "the topic."}
                                </FormHelperText>
                            )}
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
                                maxLength={250}
                                errorBorderColor="red"
                                isRequired
                                shadow="lg"
                                borderColor="black"
                            />
                            {!isTooLongDescription ? (
                                <FormHelperText></FormHelperText>
                            ) : (
                                <FormErrorMessage color="red">
                                    The maximum description length is 250 characters. You cannot type more.
                                </FormErrorMessage>
                            )}
                        </FormControl>
                    </Center>

                    <FormControl isInvalid={!isValidLocation} isRequired>
                        {/* Location input & error control */}
                        <FormLabel>Location</FormLabel>
                        <Flex>
                            <Input
                                borderRadius={"6px"}
                                id="location"
                                type="text"
                                value={location}
                                onChange={(e) => {
                                    setLocationInputD("")
                                    handleInputLocationChange(e)
                                }}
                                backgroundColor="white"
                                placeholder="Location"
                                size="sm"
                                borderColor="black"
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
                                borderColor="black"
                                errorBorderColor="red"
                                value={locationD}
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
                            <FormHelperText color="gray">You have selected {location} as a location.</FormHelperText>
                        ) : (
                            <FormErrorMessage color="red">The minimum header length is 5 characters. Type something.</FormErrorMessage>
                        )}
                        {!isTooLongLocation ? (
                            <FormHelperText></FormHelperText>
                        ) : (
                            <FormErrorMessage color="red">The maximum header length is 100 characters. You cannot type more.</FormErrorMessage>
                        )}
                    </FormControl>
                    {/* Date input & error control */}
                    <FormControl isInvalid={!isValidDate} isRequired>
                        <FormLabel>Date</FormLabel>
                        <Input
                            borderRadius={"6px"}
                            id="date"
                            type="date"
                            value={date}
                            onChange={handleInputDateChange}
                            backgroundColor="white"
                            size="sm"
                            borderColor="black"
                            errorBorderColor="red"
                            isRequired
                            shadow="lg"
                        />
                        {/* Somehow this two are switching IDK why*/}
                        {/* It should be isNoDate then isInThePast(date) */}
                        {/* {!isLongYear(date) ? (
                            <FormHelperText></FormHelperText>
                        ) : (
                            <FormErrorMessage color="red">You scheduled an activity way too soon.</FormErrorMessage>
                        )} */}
                        {isInThePast(date) ? (
                            <FormHelperText></FormHelperText>
                        ) : (
                            <FormErrorMessage color="red">You must provide a date.</FormErrorMessage>
                        )}

                        {isNoDate ? <FormHelperText></FormHelperText> : <FormErrorMessage color="red">The date has passed.</FormErrorMessage>}
                    </FormControl>
                    {/* Time input & error control */}
                    <FormControl isInvalid={!isValidTime} isRequired>
                        <FormLabel>Time</FormLabel>
                        <Input
                            borderRadius={"6px"}
                            id="time"
                            type="time"
                            value={time}
                            onChange={handleInputTimeChange}
                            backgroundColor="white"
                            size="sm"
                            borderColor="black"
                            errorBorderColor="red"
                            isRequired
                            shadow="lg"
                        />
                        {!isNoTime ? <FormHelperText></FormHelperText> : <FormErrorMessage color="red">You must provide a time.</FormErrorMessage>}
                        {!isInTimePast(time) ? (
                            <FormHelperText></FormHelperText>
                        ) : (
                            <FormErrorMessage color="red">The time has passed.</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={!isValidTime} isRequired>
                        <FormLabel>Number of people</FormLabel>
                        <DatingPollCreateRangeSlider sliderValue={sliderValue} setSliderValue={setSliderValue} />
                    </FormControl>
                    <Center>
                        {/* Submit button */}
                        <Button
                            type="submit"
                            borderRadius={"5px"}
                            colorScheme={"blue.400"}
                            bg={"#E65300"}
                            onClick={() => handleSubmit()}
                            mt={"25px"}
                            pt="10px"
                            pb="10px"
                            pr="30px"
                            pl="30px"
                        >
                            Post
                        </Button>
                    </Center>
                </Stack>
            </Box>
        </DatingAppBody>
    )
}

export default CreateActivityPoll
