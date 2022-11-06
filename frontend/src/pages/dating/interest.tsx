import { INTERESTS } from "../../components/dating/shared/interests"
import { Heading, Text, Box, Grid, GridItem, CheckboxGroup, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import DatingAppBody from "../../components/dating/DatingAppBody"
import DatingInterestModal from "../../components/dating/DatingInterestModal"
import DatingInterestSearch from "../../components/dating/DatingInterestSearch"
import DatingInterestTag from "../../components/dating/DatingInterestTag"
import DatingInterestDynamicButton from "../../components/dating/DatingInterestDynamicButton"

const TagOfInterest = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [allInterests] = useState(INTERESTS)
    const [numOfInterest, setNumOfInterest] = useState(0)
    const [selectedInterests, setSelectedInterest] = useState<String[] | String>([])

    return (
        <DatingAppBody>
            <Grid
                templateAreas={`"topic button" "desc desc"`}
                gridTemplateRows={"50px 50px"}
                gridTemplateColumns={"12rem px"}
                h="125px"
                gap="2"
                pt="5"
            >
                <GridItem pl="2" area={"topic"}>
                    <Heading>Interests</Heading>
                </GridItem>
                <GridItem pl="2" area={"desc"}>
                    <Box display="flex">
                        <Text>Please select your interest: (</Text>
                        {numOfInterest}
                        <Text>&nbsp;of 5 selected)</Text>
                    </Box>
                </GridItem>
                <GridItem pl="2" area={"button"}>
                    <DatingInterestDynamicButton numOfInterest={numOfInterest} selectedInterests={selectedInterests} />
                </GridItem>
            </Grid>
            <Box pb="10">
                <DatingInterestSearch />
            </Box>
            <CheckboxGroup colorScheme="white">
                {allInterests.map(({ interestId, interestName }) => (
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
            <DatingInterestModal isOpen={isOpen} onClose={onClose} />
        </DatingAppBody>
    )
}

export default TagOfInterest
