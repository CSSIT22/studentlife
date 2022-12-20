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
    useBoolean,
    Text,
} from "@chakra-ui/react"
import DatingAppBody from "../../../components/dating/DatingAppBody"
import { useEffect, useMemo, useState } from "react"
import DatingPollCreateRangeSlider from "../../../components/dating/DatingPollCreateRangeSlider"
import { AllInterests, PollDetail, UserInterests } from "@apiType/dating"
import DatingInterestDynamicButton from "../../../components/dating/DatingInterestDynamicButton"
import DatingInterestTag from "../../../components/dating/DatingInterestTag"
import DatingInterestSearch from "../../../components/dating/DatingInterestSearch"
import DatingCreateHeader from "src/components/dating/DatingCreateHeader"
import DatingCreateDescription from "src/components/dating/DatingCreateDescription"
import DatingCreateLocation from "src/components/dating/DatingCreateLocation"
import DatingCreateDate from "src/components/dating/DatingCreateDate"
import DatingCreateTime from "./../../../components/dating/DatingCreateTime"
import API from "src/function/API"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import DatingWentWrong from "src/components/dating/DatingWentWrong"
import Lottie from "lottie-react"
import DatingLoading from "../../../components/dating/lottie/DatingLoading.json"

declare global {
    var isDateWrong: boolean, isTimeWrong: boolean, people: number[], tag: number[], topic: string[]
}

