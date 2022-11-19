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
                <Text color="black" p="5" fontSize="2xl" fontWeight="600">
                    ABOUT ME
                </Text>
                <Box id="detail" ml={5}>
                    <SimpleGrid columns={2} spacing={10} p={5}>
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            PHONE
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            09xxxxxxxx
                        </Text>
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            AGE
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            20
                        </Text>
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            BIRTHDATE
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            23/APR/2002
                        </Text>
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            SEX
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            Male
                        </Text>
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            HOBBIES
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            Playing Soccer, Sleeping
                        </Text>

                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            YEAES
                        </Text>
                        <Text mb="5" color="black" fontSize="lg" fontWeight="700">
                            2
                        </Text>
                    </SimpleGrid>
                </Box>
            </Flex>
        </div>
    )
}

export default AboutMe
