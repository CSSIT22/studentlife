import { Box, Button, Center, Image, ResponsiveValue, SimpleGrid, Text, useBoolean } from "@chakra-ui/react"
import { CARD_QUEUE } from "src/components/dating/shared/card_queue"
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

const RandomCardInside: FC<{
    childRefs: RefObject<any>[]
    index: number
    character: UserCardDetail
    likeText: AnimationControls
    nopeText: AnimationControls
    pointerEvents: ResponsiveValue<any>
}> = ({ childRefs, index, character, likeText, nopeText, pointerEvents }) => {
    return (
        <Box
            ref={childRefs[index]}
            id={index.toString()}
            borderRadius="10px"
            backgroundColor="gray"
            backgroundImage={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + character?.userId}
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

const DatingRandomCard: FC<{
    character: UserCardDetail
    index: number
    currentIndex: number
    controlCross: AnimationControls
    controlHeart: AnimationControls
    childRefs: React.RefObject<any>[]
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
    characters: UserCardDetail[]
}> = ({ character, index, currentIndex, controlCross, controlHeart, childRefs, setCurrentIndex, characters }) => {
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
            nopeText.start("click")
            controlCross.start("hidden")
        } else if (direction === "right") {
            // Run the heart button animation
            likeText.start("click")
            controlHeart.start("hidden")
        }
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name: string, idx: number) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
        let frontCard = document.getElementById(idx.toString()) as HTMLInputElement
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
            key={character.userId}
            onSwipe={(dir: string) => swiped(dir, character.fName + " " + character.lName, index)}
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
    const [numOfChar, setNumOfChar] = useState(characters.length)
    const [isLoading, { off }] = useBoolean(true)
    let count = 1
    useEffect(() => {
        if (didMount && count == 1) {
            count = count - 1
            API.get("/dating/discovery/getCards").then((user) => {
                let data = user.data
                var currentIndex = data.length, temporaryValue, randomIndex;
                while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = data[currentIndex];
                    data[currentIndex] = data[randomIndex];
                    data[randomIndex] = temporaryValue;
                }
                setCharacters(data)
                setNumOfChar(data.length)
                API.get("/dating/discovery/getAllInterest").then((interest) => {
                    setAllInterests(interest.data)
                })
                setCurrentIndex(data.length - 1)
                API.get("/dating/verifyEnroll/getDatingEnroll").then((datingEnroll) => {
                    API.get("/dating/verifyEnroll/getDatingOptions")
                        .then((datingOptions) => {
                            if (!datingEnroll.data.hasCompleteSetting) {
                                navigate("/dating/interests")
                                if (!datingOptions.data.userId) {
                                    // navigate("/dating/option")
                                    if (!datingEnroll.data.hasCompleteTutorial) {
                                        navigate("/dating/tutorial");
                                    }
                                }
                            }
                        })
                })
            console.log("test")
            }).catch((err) => console.log(err)).finally(off)
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
            Array(20)
                .fill(0)
                .map(() => React.createRef()),
        []
    )

    // condition for swiping
    const canSwipe = currentIndex >= 0

    // used for swiping with buttons
    const swipe = async (dir: string) => {
        if (canSwipe && currentIndex < numOfChar) {
            await childRefs[currentIndex].current.swipe(dir)
        }
    }

    return (
        // userSelect = none => prevent users from accidentally select texts
        <DatingAppBody userSelect="none">
            {isLoading && didMount ? <></> : <><SimpleGrid overflow={{ base: "hidden", md: "visible" }} columns={{ base: 1, md: 2 }} h={{ base: "600px", md: "530px" }}>
                <Box className="cardContainer" overflow="hidden" w={{ md: "379px" }} h={{ base: "440px", md: "auto" }}>
                    {/* base to show shadow, reloading icon when running out of card */}
                    <DatingRandomBase />
                    {characters.map((character, index) => (
                        <DatingRandomCard
                            character={character}
                            index={index}
                            currentIndex={currentIndex}
                            controlCross={controlCross}
                            controlHeart={controlHeart}
                            childRefs={childRefs}
                            setCurrentIndex={setCurrentIndex}
                            characters={characters}
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
                                height="70px"
                                pt="5px"
                                overflowX={{ base: "auto", md: "visible" }}
                                whiteSpace={{ base: "nowrap", md: "initial" }}
                                style={{ WebkitOverflowScrolling: "touch" }}
                            >
                                {characters[currentIndex].interests.map((interestId, index) => (
                                    // Show user's tags of interest
                                    <DatingRandomTag id={interestId} index={index} allInterests={allInterests} />
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
                </Box></>}

        </DatingAppBody>
    )
}

export default DatingRandomization
