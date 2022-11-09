import TinderCard from "react-tinder-card"
import { Box, Center, SimpleGrid, Tag, Text } from "@chakra-ui/react"
import DatingAppBody from "./DatingAppBody"
import { CARD_QUEUE } from "./shared/card_queue"

const DatingRandomizationMobilePage = () => {
    const characters = CARD_QUEUE

    const swiped = (direction: any, nameToDelete: any) => {
        console.log("Swiping " + nameToDelete + " to the " + direction)
    }

    const outOfFrame = (name: any) => {
        console.log(name + " left the screen!")
    }

    return (
        <DatingAppBody>
            <SimpleGrid overflow="hidden">
                <Box>
                    <Box className="cardContainer">
                        {characters.map((character) => (
                            <TinderCard
                                className="swipe"
                                key={character.name}
                                onSwipe={(dir: any) => swiped(dir, character.name)}
                                onCardLeftScreen={() => outOfFrame(character.name)}
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
            </SimpleGrid>
        </DatingAppBody>
    )
}

export default DatingRandomizationMobilePage
