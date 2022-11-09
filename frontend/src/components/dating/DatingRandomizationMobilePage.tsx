import TinderCard from "react-tinder-card"
import { Box, Button, Center, Heading, Link, SimpleGrid, Tag, Text } from "@chakra-ui/react"
import DatingAppBody from "./DatingAppBody"
import { CARD_QUEUE } from "./shared/card_queue"
import React, { useState, useMemo, useRef } from "react"
import { AiOutlineHeart, AiOutlineStop } from "react-icons/ai"

const DatingRandomizationMobilePage = () => {
    const [currentIndex, setCurrentIndex] = useState(CARD_QUEUE.length - 1)
    const characters = CARD_QUEUE
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
                                key={character.name}
                                onSwipe={(dir: any) => swiped(dir, character.name, index)}
                                onCardLeftScreen={() => outOfFrame(character.name, index)}
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
                                        id={character.name}
                                        position="absolute"
                                        top="30px"
                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                    ></Box>
                                </Center>
                            </TinderCard>
                        ))}
                    </Box>
                </Box>
                <Box display="flex">
                    <Text fontFamily="Inter" fontStyle="normal" fontWeight="700" fontSize="20px" lineHeight="120%" pt="468px" pl="18px">
                        Firstname L.
                    </Text>
                    <Text fontFamily="Inter" fontStyle="normal" fontWeight="400" fontSize="20px" lineHeight="120%" pt="468px" pl="18px">
                        M , Age
                    </Text>
                </Box>
                <Box fontFamily="Inter" fontStyle="normal" fontWeight="400" fontSize="20px" lineHeight="120%">
                    <Text pl="18px" pt="10px">
                        Faculty
                    </Text>
                </Box>
                <Box pl="18px" pt="20px">
                    <Tag backgroundColor="orange.600" color="white" mr="0.5">
                        Tag
                    </Tag>
                    <Tag backgroundColor="orange.600" color="white" mr="0.5">
                        Tag
                    </Tag>
                    <Tag backgroundColor="orange.600" color="white" mr="0.5">
                        Tag
                    </Tag>
                    <Tag backgroundColor="orange.600" color="white" mr="0.5">
                        Tag
                    </Tag>
                    <Tag backgroundColor="orange.600" color="white" mr="0.5">
                        Tag
                    </Tag>
                </Box>
                <Center display="flex" pt="18px" pl="18px">
                    <Box onClick={() => swipe("left")} pr="72px">
                        <AiOutlineStop size="62px" />
                    </Box>
                    <Box onClick={() => swipe("right")} pl="72px">
                        <AiOutlineHeart size="62px" />
                    </Box>
                </Center>
            </SimpleGrid>
        </DatingAppBody>
    )
}

export default DatingRandomizationMobilePage
