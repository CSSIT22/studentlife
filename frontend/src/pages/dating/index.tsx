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
import DatingRandomReload from "src/components/dating/DatingRandomReload"

const DatingRandomization = () => {
    const [currentIndex, setCurrentIndex] = useState(CARD_QUEUE.length - 1)
    const characters = CARD_QUEUE

    const controlCross = useAnimation()
    const controlHeart = useAnimation()

    const childRefs: React.RefObject<any>[] = useMemo(
        () =>
            Array(CARD_QUEUE.length)
                .fill(0)
                .map(() => React.createRef()),
        []
    )

    const canSwipe = currentIndex >= 0

    const swipe = async (dir: string) => {
        if (canSwipe && currentIndex < CARD_QUEUE.length) {
            await childRefs[currentIndex].current.swipe(dir)
        }
    }

    return (
        <DatingAppBody userSelect="none">
            <SimpleGrid overflow={{ base: "hidden", md: "visible" }} columns={{ base: 1, md: 2 }} h={{ base: "600px", md: "530px" }}>
                <Box className="cardContainer" overflow={{ base: "visible", md: "hidden" }} w={{ md: "379px" }}>
                    <DatingRandomReload />
                    {characters.map((character, index) => (
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
                {characters[currentIndex] != null ? (
                    <Box>
                        <DatingRandomDetails characters={characters} currentIndex={currentIndex} />
                        <Box pb="5" pl="18px" pt="20px" height="70px" overflow={{ base: "hidden", md: "visible" }}>
                            <Box
                                height="105px"
                                overflowX={{ base: "auto", md: "visible" }}
                                whiteSpace={{ base: "nowrap", md: "initial" }}
                                style={{ WebkitOverflowScrolling: "touch" }}
                            >
                                {characters[currentIndex].interestId.map((id) => (
                                    <DatingRandomTag id={id} />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <></>
                )}
            </SimpleGrid>
            <Box display="flex" pl={{ base: "18px", md: "55px" }} justifyContent={{ base: "center", md: "start" }}>
                <DatingRandomCrossButton controlCross={controlCross} swipe={swipe} />
                <DatingRandomHeartButton controlHeart={controlHeart} swipe={swipe} />
            </Box>
        </DatingAppBody>
    )
}

export default DatingRandomization
