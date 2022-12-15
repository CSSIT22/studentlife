import { Heading, Stack, Text, Box, Image, Flex, Center, Container } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import AppBody from "./../../components/share/app/AppBody"
import { FRIEND } from "./../../components/dating/shared/friend"
import DatingRatingSearch from "src/components/dating/DatingRatingSearch"
import DatingRatingAllStar from "src/components/dating/DatingRatingAllStar"
import API from "src/function/API"
import { FollowDetail } from "@apiType/dating"
import NoProfileImg from "../../components/dating/pic/noprofile.png"

const Rating = () => {
    // const [friend, setFriend] = useState(FRIEND)
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

            {friend.map((values) => {
                console.log(values.following.receiveRate)
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
                            <DatingRatingAllStar defaultFill={values.following.receiveRate.score} rateFor={values.following.userId} />
                        </Box>
                    </Box>
                )
            })}
            <Box pb="60px"></Box>
        </AppBody>
    )
}

export default Rating
