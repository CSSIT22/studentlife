import { Heading, Stack, Text, Box, Image, Flex, Center, Container } from "@chakra-ui/react"
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
            <Box display="flex" justifyContent="center" mb={{ base: "150px", md: "200px" }} >
                <Box zIndex="2" mt="-20px" position="fixed" w="100%" top={{ base: 21, md: 157 }}  >
                    <Box maxW="100%" bg="#FFF2E6" pt={{ base: "70px", md: "35px" }}>
                        <Container w="container.lg" maxW={"100%"}>
                            <Stack color="black" pt="10px">
                                <Heading>Rating</Heading>
                                <Box pt="20px" pb="20px">
                                    {/* Need to filter from the original file */}
                                    <DatingRatingSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} setFriends={setFriend} FRIENDS={FRIEND} />
                                </Box>
                            </Stack>
                        </Container>
                    </Box>
                </Box>
            </Box>

            {
                friend.map((values) => {
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
                })
            }
        </AppBody >
    )
}

export default Rating
