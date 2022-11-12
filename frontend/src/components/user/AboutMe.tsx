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
            <Flex rounded="xl" direction="column" my={4} mx={4} bg="white" position="initial" shadow={"lg"}>
                <Text color="black" p="5" fontSize="2xl" fontWeight="500">
                    ABOUT ME
                </Text>
                <Box id="detail" ml={5}>
                    <SimpleGrid columns={2} spacing={10} p={5}>
                        <Text color="gray.500" fontSize="md">
                            PHONE
                        </Text>
                        <Text color="black" fontSize="lg">
                            09xxxxxxxx
                        </Text>
                        <Text color="gray.500" fontSize="md">
                            AGE
                        </Text>
                        <Text color="black" fontSize="lg">
                            20
                        </Text>
                        <Text color="gray.500" fontSize="md">
                            SEX
                        </Text>
                        <Text color="black" fontSize="lg">
                            Male
                        </Text>
                        <Text color="gray.500" fontSize="md">
                            HOBBIES
                        </Text>
                        <Text mb="5" color="black" fontSize="lg">
                            Playing Soccer, Sleeping
                        </Text>
                    </SimpleGrid>
                </Box>
            </Flex>
        </div>
    )
}

export default AboutMe
