import { Heading, Stack, Text, Box, Image, Flex, Center, Container } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import AppBody from "./../../components/share/app/AppBody"
import { FRIEND } from "./../../components/dating/shared/friend"
import DatingRatingSearch from "src/components/dating/DatingRatingSearch"
import DatingRatingAllStar from "src/components/dating/DatingRatingAllStar"
import API from "src/function/API"
import { FollowDetail, RateFollow, RateStatus } from "@apiType/dating"
import NoProfileImg from "../../components/dating/pic/noprofile.png"

declare global {
    var rateStatus: RateStatus[], followR: RateFollow[]
}

const Rating = () => {
    // const [friend, setFriend] = useState(FRIEND)
    // const [followRate, setFollowRate] = useState<RateFollow[]>([])
    const [rate, setRate] = useState<RateStatus[]>([])
    const [friend, setFriend] = useState<FollowDetail[]>([])
    const [allFriend, setAllFriend] = useState<FollowDetail[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const didMount = useDidMount()
    let count = 1

    useEffect(() => {
        if (didMount && count != 0) {
            count--
            window.scrollTo(0, 0)
            API.get("/dating/rating/getUserProfile").then((followDB) => {
                setFriend(followDB.data)
                setAllFriend(followDB.data)
            })
                .catch((err) => console.log(err));
            API.get("/dating/rating/getRating").then((rating) => {
                handleGetRate(rating.data)
                console.log(rating.data)
            })
                .catch((err) => console.log(err));
            handleFollow()
        }

    })
    // let backgroundImage;
    // if (friend.image) {
    //     backgroundImage = (import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + character.userId
    // }
    // else {
    //     backgroundImage = NoProfileImg
    // }

    // let linkto = "../../user/" + friend.userId

    function handleFollow() {
        let arr: RateFollow[] = []
        for (let k = 0; k < allFriend.length; k++) {
            const obj = { userId: allFriend[k].following.userId, fName: allFriend[k].following.fName, lName: allFriend[k].following.lName, image: friend[k].following.image, score: 0 }
            arr.push(obj)
        }
        console.log("Before follow rate: " + arr[2].score)
        // Rate(arr)
        console.log("Follow rate: " + globalThis.followR)
        for (let i = 0; i < globalThis.rateStatus.length; i++) {
            for (let j = 0; j < allFriend.length; j++) {
                if (globalThis.rateStatus[i].anotherUserId === globalThis.followR[j].userId) {
                    globalThis.followR[j].score = globalThis.rateStatus[i].score
                }
            }
        }
    }

    function handleGetRate(r: any[]) {
        globalThis.rateStatus = []
        for (let i = 0; i < r.length; i++) {
            const obj = { anotherUserId: r[i].anotherUserId, score: r[i].score }
            globalThis.rateStatus.push(obj)
            // console.log("HOW? " + r[i].anotherUserId, r[i].score)
            console.log("VAL " + globalThis.rateStatus[i].anotherUserId + " " + globalThis.rateStatus[i].score);

        }
        console.log("Before rate " + globalThis.rateStatus[2].score)
        setRate(globalThis.rateStatus)
        // console.log("Arr " + arr[0].rates.anotherUserId + " " + arr[0].rates.score)
        console.log("My rate " + globalThis.rateStatus)
    }

    function useDidMount() {
        const [didMount, setDidMount] = useState(true)
        useEffect(() => {
            setDidMount(false)
        }, [])

        return didMount
    }

    return (
        <AppBody>
            <Box display="flex" justifyContent="center" mb={{ base: "150px", md: "200px" }}>
                <Box zIndex="2" mt="-35px" position="fixed" w="100%" top={{ base: 21, md: 157 }}>
                    <Box maxW="100%" bg="#FFF2E6" pt={{ base: "80px", md: "50px" }}>
                        <Container w="container.lg" maxW={"100%"}>
                            <Stack color="black" pt="10px">
                                <Heading>Rating</Heading>
                                <Box pt="20px" pb="20px">
                                    {/* Need to filter from the original file */}
                                    <DatingRatingSearch
                                        searchQuery={searchQuery}
                                        setSearchQuery={setSearchQuery}
                                        setFriends={setFriend}
                                        // FRIENDS={FRIEND}
                                        FRIENDS={allFriend}
                                    />
                                </Box>
                            </Stack>
                        </Container>
                    </Box>
                </Box>
            </Box>

            {/* {friend.map((values) => {
                // console.log("Check value " + values.fName)
                return (
                    <Box >
                        <Box mt="7px" p="20px" bg="white" borderRadius={"10px"} shadow="xl">
                            <Flex>
                                {values.following.image ?
                                    <Image
                                        borderRadius="full"
                                        boxSize="78px"
                                        objectFit="cover"
                                        src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + values.following.userId}
                                        alt={values.following.fName + " " + values.following.lName}
                                    /> : <Image
                                        borderRadius="full"
                                        boxSize="78px"
                                        objectFit="cover"
                                        src={NoProfileImg}
                                        alt={values.following.fName + " " + values.following.lName}
                                    />}
                                <Center>
                                    <Text ml="30px" fontSize="20px">
                                        {values.following.fName}
                                        &nbsp;
                                        {values.following.lName}
                                    </Text>
                                </Center>
                            </Flex>
                            <DatingRatingAllStar defaultFill={2} rateFor={values.following.userId} />
                        </Box>
                    </Box>
                )
            })} */}


            {globalThis.followR.map((values) => {
                console.log("Check value " + values)
                return (
                    <Box >
                        <Box mt="7px" p="20px" bg="white" borderRadius={"10px"} shadow="xl">
                            <Flex>
                                {values.image ?
                                    <Image
                                        borderRadius="full"
                                        boxSize="78px"
                                        objectFit="cover"
                                        src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + values.userId}
                                        alt={values.fName + " " + values.lName}
                                    /> : <Image
                                        borderRadius="full"
                                        boxSize="78px"
                                        objectFit="cover"
                                        src={NoProfileImg}
                                        alt={values.fName + " " + values.lName}
                                    />}
                                <Center>
                                    <Text ml="30px" fontSize="20px">
                                        {values.fName}
                                        &nbsp;
                                        {values.lName}
                                    </Text>
                                </Center>
                            </Flex>
                            {/* Need defaultFill from database */}
                            <DatingRatingAllStar defaultFill={2} rateFor={values.userId} />
                        </Box>
                    </Box>
                )
            })}
            <Box pb="60px"></Box>
        </AppBody>
    )
}

export default Rating
