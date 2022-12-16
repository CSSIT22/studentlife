import { HStack, Box, Center, useToast, Button, Text, Image, useBreakpointValue, Flex, Spacer, Badge, useDisclosure, ModalHeader, ModalBody, ModalCloseButton, ModalContent, Modal, Heading, ModalOverlay } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DatingAllActivityButton from "src/components/dating/DatingAllActivityButton"
import DatingAppliedActivityButton from "src/components/dating/DatingAppliedActivityButton"
import DatingYourActivityButton from "src/components/dating/DatingYourActivityButton"
import DatingYourPollSeeMore from "src/components/dating/DatingYourPollSeeMore"
import API from "src/function/API"
import DatingAppBody from "../../../components/dating/DatingAppBody"
import ChatImg from "../../../components/dating/pic/chat.png"
import GroupChatImg from "../../../components/dating/pic/groupchat.png"
import { POLL } from "src/components/dating/shared/poll"


const YourAppliedActivityPoll = () => {
    const didMount = useDidMount()
    const navigate = useNavigate()
    const toast = useToast()
    const [poll, setPoll] = useState(POLL)
    const { isOpen, onOpen, onClose } = useDisclosure()
    let count = 1

    function handlePeople(min: number, max: number) {
        if (max === min && max === 1) {
            return min + " person"
        } else if (max === min && max !== 1) {
            return min + " people"
        } else {
            return min + "-" + max + " people"
        }
    }

    function handleStatus(status: string) {
        if (status === "Accepted") {
            return "green"
        } else {
            return "yellow"
        }
    }

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
        }
    })

    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    function useDidMount() {
        const [didMount, setDidMount] = useState(true)
        useEffect(() => {
            setDidMount(false)
        }, [])

        return didMount
    }
    return (
        <DatingAppBody>
            <Center>
                <Box
                    mt={{ base: "-20px", md: "7px" }}
                    pr="500px"
                    pl="500px"
                    pt={{ base: "-20px", md: "20px" }}
                    zIndex="4"
                    pb="30px"
                    position="fixed"
                    top={{ base: 20, md: 150 }}
                    justifyContent="center"
                    bg="#FFF2E5"
                >
                    <HStack gap={{ base: "10px", md: "40px", lg: "40px" }} display="flex" justifyContent="center" pt="20px">
                        <DatingAllActivityButton backgroundColor={"orange.800"} />
                        <DatingYourActivityButton backgroundColor={"orange.800"} />
                        <DatingAppliedActivityButton backgroundColor={"orange.600"} />
                    </HStack>
                </Box>
            </Center>

            <Box mt="130px"></Box>

            {/* Test 1: click to see more at medium bottom + chat button */}
            <Box>
                {poll.map((values) => {
                    return (
                        <>
                            <Box backgroundColor="white"
                                boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                borderRadius="10px"
                                mb={{ base: "8px", md: "25px" }}
                            >
                                <Flex>
                                    <Box>
                                        <Text pt="17px" pl="30px" pr="31px" color="black" fontWeight="700" fontSize={{ base: "20px", md: "26px" }} lineHeight="120%">
                                            {values.pollName}
                                        </Text>
                                    </Box>
                                    <Spacer />
                                    <Box>
                                        <Badge mt='17px' mr="30px" lineHeight="133%" fontSize="15px" colorScheme={handleStatus(values.pollStatus)}>
                                            {values.pollStatus}
                                        </Badge>
                                    </Box>

                                </Flex>


                                <Flex>
                                    <Box pt='6' pb='6'>
                                        {isMobile ? (
                                            <Text ml="30px" fontWeight="500" fontSize="20px" lineHeight="133%" color="black">
                                                {values.creator.Fname}
                                                &nbsp;
                                                {values.creator.Lname}
                                            </Text>
                                        ) : (
                                            <Text ml="30px" fontWeight="500" fontSize="16px" lineHeight="133%" color="black">
                                                {values.creator.Fname}
                                                &nbsp;
                                                {values.creator.Lname}
                                            </Text>
                                        )}
                                    </Box>
                                    <Spacer />
                                    <Box display="flex" justifyContent="end" w="35%" alignItems="center" mr={{ base: "20px", md: "24px" }}>
                                        <Button
                                            borderRadius="full"
                                            w={{ base: "50px", md: "72px" }}
                                            h={{ base: "50px", md: "72px" }}
                                            backgroundColor="white"
                                            border="1px solid"
                                            boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
                                            <Image src={ChatImg} />
                                        </Button>
                                    </Box>
                                </Flex>

                                <Box display="flex" w="100%" justifyContent="right" pr="30px" pt="10px" >
                                    <Text
                                        lineHeight="150%"
                                        color="black"
                                        fontWeight="400"
                                        fontSize={{ base: "14px", md: "16px" }}
                                        as='u'
                                        mb="20px"
                                        cursor="pointer"
                                        onClick={onOpen}
                                    >
                                        Click to see more
                                    </Text>

                                    <Modal isCentered isOpen={isOpen} onClose={onClose} size={{ base: "md", md: "lg" }} scrollBehavior="inside">
                                        {/* <ModalOverlay /> */}
                                        <ModalContent>
                                            <ModalHeader>
                                                <Flex alignItems="center">
                                                    <Image
                                                        borderRadius="full"
                                                        boxSize="78px"
                                                        objectFit="cover"
                                                        src={values.creator.url}
                                                        alt={values.creator.Fname + " " + values.creator.Lname} />
                                                    <Text fontWeight="700" lineHeight="150%" ml="20px" fontSize="20px" color="black">
                                                        {values.creator.Fname}
                                                        &nbsp;
                                                        {values.creator.Lname}
                                                    </Text>
                                                </Flex>
                                            </ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Heading color="black" fontWeight="700" fontSize="20px" lineHeight="150%" pb="20px">
                                                    {values.pollName}
                                                </Heading>
                                                <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%" pb="20px">
                                                    {values.pollText.length > 1 ? "Description:" : ""} {values.pollText}
                                                </Text>
                                                <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%">
                                                    Location: {values.pollPlace}
                                                </Text>
                                                <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%">
                                                    Date: {globalThis.date}
                                                </Text>
                                                <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%">
                                                    Time: {globalThis.time}
                                                </Text>
                                                <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%" pb="15px">
                                                    Number of people: {handlePeople(values.participantMin, values.participantMax)}
                                                </Text>
                                            </ModalBody>
                                        </ModalContent>
                                    </Modal>
                                </Box>
                            </Box>
                        </>
                    )
                })}
            </Box>


            {/* Test 2: click to see more at medium bottom + group chat and chat button */}
            <Box>
                {poll.map((values) => {
                    return (
                        <Box backgroundColor="white"
                            boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
                            borderRadius="10px"
                            mb={{ base: "8px", md: "25px" }}

                        >
                            <Flex>
                                <Box>
                                    <Text pt="17px" pl="30px" pr="31px" color="black" fontWeight="700" fontSize={{ base: "20px", md: "26px" }} lineHeight="120%">
                                        {values.pollName}
                                    </Text>
                                </Box>
                                <Spacer />
                                <Box>
                                    <Badge mt='17px' mr="30px" lineHeight="133%" fontSize="15px" colorScheme={handleStatus(values.pollStatus)}>
                                        {values.pollStatus}
                                    </Badge>
                                </Box>
                            </Flex>

                            <Flex>
                                <Box pt='6' pb='6'>
                                    {isMobile ? (
                                        <Text ml="30px" fontWeight="500" fontSize="20px" lineHeight="133%" color="black">
                                            {values.creator.Fname}
                                            &nbsp;
                                            {values.creator.Lname}
                                        </Text>
                                    ) : (
                                        <Text ml="30px" fontWeight="500" fontSize="16px" lineHeight="133%" color="black">
                                            {values.creator.Fname}
                                            &nbsp;
                                            {values.creator.Lname}
                                        </Text>
                                    )}
                                </Box>
                                <Spacer />
                                <Box display="flex" justifyContent="end" w="35%" alignItems="center" mr={{ base: "20px", md: "24px" }}>
                                    <Button
                                        borderRadius="full"
                                        w={{ base: "50px", md: "72px" }}
                                        h={{ base: "50px", md: "72px" }}
                                        backgroundColor="white"
                                        border="1px solid"
                                        mr={{ base: "12px", md: "24px" }}
                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                    >
                                        <Image src={GroupChatImg} />
                                    </Button>
                                    <Button
                                        borderRadius="full"
                                        w={{ base: "50px", md: "72px" }}
                                        h={{ base: "50px", md: "72px" }}
                                        backgroundColor="white"
                                        border="1px solid"
                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
                                        <Image src={ChatImg} />
                                    </Button>
                                </Box>
                            </Flex>

                            <Box display="flex" w="100%" justifyContent="right" pr="30px" pt="10px" >
                                <Text
                                    lineHeight="150%"
                                    color="black"
                                    fontWeight="400"
                                    fontSize={{ base: "14px", md: "16px" }}
                                    as='u'
                                    mb="20px"
                                    cursor="pointer"
                                    onClick={onOpen}
                                >
                                    Click to see more
                                </Text>

                                <Modal isCentered isOpen={isOpen} onClose={onClose} size={{ base: "md", md: "lg" }} scrollBehavior="inside">
                                        {/* <ModalOverlay /> */}
                                        <ModalContent>
                                            <ModalHeader>
                                                <Flex alignItems="center">
                                                    <Image
                                                        borderRadius="full"
                                                        boxSize="78px"
                                                        objectFit="cover"
                                                        src={values.creator.url}
                                                        alt={values.creator.Fname + " " + values.creator.Lname} />
                                                    <Text fontWeight="700" lineHeight="150%" ml="20px" fontSize="20px" color="black">
                                                        {values.creator.Fname}
                                                        &nbsp;
                                                        {values.creator.Lname}
                                                    </Text>
                                                </Flex>
                                            </ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Heading color="black" fontWeight="700" fontSize="20px" lineHeight="150%" pb="20px">
                                                    {values.pollName}
                                                </Heading>
                                                <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%" pb="20px">
                                                    {values.pollText.length > 1 ? "Description:" : ""} {values.pollText}
                                                </Text>
                                                <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%">
                                                    Location: {values.pollPlace}
                                                </Text>
                                                <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%">
                                                    Date: {globalThis.date}
                                                </Text>
                                                <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%">
                                                    Time: {globalThis.time}
                                                </Text>
                                                <Text color="black" fontWeight="400" fontSize="16px" lineHeight="150%" pb="15px">
                                                    Number of people: {handlePeople(values.participantMin, values.participantMax)}
                                                </Text>
                                            </ModalBody>
                                        </ModalContent>
                                    </Modal>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </DatingAppBody>
    )
}



export default YourAppliedActivityPoll

function handlePeople(participantMin: any, participantMax: any): import("react").ReactNode {
    throw new Error("Function not implemented.")
}