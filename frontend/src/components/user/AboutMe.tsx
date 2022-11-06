import React from "react"
import { Box, Flex, Spacer, Text, SimpleGrid } from "@chakra-ui/react"

function AboutMe() {
    return (
        <div>
            <Flex rounded="xl" direction="column" my={4} mx="5" bg="orange.400" w="60vh">
                <Text color="white" p="5" fontSize="xl" fontWeight="500">
                    ABOUT ME
                </Text>
                <Box id="detail" ml={10}>
                    <SimpleGrid columns={2} spacing={10}>
                        <Text color="gray.200" fontSize="md">
                            PHONE
                        </Text>
                        <Text color="white" fontSize="lg">
                            098654321
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
                        <Text color="white" fontSize="lg">
                            Playing Soccer, Sleeping
                        </Text>
                    </SimpleGrid>
                </Box>
            </Flex>
        </div>
    )
}

export default AboutMe
