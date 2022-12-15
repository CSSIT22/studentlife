import { Box, Button, Center, Image, ResponsiveValue, SimpleGrid, Text, useBoolean, useToast } from "@chakra-ui/react"
import DatingAppBody from "src/components/dating/DatingAppBody"
import React, { useState, useMemo, useRef, FC, RefObject, useEffect } from "react"
import { AnimationControls, useAnimation } from "framer-motion"
import DatingRandomTag from "src/components/dating/DatingRandomTag"
import DatingRandomCrossButton from "src/components/dating/DatingRandomCrossButton"
import DatingRandomHeartButton from "src/components/dating/DatingRandomHeartButton"
import DatingRandomDetails from "src/components/dating/DatingRandomDetails"
import DatingRandomBase from "src/components/dating/DatingRandomBase"
import TinderCard from "react-tinder-card"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import ProfileImg from "../../components/dating/pic/profile.png"
import API from "src/function/API"
import { AllInterests, UserCardDetail } from "@apiType/dating"
import NoProfileImg from "../../components/dating/pic/noprofile.png"
import DatingRandomOutOfCard from "src/components/dating/DatingRandomOutOfCard"

declare global {
    var countSwipe: number[], countOut: number[]
}

const RandomCardInside: FC<{
    childRefs: RefObject<any>[]
    index: number
    character: UserCardDetail
    likeText: AnimationControls
    nopeText: AnimationControls
    pointerEvents: ResponsiveValue<any>
}> = ({ childRefs, index, character, likeText, nopeText, pointerEvents }) => {

    let backgroundImage;
    if (character.image) {
        backgroundImage = (import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + character.userId
    }
    else {
        backgroundImage = NoProfileImg
    }

    let linkto = "../../user/" + character.userId

    return (
        <Box
            ref={childRefs[index]}
            id={index.toString()}
            borderRadius="10px"
            backgroundColor="orange.100"
            backgroundImage={backgroundImage}
            w={{ base: "326px", md: "379px" }}
            h={{ base: "402px", md: "464px" }}
            backgroundSize="cover"
            backgroundPosition="center"
            className="card"
            position="absolute"
            top="30px"
            cursor="pointer"
            pointerEvents={pointerEvents}
        >
            <Box display="flex">
                <motion.div
                    key={index}
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
                            opacity: 0,
                            transition: {
                                duration: 0.001,
                            },
                        },
                        click: {
                            scale: 1,
                            opacity: 1,
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
                            opacity: 0,
                            transition: {
                                duration: 0.001,
                            },
                        },
                        click: {
                            scale: 1,
                            opacity: 1,
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
                <Link to={linkto}>
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

const DatingRandomCard: FC<{
    character: UserCardDetail
    index: number
    currentIndex: number
    controlCross: AnimationControls
    controlHeart: AnimationControls
    childRefs: React.RefObject<any>[]
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
    characters: UserCardDetail[]
    setHasSwipe: React.Dispatch<React.SetStateAction<boolean>>
    setIsRunOut: React.Dispatch<React.SetStateAction<boolean>>
    setIsError: React.Dispatch<React.SetStateAction<boolean>>
    isError: boolean
    countSwipe: number[]
    countOut: number[]
}> = ({ character, index, currentIndex, controlCross, controlHeart, childRefs, setCurrentIndex, characters, setHasSwipe, setIsRunOut, setIsError, isError, countOut, countSwipe }) => {

    // Mutable current index
    const currentIndexRef = useRef(currentIndex)
    const likeText = useAnimation()
    const nopeText = useAnimation()
    const navigate = useNavigate()

    const swiped = (direction: string, idToDelete: string, index: number) => {
        if (countSwipe[index] == 1) {
            countSwipe[index]--
            console.log(idToDelete + " " + index)
            handleClick(index)
            setHasSwipe(true)
            if (direction === "left") {
                API.post<{ anotherUserId: string, isSkipped: boolean, }>("/dating/discovery/setHeartHistory", { anotherUserId: idToDelete, isSkipped: true })
                    .catch((err) => setIsError(true))
                // Run the cross button animation
                nopeText.start("click")
                controlCross.start("hidden")
            } else if (direction === "right") {
                API.post<{ anotherUserId: string, isSkipped: boolean, }>("/dating/discovery/setHeartHistory", { anotherUserId: idToDelete, isSkipped: false })
                    .catch((err) => setIsError(true))
                // Run the heart button animation
                likeText.start("click")
                controlHeart.start("hidden")
            }
            if (index == 0) {
                setIsRunOut(true)
            }
            updateCurrentIndex(index - 1)
        }
    }

    const outOfFrame = (name: string, idx: number) => {
        if (countOut[index] == 1) {
            countOut[index]--
            console.log(name + " " + index)
            currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
            let frontCard = document.getElementById(idx.toString()) as HTMLInputElement
            frontCard.style.display = "none"
            // Reload the page when running out of card
            if (idx == 0 && !isError) {
                navigate(0)
            }
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
            nopeText.start("visible")
        } else if (dir === "right") {
            controlCross.start("hidden")
            controlHeart.start("visible")
            likeText.start("visible")
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
        // Tinder card that stacks on each other
        <TinderCard
            ref={childRefs[index]}
            className="swipe"
            onSwipe={(dir: string) => swiped(dir, character.userId, index)}
            onCardLeftScreen={() => outOfFrame(character.fName, index)}
            preventSwipe={["down", "up"]}
            swipeRequirementType="position"
            swipeThreshold={75}
            onSwipeRequirementFulfilled={(dir: string) => ChangeButtonColor(dir)}
            onSwipeRequirementUnfulfilled={() => RevertButtonColor()}
        >
            <Center>
                {/* Picture in the card */}
                {characters.length - 1 == index ? (
                    <RandomCardInside
                        childRefs={childRefs}
                        index={index}
                        character={character}
                        likeText={likeText}
                        nopeText={nopeText}
                        pointerEvents="initial"
                    />
                ) : (
                    <RandomCardInside
                        childRefs={childRefs}
                        index={index}
                        character={character}
                        likeText={likeText}
                        nopeText={nopeText}
                        pointerEvents="none"
                    />
                )}
            </Center>
        </TinderCard>
    )
}

const DatingRandomization = () => {
    const didMount = useDidMount()
    const navigate = useNavigate()
    const [characters, setCharacters] = useState<UserCardDetail[]>([])
    const [allInterests, setAllInterests] = useState<AllInterests[]>([])
    const [numOfChar, setNumOfChar] = useState(-1)
    const [isLoading, { off }] = useBoolean(true)
    const [hasSwipe, setHasSwipe] = useState(false)
    const [isRunOut, setIsRunOut] = useState(false)
    const [isError, setIsError] = useState(false)
    const toast = useToast()
    let count = 1
    useEffect(() => {
        if (didMount && count == 1) {
            count = count - 1
            API.get("/dating/discovery/getCards").then((user) => {
                let data = user.data
                setCharacters(data)
                setNumOfChar(data.length)
                globalThis.countSwipe = Array(50).fill(1)
                globalThis.countOut = Array(50).fill(1)
                API.get("/dating/discovery/getAllInterest").then((interest) => {
                    setAllInterests(interest.data)
                })
                setCurrentIndex(data.length - 1)
                API.get("/dating/verifyEnroll/getDatingEnroll").then((datingEnroll) => {
                    API.get("/dating/verifyEnroll/getDatingOptions")
                        .then((datingOptions) => {
                            if (!datingEnroll.data.hasCompleteTutorial) {
                                toast({
                                    title: "Welcome!",
                                    status: "info",
                                    duration: 5000,
                                    isClosable: true,
                                    position: "top",
                                    description: "Complete the tutorial, option setting, and interests selection to start using Dating & Finding Friend."
                                })
                                navigate("/dating/tutorial");
                            }
                            else if (!datingOptions.data.userId) {
                                navigate("/dating/option")
                                toast({
                                    title: "Option Setting Incomplete!",
                                    status: "warning",
                                    duration: 5000,
                                    isClosable: true,
                                    position: "top",
                                    description: "You are required to set your option first before using Dating & Finding Friend."
                                })
                            }
                            else if (!datingEnroll.data.hasCompleteSetting) {
                                toast({
                                    title: "Interests Selection Incomplete!",
                                    status: "warning",
                                    duration: 5000,
                                    isClosable: true,
                                    position: "top",
                                    description: "You are required to skip or select your interests first before using Dating & Finding Friend."
                                })
                                navigate("/dating/interests")
                            }

                        })
                })
            }).catch((err) => setIsError(true)).finally(off)
        }
    })

    function useDidMount() {
        const [didMount, setDidMount] = useState(true)
        useEffect(() => {
            setDidMount(false)
        }, [])

        return didMount
    }

    // used to determine the current index of the card
    const [currentIndex, setCurrentIndex] = useState(numOfChar - 1)


    // animation for the buttons
    const controlCross = useAnimation()
    const controlHeart = useAnimation()

    // used for the tinder card
    const childRefs: React.RefObject<any>[] = useMemo(
        () =>
            Array(50)
                .fill(0)
                .map(() => React.createRef()),
        []
    )

    // condition for swiping
    const canSwipe = currentIndex >= 0

    // used for swiping with buttons
    const swipe = async (dir: string) => {
        if (canSwipe && currentIndex < numOfChar && !isError) {
            await childRefs[currentIndex].current.swipe(dir)
        }
    }

    return (
        // userSelect = none => prevent users from accidentally select texts
        <DatingAppBody userSelect="none">
            <><SimpleGrid overflow={{ base: "hidden", md: "visible" }} columns={{ base: 1, md: 2 }} h={{ base: "600px", md: "530px" }}>
                <Box className="cardContainer" overflow="hidden" w={{ md: "379px" }} h={{ base: "440px", md: "auto" }}>
                    {/* base to show shadow, reloading icon when running out of card */}
                    <DatingRandomBase numOfChar={numOfChar} hasSwipe={hasSwipe} isRunOut={isRunOut} isError={isError} />
                    {!isError ?
                        characters.map((character, index) => (
                            <DatingRandomCard
                                key={index}
                                character={character}
                                index={index}
                                currentIndex={currentIndex}
                                controlCross={controlCross}
                                controlHeart={controlHeart}
                                childRefs={childRefs}
                                setCurrentIndex={setCurrentIndex}
                                characters={characters}
                                setHasSwipe={setHasSwipe}
                                setIsRunOut={setIsRunOut}
                                setIsError={setIsError}
                                isError={isError}
                                countSwipe={globalThis.countSwipe}
                                countOut={globalThis.countOut}
                            />
                        )) : <></>}
                </Box>
                {!isLoading && !isError &&
                    characters[currentIndex] != null ? (
                    <Box>
                        {/* Name, age, gender, and faculty */}
                        <DatingRandomDetails characters={characters} currentIndex={currentIndex} />
                        {/* Must have 2 boxs to hide the scroll bar in mobile */}
                        <Box pb="5" pl="18px" pt="20px" height="70px" overflow={{ base: "hidden", md: "visible" }}>
                            <Box
                                height="70px"
                                pt="5px"
                                overflowX={{ base: "auto", md: "visible" }}
                                whiteSpace={{ base: "nowrap", md: "initial" }}
                                style={{ WebkitOverflowScrolling: "touch" }}
                            >
                                {characters[currentIndex].interests.map((interestId, index) => (
                                    // Show user's tags of interest
                                    <DatingRandomTag key={index} id={interestId} index={index} allInterests={allInterests} />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <DatingRandomOutOfCard numOfChar={numOfChar} isError={isError} currentIndex={currentIndex} isLoading={isLoading} />
                )}
            </SimpleGrid>
                <Box display="flex" pl={{ base: "18px", md: "55px" }} justifyContent={{ base: "center", md: "start" }} id="DatingButton">
                    {/* Cross button */}
                    <DatingRandomCrossButton controlCross={controlCross} swipe={swipe} />
                    {/* Heart button */}
                    <DatingRandomHeartButton controlHeart={controlHeart} swipe={swipe} />
                </Box></>

        </DatingAppBody>
    )
}

export default DatingRandomization
