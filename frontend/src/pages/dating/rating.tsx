import { Heading, Stack, Text, Box, Image, Flex } from "@chakra-ui/react"
import DatingAppBody from "../../components/dating/DatingAppBody"

const Rating = () => {
    return (
        <DatingAppBody>
            <Stack color="black" pt="20px">
                <Heading>Rating</Heading>
                <Text fontSize="xl">You are friend with</Text>
                <Text>Search bar 1 EA</Text>
                <Box mt="50px" p="20px" bg="#E67F45" borderRadius={"10px"}>
                    <Flex>
                        <Image borderRadius="full" boxSize="78px" src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
                        <Text>Firstname Lastname</Text>
                    </Flex>
                </Box>
            </Stack>
        </DatingAppBody>
    )
}

export default Rating
