import React from "react"
import { Box, Flex, Spacer, Text, Container } from "@chakra-ui/react"

function BlogHistory() {
    return (
        <Flex rounded="xl" direction="column" mt={4} mx="5" bg="orange.400" p={2}>
            <Text color="white" p="5" fontSize="xl" fontWeight="500">
                BLOG HISTORY
            </Text>

            <Container padding="5">
                <Box rounded="lg" mx={6} my={5} bg="black" p={10} color="white" textAlign={"center"}>
                    This is the Box
                </Box>

                <Box rounded="lg" mx={6} my={5} bg="black" p={10} color="white" textAlign={"center"}>
                    This is the Box
                </Box>

                <Box rounded="lg" mx={6} my={5} bg="black" p={10} color="white" textAlign={"center"}>
                    This is the Box
                </Box>

                <Box bg="tomato" w="100%" p={4} color="white">
                    This is the Box
                </Box>
            </Container>
        </Flex>
    )
}

export default BlogHistory
