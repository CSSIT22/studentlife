import { INTERESTS } from "../../components/dating/shared/interests"
import { Heading, Text, Box, Button, Grid, GridItem, Input, CheckboxGroup } from "@chakra-ui/react"
import React, { useState } from "react"
import DatingTag from "../../components/dating/DatingTag"
import DatingAppBody from "../../components/dating/DatingAppBody"

const TagOfInterest = () => {
    const [interests] = useState(INTERESTS)
    const [numOfInterest, setNumOfInterest] = useState(0)
    const [selectedInterests, setSelectedInterest] = useState<String[] | String>([])

    function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
        var searchQuery = (document.getElementById("search") as HTMLInputElement).value
        if (event.key === "Enter" && searchQuery != "") {
            alert("Query: " + searchQuery)
        }
        return false
    }

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
                gridTemplateRows={"50px 75px"}
                gridTemplateColumns={"12rem px"}
                h="150px"
                gap="2"
                color="blackAlpha.700"
                fontWeight="bold"
                pt="5"
            >
                <GridItem pl="2" area={"topic"}>
                    <Heading>Interest</Heading>
                </GridItem>
                <GridItem pl="2" area={"desc"}>
                    <Box display="flex">
                        <Text>Please select your interest: (</Text>
                        {numOfInterest}
                        <Text>&nbsp;of 5 selected)</Text>
                    </Box>
                    {numOfInterest == 5 ? (
                        <Text color="gray.500">You have selected 5 interests! Deselect one of your interests to select others</Text>
                    ) : null}
                </GridItem>
                <GridItem pl="2" area={"button"}>
                    {numOfInterest == 0 ? (
                        <Button colorScheme="gray" size="lg" borderRadius="full" float="right">
                            Skip
                        </Button>
                    ) : (
                        <Button colorScheme="gray" size="lg" borderRadius="full" float="right" onClick={handleSubmit}>
                            Done
                        </Button>
                    )}
                </GridItem>
            </Grid>
            <Box pb="10">
                <Input
                    type="search"
                    placeholder="🔍  Search"
                    size="md"
                    borderRadius="full"
                    id="search"
                    name="search"
                    onKeyPress={(e) => handleSearch(e)}
                />
            </Box>
            <CheckboxGroup colorScheme="white">
                {checkNum()
                    ? interests.map(({ interestId, interestName }) => (
                          <DatingTag key={interestId} bool={true} interestId={interestId} interestName={interestName} handleTag={handleTag} />
                      ))
                    : interests.map(({ interestId, interestName }) => (
                          <DatingTag key={interestId} bool={false} interestId={interestId} interestName={interestName} handleTag={handleTag} />
                      ))}
            </CheckboxGroup>
        </DatingAppBody>
    )
}

export default TagOfInterest
