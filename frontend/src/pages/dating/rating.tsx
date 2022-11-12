import { Heading, Stack, Text, Box, Image, Flex, Center, IconButton, Button } from "@chakra-ui/react"
import DatingAppBody from "../../components/dating/DatingAppBody"
import RatingStar from "../../components/dating/RatingStar"
import { FRIEND } from "./../../components/dating/shared/friend"

const index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const Rating = () => {
    function handleStar(star: any) {
        console.log("Not done yet")
    }
    return (
        <DatingAppBody>
            <Stack color="black" pt="20px">
                <Heading>Rating</Heading>
                <Text fontSize="xl">You are friend with</Text>
                <Text>Search bar 1 EA</Text>
                {FRIEND.map(() => {
                    return (
                        <Box mt="50px" p="20px" bg="#E67F45" borderRadius={"10px"}>
                            <Flex>
                                <Image borderRadius="full" boxSize="78px" src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
                                <Center>
                                    <Text ml="30px" fontSize="20px" color="white">
                                        FirstName LastName
                                        {/* {Fname}
                                        {Lname} */}
                                    </Text>
                                </Center>
                            </Flex>
                            <Flex direction="row" p="0px" m="0px">
                                {index.map((rate) => {
                                    return <RatingStar key={rate} onClick={handleStar} />
                                })}
                                {/* <RatingStar key={rate} onClick={handleStar} /> */}
                            </Flex>
                        </Box>
                    )
                })}
            </Stack>
        </DatingAppBody>
    )
}

export default Rating
