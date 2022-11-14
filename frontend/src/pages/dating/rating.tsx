import { Heading, Stack, Text, Box, Image, Flex, Center } from "@chakra-ui/react"
import { useState } from "react"
import AppBody from "./../../components/share/app/AppBody"
import DatingRatingStar from "../../components/dating/DatingRatingStar"
import { FRIEND } from "./../../components/dating/shared/friend"
import DatingRatingSearch from "src/components/dating/DatingInterestSearch"

const index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const Rating = () => {
    const [friend, setFriend] = useState(FRIEND)
    const [searchQuery, setSearchQuery] = useState("")

    // function handleStar(star: number) {
    //     console.log("Wtf is this value? " + star)
    // }

    function handleFill(status: number, position: number) {
        return status > position
    }

    return (
        <AppBody>
            <Stack color="black" pt="10px">
                <Heading>Rating</Heading>
                <Text fontSize="xl">You are friend with</Text>
                <Text>Search bar are broken + click status also broken too 😿</Text>
                {/* <Box pb="10">
                    <DatingRatingSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} setFriends={setFriend} FRIENDS={friend} />
                </Box> */}
                {friend.map((values) => {
                    return (
                        <Box>
                            <Box mt="7px" p="20px" bg="white" borderRadius={"10px"} shadow="xl">
                                <Flex>
                                    <Image borderRadius="full" boxSize="78px" src={values.url} alt={values.Fname + " " + values.Lname} />
                                    <Center>
                                        <Text ml="30px" fontSize="20px">
                                            {values.Fname}
                                            &nbsp;
                                            {values.Lname}
                                        </Text>
                                    </Center>
                                </Flex>
                                <Flex direction="row" p="0px" m="0px">
                                    {index.map((status) => {
                                        return (
                                            <DatingRatingStar
                                                key={status}
                                                status={index[status] + 1}
                                                defultFill={handleFill(values.rate, index[status])}

                                                // onClick={console.log(index[status])}
                                            />
                                        )
                                    })}
                                    {/* <RatingStar key={rate} onClick={handleStar} /> */}
                                </Flex>
                            </Box>
                        </Box>
                    )
                })}
            </Stack>
        </AppBody>
    )
}

export default Rating
