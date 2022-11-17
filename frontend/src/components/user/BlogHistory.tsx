import React from "react"
import { Box, Flex, Spacer, Text, Container, extendTheme } from "@chakra-ui/react"

function BlogHistory() {
    const breakpoints = {
        sm: "400px",
        md: "800px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
    }

    const theme = extendTheme({ breakpoints })
    return (
        <Flex rounded="xl" direction="column" mt={{ base: "0", md: "4" }} mx={4} bg="white" p={2} position="initial" shadow={"lg"}>
            <Text color="Black" p="5" fontSize="xl" fontWeight="500">
                BLOG HISTORY
            </Text>

            <Container padding="2" mx={2} alignContent="center" alignSelf="center">
                <Box rounded="lg" height="200px" my={5} bg="black" p={3} color="white" textAlign={"center"}>
                    Blog1
                </Box>

                <Box rounded="lg" height="200px" my={5} bg="black" p={3} color="white" textAlign={"center"}>
                    Blog2
                </Box>

                <Box rounded="lg" height="200px" my={5} bg="black" p={3} color="white" textAlign={"center"}>
                    Blog3
                </Box>

                <Box rounded="lg" height="200px" my={5} bg="black" p={3} color="white" textAlign={"center"}>
                    Blog3
                </Box>
                <Box rounded="lg" height="200px" my={5} bg="black" p={3} color="white" textAlign={"center"}>
                    Blog3
                </Box>
            </Container>
        </Flex>
    )
}

export default BlogHistory
