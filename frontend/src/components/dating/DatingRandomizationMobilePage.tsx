import TinderCard from "react-tinder-card"
import { Box, Center, SimpleGrid, Tag, Text } from "@chakra-ui/react"
import DatingAppBody from "./DatingAppBody"
import React, { useState, useMemo, useRef, FC } from "react"
import { AiOutlineHeart, AiOutlineStop } from "react-icons/ai"

const DatingRandomizationMobilePage: FC<{
    CARD_QUEUE: { UserId: string; Fname: string; Lname: string; Gender: string; Age: string; Faculty: string; url: string; interestId: number[] }[]
    INTERESTS: { interestId: string; interestName: string }[]
}> = ({ CARD_QUEUE, INTERESTS }) => {
    const [currentIndex, setCurrentIndex] = useState(CARD_QUEUE.length - 1)
    const characters = CARD_QUEUE
    const interests = INTERESTS
    const currentIndexRef = useRef(currentIndex)
    const [lastDirection, setLastDirection] = useState()

    const childRefs: React.RefObject<any>[] = useMemo(
        () =>
            Array(CARD_QUEUE.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val: any) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canSwipe = currentIndex >= 0

    const swiped = (direction: any, nameToDelete: any, index: any) => {
        console.log("Swiping " + nameToDelete + " to the " + direction)
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name: any, idx: any) => {
        console.log(`${name} (${idx}) left the screen!` + currentIndexRef.current)
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }

    const swipe = async (dir: string) => {
        if (canSwipe && currentIndex < CARD_QUEUE.length) {
            await childRefs[currentIndex].current.swipe(dir)
        }
    }

    return (
        <DatingAppBody>
            <SimpleGrid overflow="hidden">
                <Box>
                    <Box className="cardContainer">
                        {characters.map((character, index) => (
                            <TinderCard
                                ref={childRefs[index]}
                                className="swipe"
                                key={character.UserId}
                                onSwipe={(dir: any) => swiped(dir, character.Fname + " " + character.Lname, index)}
                                onCardLeftScreen={() => outOfFrame(character.Fname + " " + character.Lname, index)}
                                preventSwipe={["down", "up"]}
                                swipeThreshold={1}
                            >
                                <Center>
                                    <Box
                                        borderRadius="10px"
                                        backgroundImage={character.url}
                                        w="326px"
                                        h="402px"
                                        backgroundSize="cover"
                                        className="card"
                                        pl="1rem"
                                        id={character.UserId}
                                        position="absolute"
                                        top="30px"
                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                    ></Box>
                                </Center>
                            </TinderCard>
                        ))}
                    </Box>
                </Box>
                {characters[currentIndex] != null ? (
                    <>
                        <Box display="flex">
                            <Text color="black" fontWeight="700" fontSize="20px" lineHeight="120%" pt="468px" pl="18px">
                                {characters[currentIndex].Fname.length >= 15
                                    ? characters[currentIndex].Fname.substring(0, 15).concat("...")
                                    : characters[currentIndex].Fname}{" "}
                                {characters[currentIndex].Lname.substring(0, 1)}.
                            </Text>
                            <Text color="black" fontWeight="400" fontSize="20px" lineHeight="120%" pt="468px" pl="18px">
                                {characters[currentIndex].Gender}, {characters[currentIndex].Age}
                            </Text>
                        </Box>
                        <Box color="black" fontWeight="400" fontSize="20px" lineHeight="120%">
                            <Text pl="18px" pt="10px">
                                {characters[currentIndex].Faculty.length >= 30
                                    ? characters[currentIndex].Faculty.substring(0, 30).trim().concat("...")
                                    : characters[currentIndex].Faculty.trim()}
                            </Text>
                        </Box>
                        <Box height="70px" overflow="hidden">
                            <Box
                                pb="5"
                                height="105px"
                                pl="18px"
                                pt="20px"
                                overflowX="auto"
                                whiteSpace="nowrap"
                                style={{ WebkitOverflowScrolling: "touch" }}
                            >
                                {characters[currentIndex].interestId.map((id) => (
                                    <Tag
                                        backgroundColor="orange.600"
                                        color="white"
                                        mr="0.5"
                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                    >
                                        <Text mt="5px" mb="5px" ml="12px" mr="12px" fontWeight="400" fontSize="12px" lineHeight="150%">
                                            {
                                                interests[characters[currentIndex].interestId[characters[currentIndex].interestId.indexOf(id)]]
                                                    .interestName
                                            }
                                        </Text>
                                    </Tag>
                                ))}
                            </Box>
                        </Box>
                        <Center display="flex" pt="18px" pl="18px">
                            <Box onClick={() => swipe("left")} pr="72px">
                                <AiOutlineStop size="62px" color="black" />
                            </Box>
                            <Box onClick={() => swipe("right")} pl="72px">
                                <AiOutlineHeart size="62px" color="black" />
                            </Box>
                        </Center>
                    </>
                ) : (
                    <>
                        {" "}
                        <Center display="flex" pt="614px" pl="18px">
                            <Box onClick={() => swipe("left")} pr="72px">
                                <AiOutlineStop size="62px" color="black" />
                            </Box>
                            <Box onClick={() => swipe("right")} pl="72px">
                                <AiOutlineHeart size="62px" color="black" />
                            </Box>
                        </Center>
                    </>
                )}
            </SimpleGrid>
        </DatingAppBody>
    )
}

export default DatingRandomizationMobilePage
