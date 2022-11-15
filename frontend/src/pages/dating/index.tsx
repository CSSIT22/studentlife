import { Box, SimpleGrid } from "@chakra-ui/react"
import { CARD_QUEUE } from "src/components/dating/shared/card_queue"
import DatingAppBody from "src/components/dating/DatingAppBody"
import React, { useState, useMemo } from "react"
import { useAnimation } from "framer-motion"
import DatingRandomTag from "src/components/dating/DatingRandomTag"
import DatingRandomCrossButton from "src/components/dating/DatingRandomCrossButton"
import DatingRandomHeartButton from "src/components/dating/DatingRandomHeartButton"
import DatingRandomDetails from "src/components/dating/DatingRandomDetails"
import DatingRandomCard from "src/components/dating/DatingRandomCard"
import DatingRandomBase from "src/components/dating/DatingRandomBase"

const DatingRandomization = () => {
    // used to determine the current index of the card
    const [currentIndex, setCurrentIndex] = useState(CARD_QUEUE.length - 1)
    // retrieved from database
    const characters = CARD_QUEUE

    // animation for the buttons
    const controlCross = useAnimation()
    const controlHeart = useAnimation()

    // used for the tinder card
    const childRefs: React.RefObject<any>[] = useMemo(
        () =>
            Array(CARD_QUEUE.length)
                .fill(0)
                .map(() => React.createRef()),
        []
    )

    // condition for swiping
    const canSwipe = currentIndex >= 0

    // used for swiping with buttons
    const swipe = async (dir: string) => {
        if (canSwipe && currentIndex < CARD_QUEUE.length) {
            await childRefs[currentIndex].current.swipe(dir)
        }
    }

    return (
        // userSelect = none => prevent users from accidentally select texts
        <DatingAppBody userSelect="none">
            <SimpleGrid overflow={{ base: "hidden", md: "visible" }} columns={{ base: 1, md: 2 }} h={{ base: "600px", md: "530px" }}>
                <Box className="cardContainer" overflow={{ base: "visible", md: "hidden" }} w={{ md: "379px" }}>
                    {/* base to show shadow, reloading icon when running out of card */}
                    <DatingRandomBase />
                    {characters.map((character, index) => (
                        // Tinder card that stacks on each other
                        <DatingRandomCard
                            key={index}
                            childRefs={childRefs}
                            index={index}
                            character={character}
                            controlCross={controlCross}
                            controlHeart={controlHeart}
                            setCurrentIndex={setCurrentIndex}
                            currentIndex={currentIndex}
                        />
                    ))}
                </Box>
                {/* Must have this condition to prevent crash!!! */}
                {characters[currentIndex] != null ? (
                    <Box>
                        {/* Name, age, gender, and faculty */}
                        <DatingRandomDetails characters={characters} currentIndex={currentIndex} />
                        {/* Must have 2 boxs to hide the scroll bar in mobile */}
                        <Box pb="5" pl="18px" pt="20px" height="70px" overflow={{ base: "hidden", md: "visible" }}>
                            <Box
                                height="105px"
                                overflowX={{ base: "auto", md: "visible" }}
                                whiteSpace={{ base: "nowrap", md: "initial" }}
                                style={{ WebkitOverflowScrolling: "touch" }}
                            >
                                {characters[currentIndex].interestId.map((id) => (
                                    // Show user's tags of interest
                                    <DatingRandomTag id={id} />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    // Need to have this tag to prevent IDE error
                    <></>
                )}
            </SimpleGrid>
            <Box display="flex" pl={{ base: "18px", md: "55px" }} justifyContent={{ base: "center", md: "start" }}>
                {/* Cross button */}
                <DatingRandomCrossButton controlCross={controlCross} swipe={swipe} />
                {/* Heart button */}
                <DatingRandomHeartButton controlHeart={controlHeart} swipe={swipe} />
            </Box>
        </DatingAppBody>
    )
}

export default DatingRandomization
