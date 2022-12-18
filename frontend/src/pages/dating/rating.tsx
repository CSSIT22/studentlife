import { Heading, Stack, Text, Box, Image, Flex, Center, Container } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import AppBody from "./../../components/share/app/AppBody"
import { FRIEND } from "./../../components/dating/shared/friend"
import DatingRatingSearch from "src/components/dating/DatingRatingSearch"
import DatingRatingAllStar from "src/components/dating/DatingRatingAllStar"
import API from "src/function/API"
import { FollowDetail, RateFollow } from "@apiType/dating"
import NoProfileImg from "../../components/dating/pic/noprofile.png"
import { Link } from "react-router-dom"


const Rating = () => {
    // const [friend, setFriend] = useState(FRIEND)
    // const [followRate, setFollowRate] = useState<RateFollow[]>([])
    const [rate, setRate] = useState<RateFollow[]>([])
    const [allRate, setAllRate] = useState<RateFollow[]>([])
    // const [friend, setFriend] = useState<FollowDetail[]>([])
    // const [allFriend, setAllFriend] = useState<FollowDetail[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    // const didMount = useDidMount()
    let count = 1

    useEffect(() => {
        if (count != 0) {
            count--
            window.scrollTo(0, 0)
            // API.get("/dating/rating/getUserProfile").then((followDB) => {
            //     setFriend(followDB.data)
            //     setAllFriend(followDB.data)
            // })
            //     .catch((err) => console.log(err));
            API.get("/dating/rating/getRating").then((rating) => {
                setRate(rating.data)
                setAllRate(rating.data)
            })
                .catch((err) => console.log(err));
        }

    }, [])

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
                                        // setFriends={setFriend}
                                        // FRIENDS={allFriend}
                                        setFriends={setRate}
                                        FRIENDS={allRate}
                                    />
                                </Box>
                            </Stack>
                        </Container>
                    </Box>
                </Box>
            </Box>

            {rate.map((values) => {
                // console.log("Check value " + values.fName)
                return (
                    <Box >
                        <Box mt="7px" p="20px" bg="white" borderRadius={"10px"} shadow="xl">
                            <Flex>
                                <Link to={"/user/" + values.anotherUserId}>
                                    {values.scoreReceiver.image ?
                                        <Image
                                            borderRadius="full"
                                            boxSize="78px"
                                            objectFit="cover"
                                            src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + values.anotherUserId}
                                            alt={values.scoreReceiver.fName + " " + values.scoreReceiver.lName}
                                        /> : <Image
                                            borderRadius="full"
                                            boxSize="78px"
                                            objectFit="cover"
                                            src={NoProfileImg}
                                            alt={values.scoreReceiver.fName + " " + values.scoreReceiver.lName}
                                        />}
                                </Link>
                                <Center>
                                    <Text ml="30px" fontSize="20px">
                                        {values.scoreReceiver.fName}
                                        &nbsp;
                                        {values.scoreReceiver.lName}
                                    </Text>
                                </Center>
                            </Flex>
                            <DatingRatingAllStar defaultFill={values.score} rateFor={values.anotherUserId} />
                        </Box>
                    </Box>
                )
            })}


            {/* {globalThis.followR.map((values) => {
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
                            {/* Need defaultFill from database 
            <DatingRatingAllStar defaultFill={2} rateFor={values.userId} />
        </Box>
                    </Box >
                )
            })} * /}
    <Box Box pb = "60px" ></Box >
    */}
        </AppBody >
    )
}

export default Rating
