import AppBody from "../../components/share/app/AppBody"
import YouAreMatchWithWhiteImg from "../../components/dating/pic/youarematchwithwhite.png"
import YouAreMatchWithBlackImg from "../../components/dating/pic/youarematchwithblack.png"
import HeartCheckingWhiteImg from "../../components/dating/pic/heartcheckingwhite.png"
import HeartCheckingBlackImg from "../../components/dating/pic/heartcheckingblack.png"
import ActivityPollWhiteImg from "../../components/dating/pic/activitypollwhite.png"
import ActivityPollBlackImg from "../../components/dating/pic/activitypollblack.png"
import RandomizationWhiteImg from "../../components/dating/pic/randomizationwhite.png"
import RandomizationBlackImg from "../../components/dating/pic/randomizationblack.png"
import TagOfInterestWhiteImg from "../../components/dating/pic/tagofinterestwhite.png"
import TagOfInterestBlackImg from "../../components/dating/pic/tagofinterestblack.png"
import DatingOptionsWhiteImg from "../../components/dating/pic/datingoptionwhite.png"
import DatingOptionsBlackImg from "../../components/dating/pic/datingoptionblack.png"
import DatingTutorialWhiteImg from "../../components/dating/pic/datingtutorialwhite.png"
import DatingTutorialBlackImg from "../../components/dating/pic/datingtutorialblack.png"
import { INTERESTS } from "../../components/dating/shared/interests"
import { Heading, useBreakpointValue, Text, Box, Button, Grid, GridItem, Input, CheckboxGroup } from "@chakra-ui/react"
import React, { useState } from "react"
import DatingTag from "../../components/dating/DatingTag"

const TagOfInterest = () => {
    const [interests] = useState(INTERESTS)
    const [numOfInterest, setNumOfInterest] = useState(0)
    const [selectedInterests, setSelectedInterest] = useState<String[] | String>([])

    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

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
        <AppBody
            secondarynav={[
                {
                    name: "Randomization",
                    to: "/dating",
                    Icon: isMobile ? RandomizationWhiteImg : RandomizationBlackImg,
                },
                {
                    name: "Heart checking",
                    to: "/dating/likedyou",
                    Icon: isMobile ? HeartCheckingWhiteImg : HeartCheckingBlackImg,
                },
                {
                    name: "You are match with",
                    to: "/dating/match",
                    Icon: isMobile ? YouAreMatchWithWhiteImg : YouAreMatchWithBlackImg,
                },
                {
                    name: "Activity poll",
                    to: "/dating/poll",
                    Icon: isMobile ? ActivityPollWhiteImg : ActivityPollBlackImg,
                },
                {
                    name: "Tag of interest",
                    to: "/dating/interest",
                    isRight: true,
                    disableText: true,
                    Icon: isMobile ? TagOfInterestWhiteImg : TagOfInterestBlackImg,
                },
                {
                    name: "Option",
                    to: "/dating/option",
                    isRight: true,
                    disableText: true,
                    Icon: isMobile ? DatingOptionsWhiteImg : DatingOptionsBlackImg,
                },
                {
                    name: "Tutorial",
                    to: "/dating/tutorial/welcome",
                    isRight: true,
                    disableText: true,
                    Icon: isMobile ? DatingTutorialWhiteImg : DatingTutorialBlackImg,
                },
            ]}
        >
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
        </AppBody>
    )
}

export default TagOfInterest
