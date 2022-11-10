import React from "react"
import { Box, Flex, Spacer, Text, Container } from "@chakra-ui/react"

function BlogHistory() {
    return (
        <Flex rounded="xl" direction="column" mt={2} ml={3} bg="white" p={2} position="initial" shadow={"lg"}>
            <Text color="Gray.700" p="5" fontSize="xl" fontWeight="500">
                BLOG HISTORY
            </Text>

            <Container padding="5">
                <Box rounded="lg" mx={6} my={5} bg="black" p={10} color="white" textAlign={"center"}>
                    Blog1
                </Box>

                <Box rounded="lg" mx={6} my={5} bg="black" p={10} color="white" textAlign={"center"}>
                    Blog2
                </Box>

                <Box rounded="lg" mx={6} my={5} bg="black" p={10} color="white" textAlign={"center"}>
                    Blog3
                </Box>
            </Container>
        </Flex>
    )
}

export default BlogHistory
