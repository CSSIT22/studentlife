import { Heading, Box, Grid, GridItem, useDisclosure, Container, useBoolean } from "@chakra-ui/react"
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

const TagOfInterest = () => {
    const [allInterests, setAllInterests] = useState<AllInterests[] | AllInterests[]>([])
    const [interests, setInterests] = useState<AllInterests[]>([])
    const [selectedInterests, setSelectedInterest] = useState<number[]>([])
    const [hasSelectedInterest, setHasSelectedInterest] = useState(false)
    const didMount = useDidMount()

    useEffect(() => {
        if (didMount) {
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
            <Box display="flex" justifyContent="center">
                <Box zIndex="2" position="fixed" w="100%" justifyContent="space-between" top={{ base: 21, md: 157 }} id="bottomBar">
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
                                    <Heading color="Black" fontWeight="700" fontSize={{ base: "36px", md: "43px" }} lineHeight="120%">
                                        Interests
                                    </Heading>
                                </GridItem>
                                <GridItem pl="2" area={"desc"}>
                                    {/* Interest description */}
                                    <Box display="flex">
                                        <Heading color="black" fontWeight="400" fontSize={{ base: "15px", md: "18px" }} lineHeight="150%">
                                            Please select your interests: (
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

                                <GridItem pl="2" area={"button"} mt={{ base: "6px", md: "10px" }}>
                                    {!isError ? <DatingInterestDynamicButton
                                        numOfSelectedInterest={selectedInterests.length}
                                        selectedInterests={selectedInterests}
                                        tagIsClicked={tagIsClicked}
                                        hasSelectedInterest={hasSelectedInterest}
                                        type="interest"
                                        isLoading={isLoading}
                                        setInterests={setInterests}
                                        setIsSubmiited={setIsSubmitted}
                                        isSubmitted={isSubmitted}
                                    /> : <></>}
                                </GridItem>
                            </Grid>
                            {/* DatingInterestSearch component: Search Bar */}
                            <Box pb="7">
                                <DatingInterestSearch
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    setInterests={setInterests}
                                    allInterests={allInterests}
                                />
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
            <Box>
                {/* CheckboxGroup : List of tags of interest */}
                {isLoading ? (
                    <Box position="absolute" top={{ base: "300", md: "8" }}>
                        <Lottie animationData={DatingLoading} loop={true} style={{ scale: "0.3" }} />
                        <Heading textAlign={"center"} color="black" size={{ base: "xl", md: "2xl" }} mt={{ base: "-120px", md: "-335px" }}>
                            LOADING...
                        </Heading>
                    </Box>
                ) : <></>}
                {isSubmitted ? (
                    <Box position="absolute" top={{ base: "300", md: "8" }}>
                        <Lottie animationData={DatingLoading} loop={true} style={{ scale: "0.3" }} />
                        <Heading textAlign={"center"} color="black" size={{ base: "xl", md: "2xl" }} mt={{ base: "-120px", md: "-335px" }}>
                            SUBMITTING...
                        </Heading>
                    </Box>
                ) : <></>}
                {isError && allInterests.length == 0 ? (
                    <Box pt={{ base: "270px", md: "320px" }}>
                        <DatingWentWrong />
                    </Box>
                ) : (
                    <></>
                )}
                <Box pt={{base: "230px" ,md: "255px"}}>
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
                            type={"interests"}
                            buttonLocation={"top right"}
                        />
                    ))}
                </Box>

            </Box>

            {/* DatingInterestModal: Modal that will appear when you select more than 5 tags of interest */}
            <DatingInterestModal isOpen={isOpen} onClose={onClose} />
        </DatingAppBody>
    )
}

export default TagOfInterest
