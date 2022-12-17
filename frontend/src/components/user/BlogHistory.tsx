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
        <Flex rounded="xl" direction="column" mt={{ base: "2", md: "4" }} mx={4} bg={{ base: "", sm: "white" }} p={2} position="initial" shadow={{ base: "", md: "lg" }}>
            <Text color="Black" p="3" fontSize={{ base: "xl", md: "2xl" }} fontWeight="500">
                BLOG HISTORY
            </Text>

            <Flex padding="2" mx={{ base: "10", md: "2" }} alignContent="center" alignSelf="center">
                <Feed />
            </Flex>
        </Flex>
    )
}

export default BlogHistory
