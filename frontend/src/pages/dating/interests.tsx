import { INTERESTS } from "../../components/dating/shared/interests"
import { Heading, Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import DatingAppBody from "../../components/dating/DatingAppBody"
import DatingInterestModal from "../../components/dating/DatingInterestModal"
import DatingInterestSearch from "../../components/dating/DatingInterestSearch"
import DatingInterestTag from "../../components/dating/DatingInterestTag"
import DatingInterestDynamicButton from "../../components/dating/DatingInterestDynamicButton"

const TagOfInterest = () => {
    // Used for DatingInterestModal & DatingInterestTag components to trigger the modal
    const { isOpen, onOpen, onClose } = useDisclosure()

    // All states which are used for DatingInterestDynamicButton and DatingInterestTag components
    // to be used with some functions & Some of them are used in this file.
    const [interests, setInterests] = useState(INTERESTS)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedInterests, setSelectedInterest] = useState<String[] | String>([])
    const [tagIsClicked, setTagIsClicked] = useState(false)

    return (
        <DatingAppBody>
            {/* Grid: Used for separating topic, button, and description into three areas */}
            <Grid templateAreas={`"topic button" "desc desc"`} gridTemplateRows={"50px 50px"} gridTemplateColumns={"12rem px"} h="125px" pt="5">
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
                    <DatingInterestDynamicButton
                        numOfSelectedInterest={selectedInterests.length}
                        selectedInterests={selectedInterests}
                        tagIsClicked={tagIsClicked}
                    />
                </GridItem>
            </Grid>
            {/* DatingInterestSearch component: Search Bar */}
            <Box pb="10">
                <DatingInterestSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} setInterests={setInterests} INTERESTS={INTERESTS} />
            </Box>
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
                    type={"interests"}
                    buttonLocation={"top right"}
                />
            ))}
            {/* DatingInterestModal: Modal that will appear when you select more than 5 tags of interest */}
            <DatingInterestModal isOpen={isOpen} onClose={onClose} />
        </DatingAppBody>
    )
}

export default TagOfInterest
