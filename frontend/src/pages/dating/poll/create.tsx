import {
    Box,
    Center,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
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
import DatingCreateHeader from "src/components/dating/DatingCreateHeader"
import DatingCreateDescription from "src/components/dating/DatingCreateDescription"
import DatingCreateLocation from "src/components/dating/DatingCreateLocation"
import DatingCreateDate from "src/components/dating/DatingCreateDate"
import DatingCreateTime from "./../../../components/dating/DatingCreateTime"

declare global {
    var isDateWrong: boolean, isTimeWrong: boolean, people: number[], tag: number[], topic: string[]
}

const CreateActivityPoll = () => {
    // This use for set state to all variable
    const [header, setHeaderInput] = useState("")

    const [description, setDescriptionInput] = useState("")

    const [location, setLocationInput] = useState("")

    const [date, setDateInput] = useState("")
    const [validDate, setValidDate] = useState(false)

    const [time, setTimeInput] = useState("")
    const [validTime, setValidTime] = useState(false)

    const [sliderValue, setSliderValue] = useState<number[]>(globalThis.people) //For age min,max
    globalThis.people = [2, 5] //need db + condition

    // All states which are used for DatingInterestDynamicButton and DatingInterestTag components
    // to be used with some functions & Some of them are used in this file.
    const [interests, setInterests] = useState(INTERESTS)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedInterests, setSelectedInterest] = useState<number[]>([])
    const [selectedInterestsNew, setSelectedInterestNew] = useState<number[]>([])
    const [tagIsClicked, setTagIsClicked] = useState(false)

    //Tost for error message when submit
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    //Validate the Header
    const isTooShortHeader = header.length < 10
    //Validate the Description
    const isTooLongDescription = description.length >= 250
    //Validate the location
    const isTooShortLocation = location.length < 5
    //Validate the date (I don't know why it worked, but it worked lol)
    const isNoDate = date.length < 8
    //Validate the time (I don't know why it worked, but it worked lol)
    const isNoTime = time.length < 3

    let isNoTopic = handleTopic().length < 1

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
        if (
            // Validate
            !isTooShortHeader &&
            !isTooLongDescription &&
            !isTooShortLocation &&
            !isNoDate &&
            !validDate &&
            !isNoTime &&
            !validTime
        ) {
            console.log(
                "Header: " +
                header +
                " Tag: " +
                selectedInterests +
                " Description: " +
                description +
                " Location: " +
                location +
                " Date & Time: " +
                // { d: handleDateTime() } +
                handleDateTime() +
                " Now: " +
                new Date() +
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
            <Box m="10px" mt={{ base: "40px", md: "30px" }} p="50px" bg="white" mb="60px" borderRadius={"20px"} color={"black"}>
                <Heading pb={"20px"}>Create a poll</Heading>
                <Stack>
                    {/* Header input & error control */}
                    <DatingCreateHeader getHeader={setHeaderInput} />

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
                                    setSelectedInterest(selectedInterestsNew)
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
                                                allInterests={INTERESTS}
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
                                        <GridItem
                                            pl="2"
                                            area={"button"}
                                            mt={{ base: "6px", md: "10px" }}
                                            onClick={() => {
                                                onClose()
                                                setSelectedInterestNew(selectedInterests)
                                            }}
                                        >
                                            <DatingInterestDynamicButton
                                                numOfSelectedInterest={selectedInterests.length}
                                                selectedInterests={selectedInterests}
                                                tagIsClicked={tagIsClicked}
                                                hasSelectedInterest={true}
                                                type="topic"
                                            />
                                        </GridItem>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                            {isNoTopic ? (
                                <></>
                            ) : (
                                <FormHelperText color="gray">
                                    You have selected {handleTopic()} as {selectedInterestsNew.length > 1 ? " the topics." : "the topic."}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Center>
                    {/* Description input & error control */}

                    <DatingCreateDescription getDescription={setDescriptionInput} />
                    {/* Location input & error control */}
                    {/* <FormControl isInvalid={!isValidLocation} isRequired>

                    {/* IMPORTANT!!! */}
                    {/* If that user haven't use the restaurant function we should block this feature*/}

                    <DatingCreateLocation getLocation={setLocationInput} />
                    {/* Date input & error control */}

                    <DatingCreateDate getDate={setDateInput} getValidDate={setValidDate} />
                    {/* Time input & error control */}

                    <DatingCreateTime getTime={setTimeInput} getValidTime={setValidTime} selectDate={date} />
                    <FormControl isRequired>
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
