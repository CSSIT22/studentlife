import { Container, Stack, Text, Box, Button } from "@chakra-ui/react"
import React from "react"

const masterCard = () => {
    return (
        <div>
            {" "}
            <Container id="mastercard" bg="white" color="black" maxW={"1000px"}>
                <Stack direction={"row"}>
                    <Text fontSize="xl">Select payment account:</Text>
                    <Box>
                        <Stack direction="column">
                            <Text fontSize="xl" border={"4px"} w="500px">
                                MasterCard
                            </Text>
                            <Button colorScheme="orange" w={"200px"}>
                                Add a new MasterCard
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </div>
    )
}

export default masterCard
