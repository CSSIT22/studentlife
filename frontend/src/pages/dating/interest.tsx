import { INTERESTS } from "../../components/dating/shared/interests"
import { Heading, Text, Box, Grid, GridItem, CheckboxGroup, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import DatingAppBody from "../../components/dating/DatingAppBody"
import DatingInterestModal from "../../components/dating/DatingInterestModal"
import DatingInterestSearch from "../../components/dating/DatingInterestSearch"
import DatingInterestTag from "../../components/dating/DatingInterestTag"
import DatingInterestDynamicButton from "../../components/dating/DatingInterestDynamicButton"

interface state {
    allInterests: {
        interestId: string;
        interestName: string;
    }[]
}
const TagOfInterest = () => {
    // Used for DatingInterestModal & DatingInterestTag components to trigger the modal
    const { isOpen, onOpen, onClose } = useDisclosure()

    // All states which are used for DatingInterestDynamicButton and DatingInterestTag components
    // to be used with some functions & Some of them are used in this file.
    let IState = {allInterests: INTERESTS}
    const [searchQuery, setSearchQuery] = useState("")
    const [numOfInterest, setNumOfInterest] = useState(0)
    const [selectedInterests, setSelectedInterest] = useState<String[] | String>([])

    return (
        <DatingAppBody>
            {/* Grid: Used for separating topic, button, and description into three areas */}
            <Grid
                templateAreas={`"topic button" "desc desc"`}
                gridTemplateRows={"50px 50px"}
                gridTemplateColumns={"12rem px"}
                h="125px"
                gap="2"
                pt="5"
            >
                {/* Interests topic */}
                <GridItem pl="2" area={"topic"}>
                    <Heading>Interests</Heading>
                </GridItem>
                <GridItem pl="2" area={"desc"}>
                    {/* Interest description */}
                    <Box display="flex">
                        <Text>Please select your interest: (</Text>
                        {/* numOfInterest will change when you select/deselect the tags */}
                        {numOfInterest}
                        <Text>&nbsp;of 5 selected)</Text>
                    </Box>
                </GridItem>
                {/* DatingInterestDynamicButton component: Skip & Done button */}
                <GridItem pl="2" area={"button"}>
                    <DatingInterestDynamicButton numOfInterest={numOfInterest} selectedInterests={selectedInterests} />
                </GridItem>
            </Grid>
            {/* DatingInterestSearch component: Search Bar */}
            <Box pb="10">
                <DatingInterestSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            </Box>
            {/* CheckboxGroup : List of tags of interest */}
            <CheckboxGroup colorScheme="white">
                {IState.allInterests.map(({ interestId, interestName }) => (
                    // DatingInterestTag component: Used for generating interactive tag
                    <DatingInterestTag
                        key={interestId}
                        interestId={interestId}
                        interestName={interestName}
                        onOpen={onOpen}
                        selectedInterests={selectedInterests}
                        numOfInterest={numOfInterest}
                        setNumOfInterest={setNumOfInterest}
                        setSelectedInterest={setSelectedInterest}
                    />
                ))}
            </CheckboxGroup>
            {/* DatingInterestModal: Modal that will appear when you select more than 5 tags of interest */}
            <DatingInterestModal isOpen={isOpen} onClose={onClose} />
        </DatingAppBody>
    )
}

export default TagOfInterest
