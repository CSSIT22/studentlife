import React from "react"
import { Box, Flex, Spacer, Text, Container, extendTheme } from "@chakra-ui/react"
import Feed from "../timeline/Feed"

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
            <Text color="Black" p="5" fontSize={{ base: "xl", md: "2xl" }} fontWeight="500">
                BLOG HISTORY
            </Text>

            <Container padding="2" mx={2} alignContent="center" alignSelf="center">
                <Feed />
            </Container>
        </Flex>
    )
}

export default BlogHistory
