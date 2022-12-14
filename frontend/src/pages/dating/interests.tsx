import { Heading, Box, Grid, GridItem, useDisclosure, Container, useBoolean, Text, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import DatingAppBody from "../../components/dating/DatingAppBody"
import DatingInterestModal from "../../components/dating/DatingInterestModal"
import DatingInterestSearch from "../../components/dating/DatingInterestSearch"
import DatingInterestTag from "../../components/dating/DatingInterestTag"
import DatingInterestDynamicButton from "../../components/dating/DatingInterestDynamicButton"
import { AllInterests } from "@apiType/dating"
import API from "src/function/API"
import DatingWentWrong from "src/components/dating/DatingWentWrong"
import Lottie from "lottie-react"
import DatingLoading from "../../components/dating/lottie/DatingLoading.json"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const TagOfInterest = () => {
    const [allInterests, setAllInterests] = useState<AllInterests[] | AllInterests[]>([])
    const [interests, setInterests] = useState<AllInterests[]>([])
    const [selectedInterests, setSelectedInterest] = useState<number[]>([])
    const [hasSelectedInterest, setHasSelectedInterest] = useState(false)
    const [hasCompleteSetting, setHasCompleteSetting] = useState(false)
    const didMount = useDidMount()
    const navigate = useNavigate()
    const toast = useToast()
    let count = 1

    useEffect(() => {
        if (didMount && count != 0) {
            count--
            window.scrollTo(0, 0)
            API.get("/dating/verifyEnroll/getDatingEnroll").then((datingEnroll) => {
                API.get("/dating/verifyEnroll/getDatingOptions").then((datingOptions) => {
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
                        else if (datingEnroll.data.hasCompleteSetting) {
                            setHasCompleteSetting(true)
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
                            toast({
                                title: "Option Setting Incomplete!",
                                status: "warning",
                                duration: 5000,
                                isClosable: true,
                                position: "top",
                                description: "You are required to set your option first before setting your interests."
                            })
                            navigate("/dating/option")
                        }
                    })
                })
            })

            API.get("/dating/interests/getUserInterests")
                .then((selectedInterests) => {
                    const interests: number[] = selectedInterests.data.flatMap((e: any) => e.interestId)
                    if (interests.length != 0) {
                        setHasSelectedInterest(true)
                    }
                    setSelectedInterest(interests)

                    API.get("/dating/interests/getAllInterests").then((allInterests) => {
                        setAllInterests(allInterests.data)
                        setInterests(allInterests.data)
                    })
                })
                .catch((err) => on())
                .finally(off)
        }
    })

    function useDidMount() {
        const [didMount, setDidMount] = useState(true)
        useEffect(() => {
            setDidMount(false)
        }, [])

        return didMount
    }

    // Used for DatingInterestModal & DatingInterestTag components to trigger the modal
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)

    // All states which are used for DatingInterestDynamicButton and DatingInterestTag components
    // to be used with some functions & Some of them are used in this file.

    const [searchQuery, setSearchQuery] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [tagIsClicked, setTagIsClicked] = useState(false)

    return (
        <DatingAppBody>
            {!(isLoading || isSubmitted || (isError || allInterests.length == 0)) ?
                <Box display="flex" justifyContent="center">
                    <Box zIndex="2" position="fixed" w="100%" justifyContent="space-between" top={{ base: 21, md: 157 }} >
                        <Container w="container.lg" maxW={"100%"}>
                            <Box maxW="100%" bg="#FFF2E6" pt={{ base: "70px", md: "35px" }}>
                                {/* Grid: Used for separating topic, button, and description into three areas */}
                                <Grid
                                    templateAreas={`"topic button" "desc desc"`}
                                    gridTemplateRows={"50px 50px"}
                                    gridTemplateColumns={"12rem px"}
                                    h="125px"
                                >
                                    {/* Interests topic */}
                                    <GridItem pl="2" area={"topic"}>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 360,
                                                damping: 20,
                                            }}>
                                            <Heading color="Black" fontWeight="700" fontSize={{ base: "36px", md: "43px" }} lineHeight="120%">
                                                Interests
                                            </Heading>
                                        </motion.div>
                                    </GridItem>
                                    <GridItem pl="2" area={"desc"}>
                                        {/* Interest description */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 360,
                                                damping: 20,
                                            }}>
                                            <Box display="flex">
                                                <Heading color="black" fontWeight="500" fontSize={{ base: "15px", md: "18px" }} lineHeight="150%">
                                                    Please select your interests: (
                                                </Heading>
                                                {/* numOfInterest will change when you select/deselect the tags */}
                                                <Heading color="black" fontWeight="500" fontSize={{ base: "15px", md: "18px" }} lineHeight="150%">
                                                    {selectedInterests.length}
                                                </Heading>
                                                <Heading color="black" fontWeight="500" fontSize={{ base: "15px", md: "18px" }} lineHeight="150%">
                                                    &nbsp;of 5 selected)
                                                </Heading>
                                            </Box>
                                        </motion.div>
                                    </GridItem>
                                    {/* DatingInterestDynamicButton component: Skip & Done button */}

                                    <GridItem pl="2" area={"button"} mt={{ base: "6px", md: "10px" }}>
                                        {!isError ? (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 360,
                                                    damping: 20,
                                                }}>
                                                <DatingInterestDynamicButton
                                                    numOfSelectedInterest={selectedInterests.length}
                                                    selectedInterests={selectedInterests}
                                                    tagIsClicked={tagIsClicked}
                                                    hasSelectedInterest={hasSelectedInterest}
                                                    type="interest"
                                                    isLoading={isLoading}
                                                    setInterests={setInterests}
                                                    setIsSubmiited={setIsSubmitted}
                                                    hasCompleteSetting={hasCompleteSetting}
                                                    on={on}
                                                /></motion.div>
                                        ) : (
                                            <></>
                                        )}
                                    </GridItem>
                                </Grid>
                                {/* DatingInterestSearch component: Search Bar */}
                                <Box pb="7">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 360,
                                            damping: 20,
                                        }}>
                                        <DatingInterestSearch
                                            searchQuery={searchQuery}
                                            setSearchQuery={setSearchQuery}
                                            setInterests={setInterests}
                                            allInterests={allInterests}
                                        /></motion.div>
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                </Box> : <></>}
            <Box>
                {/* CheckboxGroup : List of tags of interest */}
                {(isLoading || isSubmitted || (!isError && allInterests.length == 0)) ? (<>
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
                )}

                {isError && (allInterests.length == 0 || isSubmitted) ? (
                    <Box display="flex" h="66vh" justifyContent="center" alignItems="center">
                        <DatingWentWrong />
                    </Box>
                ) : (
                    <></>
                )}
                {!(isLoading || isSubmitted || (isError && allInterests.length == 0)) ?
                    <Box pt={{ base: "230px", md: "255px" }}>
                        {interests.map(({ interestId, interestName }) => (
                            // DatingInterestTag component: Used for generating interactive tag
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={{ display: "inline-block" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 360,
                                    damping: 20,
                                }}
                            >
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
                                    type={"interests"}
                                    buttonLocation={"top right"}
                                /></motion.div>
                        ))}
                    </Box> : <></>}
            </Box>

            {/* DatingInterestModal: Modal that will appear when you select more than 5 tags of interest */}
            <DatingInterestModal isOpen={isOpen} onClose={onClose} />
        </DatingAppBody>
    )
}

export default TagOfInterest
