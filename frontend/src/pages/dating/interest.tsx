import { INTERESTS } from "../../components/dating/shared/interests"
import { Heading, Text, Box, Button, Grid, GridItem, CheckboxGroup, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react"
import DatingAppBody from "../../components/dating/DatingAppBody"
import DatingInterestModal from "../../components/dating/DatingInterestModal"
import DatingInterestSearch from "../../components/dating/DatingInterestSearch"
import DatingInterestTag from "../../components/dating/DatingInterestTag"
import DatingInterestDynamicButton from "../../components/dating/DatingInterestDynamicButton"

const TagOfInterest = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [interests] = useState(INTERESTS)
    const [numOfInterest, setNumOfInterest] = useState(0)
    const [selectedInterests, setSelectedInterest] = useState<String[] | String>([])

    function handleTag(interest: React.ChangeEvent<HTMLInputElement>) {
        if (interest.target.checked) {
            setNumOfInterest(numOfInterest + 1)
            if (numOfInterest < 5) {
                setSelectedInterest(selectedInterests.concat(interest.target.value))
            }
        } else {
            setNumOfInterest(numOfInterest - 1)
            if (numOfInterest <= 5) {
                setSelectedInterest((selectedInterests as string[]).filter((arr) => arr != interest.target.value))
            }
        }
    }

    function handleSubmit() {
        alert("List of Interest ID: " + selectedInterests)
    }

    function checkId(interestId: string) {
        for (var i = 0; i < selectedInterests.length; i++) {
            if (selectedInterests[i] == interestId) {
                return true
            }
        }
        return false
    }

    function checkNum() {
        if (numOfInterest === 5) {
            return true
        }
        return false
    }

    return (
        <DatingAppBody>
            <Grid
                templateAreas={`"topic button" "desc desc"`}
                gridTemplateRows={"50px 50px"}
                gridTemplateColumns={"12rem px"}
                h="125px"
                gap="2"
                color="blackAlpha.700"
                fontWeight="bold"
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
                    <DatingInterestDynamicButton numOfInterest={numOfInterest} handleSubmit={handleSubmit}/>
                </GridItem>
            </Grid>
            <Box pb="10">
                <DatingInterestSearch />
            </Box>
            <CheckboxGroup colorScheme="white">
                {checkNum()
                    ? interests.map(({ interestId, interestName }) => (
                          <DatingInterestTag
                              key={interestId}
                              bool={true}
                              interestId={interestId}
                              interestName={interestName}
                              handleTag={handleTag}
                              checkId={checkId}
                              onOpen={onOpen}
                          />
                      ))
                    : interests.map(({ interestId, interestName }) => (
                          <DatingInterestTag
                              key={interestId}
                              bool={false}
                              interestId={interestId}
                              interestName={interestName}
                              handleTag={handleTag}
                              checkId={checkId}
                              onOpen={onOpen}
                          />
                      ))}
            </CheckboxGroup>
            <DatingInterestModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </DatingAppBody>
    )
}

export default TagOfInterest
