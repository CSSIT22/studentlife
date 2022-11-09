import React from "react"
import { Box, Flex, Spacer, Text, SimpleGrid, useMediaQuery, extendTheme } from "@chakra-ui/react"

function AboutMe() {
    const breakpoints = {
        sm: "320px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
    }

    // 3. Extend the theme
    const theme = extendTheme({ breakpoints })

    return (
        <div>
            <Flex rounded="xl" direction="column" my={4} ml={5} bg="orange.400" position="initial">
                <Text color="white" p="5" fontSize="xl" fontWeight="500">
                    ABOUT ME
                </Text>
                <Box id="detail" ml={5}>
                    <SimpleGrid columns={2} spacing={10} p={5}>
                        <Text color="gray.200" fontSize="md">
                            PHONE
                        </Text>
                        <Text color="white" fontSize="lg">
                            09xxxxxxxx
                        </Text>
                        <Text color="gray.200" fontSize="md">
                            AGE
                        </Text>
                        <Text color="white" fontSize="lg">
                            20
                        </Text>
                        <Text color="gray.200" fontSize="md">
                            SEX
                        </Text>
                        <Text color="white" fontSize="lg">
                            Male
                        </Text>
                        <Text color="gray.200" fontSize="md">
                            HOBBIES
                        </Text>
                        <Text mb="5" color="white" fontSize="lg">
                            Playing Soccer, Sleeping
                        </Text>
                    </SimpleGrid>
                </Box>
            </Flex>
        </div>
    )
}

export default AboutMe