const CreateActivityPoll = () => {
    const [clicked, setClicked] = useState(false)
    const didMount = useDidMount()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    let count = 1
    useEffect(() => {
        if (didMount && count != 0) {
            count--
            window.scrollTo(0, 0)
            API.get("/dating/verifyEnroll/getDatingEnroll").then((datingEnroll) => {
                API.get("/dating/verifyEnroll/getDatingOptions")
                    .then((datingOptions) => {
                        API.get("/dating/verifyEnroll/getDetail").then((detail) => {
                            function getAge(dateString: Date) {
                                var today = new Date()
                                var birthDate = new Date(dateString)
                                var age = today.getFullYear() - birthDate.getFullYear()
                                var m = today.getMonth() - birthDate.getMonth()
                                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                    age--
                                }
                                return age
                            }
                            if (!detail.data.sex || !detail.data.birth) {
                                toast({
                                    title: "It looks like some of your details are missing!",
                                    status: "warning",
                                    duration: 10000,
                                    isClosable: true,
                                    position: "top",
                                    description: "Please specify your \"birth date\" and \"sex\" before using Dating & Finding Friend."
                                })
                                navigate("/user")
                            }
                            else if (getAge(detail.data.birth) < 18) {
                                toast({
                                    title: "You don't meet the minimum age requirement!",
                                    status: "warning",
                                    duration: 10000,
                                    isClosable: true,
                                    position: "top",
                                    description: "You are required to be at least 18 years old to use Dating & Finding Friend."
                                })
                                navigate("/")
                            }
                            else if (getAge(detail.data.birth) > 40) {
                                toast({
                                    title: "You don't meet the maximum age requirement!",
                                    status: "warning",
                                    duration: 5000,
                                    isClosable: true,
                                    position: "top",
                                    description: "You are required to be at most 40 years old to use Dating & Finding Friend."
                                })
                                navigate("/")
                            }
                            else if (!datingEnroll.data.hasCompleteTutorial) {
                                toast({
                                    title: "Welcome!",
                                    status: "info",
                                    duration: 5000,
                                    isClosable: true,
                                    position: "top",
                                    description: "Complete the tutorial, option setting, and interests selection to start using Dating & Finding Friend."
                                })
                                navigate("/dating/tutorial");
                            }
                            else if (!datingOptions.data.userId) {
                                navigate("/dating/option")
                                toast({
                                    title: "Option Setting Incomplete!",
                                    status: "warning",
                                    duration: 5000,
                                    isClosable: true,
                                    position: "top",
                                    description: "You are required to set your option first before using Dating & Finding Friend."
                                })
                            }
                            else if (!datingEnroll.data.hasCompleteSetting) {
                                toast({
                                    title: "Interests Selection Incomplete!",
                                    status: "warning",
                                    duration: 5000,
                                    isClosable: true,
                                    position: "top",
                                    description: "You are required to skip or select your interests first before using Dating & Finding Friend."
                                })
                                navigate("/dating/interests")
                            }
                        })
                    })
            })
            API.get("/dating/create/getAllTopic").then((allInterest) => {
                setAllInterests(allInterest.data)
            }).catch(on).finally(() => setIsLoading(false))
        }

    }, [])

    function useDidMount() {
        const [didMount, setDidMount] = useState(true)
        useEffect(() => {
            setDidMount(false)
        }, [])

        return didMount
    }

    // This use for set state to all variable
    const [header, setHeaderInput] = useState("")

    const [description, setDescriptionInput] = useState("")

    const [location, setLocationInput] = useState("")

    const [date, setDateInput] = useState("")

    const [time, setTimeInput] = useState("")
    const [validTime, setValidTime] = useState(false)

    const [sliderValue, setSliderValue] = useState<number[]>([2, 5]) //For age min,max

    // All states which are used for DatingInterestDynamicButton and DatingInterestTag components
    // to be used with some functions & Some of them are used in this file.
    const [allInterests, setAllInterests] = useState<AllInterests[] | AllInterests[]>([])
    const [interests, setInterests] = useState<AllInterests[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedInterests, setSelectedInterest] = useState<number[]>([])
    const [selectedInterestsNew, setSelectedInterestNew] = useState<number[]>([])
    const [tagIsClicked, setTagIsClicked] = useState(false)

    //Tost for error message when submit
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isError, { on }] = useBoolean()

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
            for (let j = 0; j < allInterests.length; j++) {
                if (selectedInterests[i] === allInterests[j].interestId) {
                    globalThis.topic.push(allInterests[j].interestName)
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
        const selectDate = new Date(date)
        const dateTime =
            date + "T" + time + ":00.000+0700"
        return dateTime
    }

    function handleDateTime2() {
        const selectDate = new Date(date)
        const dateTime =
            date + "T" + time + ":00.000Z"
        return dateTime
    }

    const timePass = useMemo(() => {
        const currentInput = new Date(handleDateTime())
        if (new Date() > currentInput) {
            return true
        } else {
            return false
        }
    }, [date, time])

    function handleSubmit() {
        // Validate all value before submit to database
        if (
            // Validate
            !isTooShortHeader &&
            !isTooShortLocation &&
            !isNoDate &&
            !validTime &&
            !isNoTime &&
            !timePass
        ) {
            setClicked(true)
            setIsLoading(true)
            API.post<PollDetail | UserInterests>(`/dating/create/setPoll?name=${header}`, {
                pollName: header,
                pollPlace: location,
                pollAppointAt: handleDateTime2(),
                pollText: description,
                participantMin: sliderValue[0],
                participantMax: sliderValue[1],
                isOpen: true,
                activityInterestId: selectedInterests
            })
                .then(() => navigate("/dating/poll"))
                .catch((err) => toast({ status: "error", position: "top", title: "Error", description: ("Something wrong with request! " + err) }))
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
            {isLoading || isError ? <></> : <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 360,
                    damping: 20,
                }}>
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
                                    <motion.div
                                        initial={
                                            { cursor: "pointer" }
                                        }
                                        style={{ display: "inline-block" }}
                                        whileHover={{ scale: 1.1, }}
                                        whileTap={{
                                            scale: 0.9,
                                        }}>
                                        <Button
                                            borderRadius={"6px"}
                                            onClick={() => { onOpen(), setInterests(allInterests) }}
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
                                    </motion.div>
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
                                    autoFocus={false}
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
                                                    // setInterests={setInterests}
                                                    setInterests={setInterests}
                                                    // allInterests={INTERESTS}
                                                    allInterests={allInterests}
                                                />
                                            </Box>
                                        </ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            {/* Grid: Used for separating topic, button, and description into three areas */}

                                            {/* CheckboxGroup : List of tags of interest */}
                                            {/* {interests.map(({ interestId, interestName }) => ( */}
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
                                                    isLoading={false}
                                                    setInterests={setInterests}
                                                    setIsSubmiited={setIsSubmitted}
                                                    hasCompleteSetting={true}
                                                    on={on}
                                                />
                                            </GridItem>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                                {isNoTopic ? (
                                    <></>
                                ) : (
                                    isOpen ? <></> : <FormHelperText color="gray">
                                        You have selected {handleTopic()} as {selectedInterestsNew.length > 1 ? " the topics." : "the topic."}
                                        {/* You have selected {handleTopic()} as {selectedInterestsNew.length > 1 ? " the topics." : "the topic."} */}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Center>
                        {/* Description input & error control */}

                        <DatingCreateDescription getDescription={setDescriptionInput} />
                        {/* Location input & error control */}

                        {/* IMPORTANT!!! */}
                        {/* If that user haven't use the restaurant function we should block this feature*/}

                        <DatingCreateLocation getLocation={setLocationInput} />
                        {/* Date input & error control */}

                        <DatingCreateDate setDate={setDateInput} timePass={timePass} />
                        {/* Time input & error control */}
                        <DatingCreateTime setTime={setTimeInput} timePass={timePass} />
                        <FormControl isRequired>
                            <FormLabel>Number of people</FormLabel>
                            <DatingPollCreateRangeSlider sliderValue={sliderValue} setSliderValue={setSliderValue} />
                        </FormControl>
                        <Center>
                            {/* Submit button */}
                            <motion.div
                                initial={
                                    { cursor: "pointer" }
                                }
                                style={{ display: "inline-block" }}
                                whileHover={{ scale: 1.1, }}
                                whileTap={{
                                    scale: 0.9,
                                }}>
                                <Button
                                    type="submit"
                                    borderRadius={"5px"}
                                    colorScheme={"blue.400"}
                                    bg={"#E65300"}
                                    isDisabled={clicked}
                                    onClick={() => handleSubmit()}
                                    mt={"25px"}
                                    pt="10px"
                                    pb="10px"
                                    pr="30px"
                                    pl="30px"
                                >
                                    Post
                                </Button>
                            </motion.div>
                        </Center>
                    </Stack>
                </Box>
            </motion.div>}

            {
                (isLoading) && !isError ? (
                    <>
                        <Box w="800px" h="400px" display="block" position="fixed" left="50%" transform="translateX(-50%)" bottom={{ base: "450px", md: "400px" }}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 360,
                                    damping: 20,
                                }}>
                                <Lottie animationData={DatingLoading} loop={true} style={{ scale: "0.6" }} />
                            </motion.div>
                        </Box>
                        <Box w="350px" h="100px" display="block" position="fixed" left="50%" transform="translateX(-50%)" bottom={{ base: "180px", md: "125px" }}>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: `0.25em`
                                }}
                                animate={{
                                    opacity: 1,
                                    y: `0em`,
                                    transition: {
                                        duration: 1,
                                        ease: [0.2, 0.65, 0.3, 0.9],
                                    }
                                }}
                            >
                                <Text mt="-25%" textAlign="center" color="black" fontWeight="700" fontSize={{ base: "2xl", md: "5xl" }} lineHeight="120%" pl="18px" >
                                    LOADING
                                </Text>
                            </motion.div>
                        </Box>
                    </>
                ) : (
                    <></>
                )
            }

            {
                isError ? (
                    <Box display="flex" h="66vh" justifyContent="center" alignItems="center">
                        <DatingWentWrong />
                    </Box>
                ) : (
                    <></>
                )
            }

        </DatingAppBody>
    )
}

export default CreateActivityPoll
