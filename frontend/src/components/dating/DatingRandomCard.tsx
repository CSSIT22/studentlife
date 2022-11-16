import { Box, Button, Center, Image, Text } from "@chakra-ui/react"
import { AnimationControls, useAnimation } from "framer-motion"
import { FC, useRef } from "react"
import { Link } from "react-router-dom"
import TinderCard from "react-tinder-card"
import ProfileImg from "../../components/dating/pic/profile.png"
import { motion } from "framer-motion"

const DatingRandomCard: FC<{
    childRefs: React.RefObject<any>[]
    index: number
    character: {
        UserId: string
        Fname: string
        Lname: string
        Gender: string
        Age: string
        Faculty: string
        url: string
        interestId: number[]
    }
    controlCross: AnimationControls
    controlHeart: AnimationControls
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
    currentIndex: number
    numOfCharacter: number
}> = ({ childRefs, index, character, controlCross, controlHeart, setCurrentIndex, currentIndex, numOfCharacter }) => {
    const RandomCard: FC<{ pointerEvents: any }> = ({ pointerEvents }) => {
        return (
            <Box
                ref={childRefs[index]}
                id={index.toString()}
                borderRadius="10px"
                backgroundImage={character.url}
                w={{ base: "326px", md: "379px" }}
                h={{ base: "402px", md: "464px" }}
                backgroundSize="cover"
                className="card"
                position="absolute"
                top="30px"
                cursor="pointer"
                pointerEvents={pointerEvents}
            >
                <Box display="flex">
                    <motion.div
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={likeText}
                        variants={{
                            visible: {
                                scale: [1.5, 1],
                                opacity: [0, 1],
                                transition: {
                                    duration: 0.1,
                                },
                            },
                            hidden: {
                                scale: 1.5,
                                opacity: [1, 0],
                                transition: {
                                    duration: 0.001,
                                },
                            },
                        }}
                    >
                        <Box
                            w="150px"
                            transform="rotate(330deg)"
                            borderWidth="6px"
                            borderColor="green.400"
                            borderRadius="10px"
                            p="3"
                            mt="45px"
                            ml={{ base: "13px", md: "20px" }}
                            boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                        >
                            <Text textAlign="center" color="green.400" fontWeight="700" fontSize="36px" lineHeight="100%">
                                LIKE
                            </Text>
                        </Box>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={nopeText}
                        variants={{
                            visible: {
                                scale: [1.5, 1],
                                opacity: [0, 1],
                                transition: {
                                    duration: 0.1,
                                },
                            },
                            hidden: {
                                scale: 1.5,
                                opacity: [1, 0],
                                transition: {
                                    duration: 0.001,
                                },
                            },
                        }}
                    >
                        <Box
                            w="150px"
                            transform="rotate(30deg)"
                            borderWidth="6px"
                            borderColor="orange.400"
                            borderRadius="10px"
                            p="3"
                            mt="45px"
                            ml={{ md: "40px" }}
                            boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                        >
                            <Text textAlign="center" color="orange.400" fontWeight="700" fontSize="36px" lineHeight="100%">
                                NOPE
                            </Text>
                        </Box>
                    </motion.div>
                </Box>

                {/* Profile button to go into user's profile */}
                <Box w="100%" display="flex" alignItems="end" justifyContent="end" mt={{ base: "220px", md: "280px" }}>
                    <Link to="../../user">
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
                            <Image w="20px" className="pressable" src={ProfileImg}></Image>
                        </Button>
                    </Link>
                </Box>
            </Box>
        )
    }
    // Mutable current index
    const currentIndexRef = useRef(currentIndex)
    const likeText = useAnimation()
    const nopeText = useAnimation()
    // Swipe the card
    const swiped = (direction: string, nameToDelete: string, index: number) => {
        console.log("Swiping " + nameToDelete + " to the " + direction)
        handleClick(currentIndex)
        if (direction === "left") {
            // Run the cross button animation
            controlCross.start("hidden")
        } else if (direction === "right") {
            // Run the heart button animation
            controlHeart.start("hidden")
        }
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name: string, idx: number) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
        let frontCard = document.getElementById(index.toString()) as HTMLInputElement
        frontCard.style.display = "none"
        // Reload the page when running out of card
        if (idx == 0) {
            window.location.reload()
        }
    }

    const handleClick = (index: number) => {
        let frontCard = document.getElementById(index.toString()) as HTMLInputElement
        frontCard.style.pointerEvents = "none"
        let backCard = document.getElementById((index - 1).toString()) as HTMLInputElement
        if (backCard) {
            backCard.style.pointerEvents = "initial"
        }
    }

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const ChangeButtonColor = (dir: string) => {
        if (dir == "left") {
            controlHeart.start("hidden")
            controlCross.start("visible")
            likeText.start("hidden")
            nopeText.start("visible")
        } else if (dir === "right") {
            controlCross.start("hidden")
            controlHeart.start("visible")
            likeText.start("visible")
            nopeText.start("hidden")
        } else if (dir === "up" || dir === "down") {
            controlCross.start("hidden")
            controlHeart.start("hidden")
            likeText.start("hidden")
            nopeText.start("hidden")
        }
    }

    const RevertButtonColor = () => {
        controlCross.start("hidden")
        controlHeart.start("hidden")
        likeText.start("hidden")
        nopeText.start("hidden")
    }

    return (
        <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.UserId}
            onSwipe={(dir: string) => swiped(dir, character.Fname + " " + character.Lname, index)}
            onCardLeftScreen={() => outOfFrame(character.Fname, index)}
            preventSwipe={["down", "up"]}
            swipeRequirementType="position"
            swipeThreshold={75}
            onSwipeRequirementFulfilled={(dir: string) => ChangeButtonColor(dir)}
            onSwipeRequirementUnfulfilled={() => RevertButtonColor()}
        >
            <Center>
                {/* Picture in the card */}
                {numOfCharacter - 1 == index ? <RandomCard pointerEvents="initial" /> : <RandomCard pointerEvents="none" />}
            </Center>
        </TinderCard>
    )
}

export default DatingRandomCard
