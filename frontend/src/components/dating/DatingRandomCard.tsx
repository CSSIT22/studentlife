import { Box, Button, Center, Image, Link } from "@chakra-ui/react"
import { AnimationControls } from "framer-motion"
import { Dispatch, FC, useRef } from "react"
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
}> = ({ childRefs, index, character, controlCross, controlHeart, setCurrentIndex, currentIndex }) => {
    const currentIndexRef = useRef(currentIndex)
    const swiped = (direction: string, nameToDelete: string, index: number) => {
        console.log("Swiping " + nameToDelete + " to the " + direction)
        if (direction === "left") {
            controlCross.start("visible")
        } else if (direction === "right") {
            controlHeart.start("visible")
        }

        updateCurrentIndex(index - 1)
    }

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val)
        currentIndexRef.current = val

        if (val == -1) {
            setTimeout(() => location.reload(), 1000)
        }
    }

    return (
        <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.UserId}
            onSwipe={(dir: string) => swiped(dir, character.Fname + " " + character.Lname, index)}
            preventSwipe={["down", "up"]}
        >
            <Center>
                <Box
                    borderRadius="10px"
                    backgroundImage={character.url}
                    w={{ base: "326px", md: "379px" }}
                    h={{ base: "402px", md: "464px" }}
                    backgroundSize="cover"
                    className="card"
                    id={character.UserId}
                    position="absolute"
                    top="30px"
                    display="flex"
                    alignItems="end"
                    justifyContent="end"
                    cursor="pointer"
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
    )
}

export default DatingRandomCard
