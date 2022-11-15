import { Box, Button, Center, Image } from "@chakra-ui/react"
import { AnimationControls } from "framer-motion"
import { FC, useRef } from "react"
import { Link } from "react-router-dom"
import TinderCard from "react-tinder-card"
import ProfileImg from "../../components/dating/pic/profile.png"

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
    setCardQueue: React.Dispatch<
        React.SetStateAction<
            {
                UserId: string
                Fname: string
                Lname: string
                Gender: string
                Age: string
                Faculty: string
                url: string
                interestId: number[]
            }[]
        >
    >
    numOfCharacter: number
}> = ({ childRefs, index, character, controlCross, controlHeart, setCurrentIndex, currentIndex, setCardQueue, numOfCharacter }) => {
    // Mutable current index
    const currentIndexRef = useRef(currentIndex)
    // Swipe the card
    const swiped = (direction: string, nameToDelete: string, index: number) => {
        console.log("Swiping " + nameToDelete + " to the " + direction)
        if (direction === "left") {
            // Run the cross button animation
            controlCross.start("hidden")
        } else if (direction === "right") {
            // Run the heart button animation
            controlHeart.start("hidden")
        }
        updateCurrentIndex(index - 1)
        let frontCard = document.getElementById(index.toString()) as HTMLInputElement
        frontCard.style.pointerEvents = "none"
        let backCard = document.getElementById((index - 1).toString()) as HTMLInputElement
        if (backCard) {
            backCard.style.pointerEvents = "initial"
        }
        setTimeout(() => {
            if (frontCard) {
                frontCard.style.display = "none"
            }
        }, 500)
    }

    const outOfFrame = (name: string, idx: number) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
        // Reload the page when running out of card
        if (val == -1) {
            setTimeout(() => location.reload(), 1000)
        }
    }

    const ChangeButtonColor = (dir: string) => {
        if (dir == "left") {
            controlHeart.start("hidden")
            controlCross.start("visible")
        } else if (dir === "right") {
            controlCross.start("hidden")
            controlHeart.start("visible")
        } else if (dir === "up" || dir === "down") {
            controlCross.start("hidden")
            controlHeart.start("hidden")
        }
    }

    const RevertButtonColor = () => {
        controlCross.start("hidden")
        controlHeart.start("hidden")
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
                {numOfCharacter - 1 == index ? (
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
                        display="flex"
                        alignItems="end"
                        justifyContent="end"
                        cursor="pointer"
                    >
                        {/* Profile button to go into user's profile */}
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
                                <Image className="pressable" src={ProfileImg}></Image>
                            </Button>
                        </Link>
                    </Box>
                ) : (
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
                        display="flex"
                        alignItems="end"
                        justifyContent="end"
                        cursor="pointer"
                        pointerEvents="none"
                    >
                        {/* Profile button to go into user's profile */}
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
                                <Image className="pressable" src={ProfileImg}></Image>
                            </Button>
                        </Link>
                    </Box>
                )}
            </Center>
        </TinderCard>
    )
}

export default DatingRandomCard
