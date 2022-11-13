import { Box, useBreakpointValue, Button, Center, Image, Link, SimpleGrid, Spinner, Tag, Text } from "@chakra-ui/react"
import { CARD_QUEUE } from "src/components/dating/shared/card_queue"
import { INTERESTS } from "src/components/dating/shared/interests"
import TinderCard from "react-tinder-card"
import DatingAppBody from "src/components/dating/DatingAppBody"
import React, { useState, useMemo, useRef, FC } from "react"
import { AiOutlineHeart, AiOutlineStop } from "react-icons/ai"
import { motion, useAnimation } from "framer-motion"
import ProfileImg from "../../components/dating/pic/profile.png"

const DatingRandomization = () => {
    const isMobile = useBreakpointValue({
        base: true,
        md: false,
    })

    const [currentIndex, setCurrentIndex] = useState(CARD_QUEUE.length - 1)
    const characters = CARD_QUEUE
    const interests = INTERESTS
    const currentIndexRef = useRef(currentIndex)
    const controlCross = useAnimation()
    const controlHeart = useAnimation()

    const childRefs: React.RefObject<any>[] = useMemo(
        () =>
            Array(CARD_QUEUE.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canSwipe = currentIndex >= 0

    const swiped = (direction: string, nameToDelete: string, index: number) => {
        console.log("Swiping " + nameToDelete + " to the " + direction)
        if (direction === "left") {
            controlCross.start("visible")
        } else if (direction === "right") {
            controlHeart.start("visible")
        }

        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name: string, idx: number) => {
        console.log(`${name} (${idx}) left the screen!` + currentIndexRef.current)
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }

    const swipe = async (dir: string) => {
        if (canSwipe && currentIndex < CARD_QUEUE.length) {
            await childRefs[currentIndex].current.swipe(dir)
        }
    }

    return (
        <DatingAppBody userSelect="none">
            <SimpleGrid overflow="hidden">
                <Box>
                    <Box className="cardContainer">
                        <Center>
                            <Box
                                borderRadius="10px"
                                w="326px"
                                h="402px"
                                pl="1rem"
                                position="absolute"
                                top="114px"
                                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                display="flex"
                                alignItems="end"
                                justifyContent="end"
                            />
                        </Center>
                        {characters.map((character, index) => (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 360,
                                    damping: 20,
                                }}
                            >
                                <TinderCard
                                    ref={childRefs[index]}
                                    className="swipe"
                                    key={character.UserId}
                                    onSwipe={(dir: string) => swiped(dir, character.Fname + " " + character.Lname, index)}
                                    onCardLeftScreen={() => outOfFrame(character.Fname + " " + character.Lname, index)}
                                    preventSwipe={["down", "up"]}
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
                                            display="flex"
                                            alignItems="end"
                                            justifyContent="end"
                                            cursor="ew-resize"
                                        >
                                            <Link href="../../user">
                                                <Button
                                                    aria-label="User Profile"
                                                    className="pressable"
                                                    w="50px"
                                                    h="50px"
                                                    colorScheme="orange"
                                                    borderRadius="full"
                                                    mr="10px"
                                                    mb="10px"
                                                >
                                                    <Image className="pressable" src={ProfileImg}></Image>
                                                </Button>
                                            </Link>
                                        </Box>
                                    </Center>
                                </TinderCard>
                            </motion.div>
                        ))}
                    </Box>
                </Box>
                {characters[currentIndex] != null ? (
                    <>
                        <Box pt="468px">
                            <motion.div
                                key={currentIndex}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 360,
                                    damping: 20,
                                }}
                            >
                                <Box display="flex">
                                    <Text color="black" fontWeight="700" fontSize="20px" lineHeight="120%" pl="18px">
                                        {characters[currentIndex].Fname.length >= 15
                                            ? characters[currentIndex].Fname.substring(0, 15).concat("...")
                                            : characters[currentIndex].Fname}{" "}
                                        {characters[currentIndex].Lname.substring(0, 1)}.
                                    </Text>

                                    <Text color="black" fontWeight="400" fontSize="20px" lineHeight="120%" pl="18px">
                                        {characters[currentIndex].Gender}, {characters[currentIndex].Age}
                                    </Text>
                                </Box>
                            </motion.div>
                        </Box>
                        <motion.div
                            key={currentIndex}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                        >
                            <Box color="black" fontWeight="400" fontSize="20px" lineHeight="120%">
                                <Text pl="18px" pt="10px">
                                    {characters[currentIndex].Faculty.length >= 30
                                        ? characters[currentIndex].Faculty.substring(0, 30).trim().concat("...")
                                        : characters[currentIndex].Faculty}
                                </Text>
                            </Box>
                        </motion.div>
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
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        style={{ display: "inline-block" }}
                                        whileTap={{ scale: 1.2 }}
                                        key={id}
                                        transition={{
                                            type: "spring",
                                            stiffness: 360,
                                            damping: 20,
                                        }}
                                    >
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
                                    </motion.div>
                                ))}
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Box height="596px" pb="150px" display="flex" alignItems="center" justifyContent="center">
                        <Spinner size="xl" />
                    </Box>
                )}
                <Center display="flex" pl="18px">
                    <motion.div
                        style={{
                            marginRight: "58px",
                            width: "80px",
                            height: "80px",
                            borderRadius: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#FFF2E6",
                        }}
                        animate={controlCross}
                        onClick={() => swipe("left")}
                        variants={{
                            visible: {
                                scale: [1, 0.8, 1],
                                backgroundColor: ["#FFF2E6", "#E6702E", "#FFF2E6"],
                                transition: {
                                    duration: 0.4,
                                    ease: [0.075, 0.82, 0.165, 1],
                                },
                            },
                        }}
                    >
                        <AiOutlineStop size="62px" color="black" />
                    </motion.div>

                    <motion.div
                        style={{
                            marginLeft: "58px",
                            width: "80px",
                            height: "80px",
                            borderRadius: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#FFF2E6",
                        }}
                        animate={controlHeart}
                        onClick={() => swipe("right")}
                        variants={{
                            visible: {
                                scale: [1, 0.8, 1],
                                backgroundColor: ["#FFF2E6", "#E6702E", "#FFF2E6"],
                                transition: {
                                    duration: 0.4,
                                    ease: [0.075, 0.82, 0.165, 1],
                                },
                            },
                        }}
                    >
                        <AiOutlineHeart size="62px" color="black" />
                    </motion.div>
                </Center>
            </SimpleGrid>
        </DatingAppBody>
    )
}

export default DatingRandomization
