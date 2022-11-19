import { Heading, Stack, Text, Box, Image, Flex, Center } from "@chakra-ui/react"
import { useState } from "react"
import AppBody from "./../../components/share/app/AppBody"
import { FRIEND } from "./../../components/dating/shared/friend"
import DatingRatingSearch from "src/components/dating/DatingRatingSearch"
import DatingRatingAllStar from "src/components/dating/DatingRatingAllStar"

const Rating = () => {
    const [friend, setFriend] = useState(FRIEND)
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <AppBody>
            <Stack color="black" pt="10px">
                <Heading>Rating</Heading>
                <Text fontSize="xl">You are friend with</Text>
                <Box pb="10">
                    {/* Need to filter from the original file */}
                    <DatingRatingSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} setFriends={setFriend} FRIENDS={FRIEND} />
                </Box>
                {friend.map((values) => {
                    return (
                        <Box>
                            <Box mt="7px" p="20px" bg="white" borderRadius={"10px"} shadow="xl">
                                <Flex>
                                    <Image
                                        borderRadius="full"
                                        boxSize="78px"
                                        objectFit="cover"
                                        src={values.url}
                                        alt={values.Fname + " " + values.Lname}
                                    />
                                    <Center>
                                        <Text ml="30px" fontSize="20px">
                                            {values.Fname}
                                            &nbsp;
                                            {values.Lname}
                                        </Text>
                                    </Center>
                                </Flex>
                                <DatingRatingAllStar defaultFill={values.rate} rateFor={values.UserId} />
                            </Box>
                        </Box>
                    )
                })}
            </Stack>
        </AppBody>
    )
}

export default Rating
