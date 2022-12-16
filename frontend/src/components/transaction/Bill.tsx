import React from "react"
import { Box, Flex, Spacer, Text, Container, extendTheme, SimpleGrid, Avatar, Center, VStack } from "@chakra-ui/react"
import { ArrowDownIcon } from "@chakra-ui/icons"

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
        <Flex rounded="xl" direction="column" my={4} mx={4} bg="orange" position="initial" shadow={"lg"}>
            <Text color="black" p="5" fontSize={{ base: "xl", md: "2xl" }} fontWeight="600">
                Check Out
            </Text>
            <Box id="detail" ml={5} bg="orange.100" rounded="xl" alignItems={"Center"}>
                <Center bg="tomato" color="white" mb={10}>
                    <Avatar name="Kent Dodds" size="xl" src="https://bit.ly/kent-c-dodds" />
                    <Box ml={20} bg="green" as="button" borderRadius="md" color="white" px={20} h={20}>
                        <Text fontSize="sm">(sm) In love with React & Next</Text>
                        <Text fontSize="sm">(sm) In love with React & Next</Text>
                        <Text fontSize="sm">(sm) In love with React & Next</Text>
                    </Box>
                </Center>
                <Center>
                    <ArrowDownIcon w={20} h={20} color="white" />
                </Center>
                <Center bg="tomato" color="white" mt={10}>
                    <Avatar name="Kent Dodds" size="xl" src="https://bit.ly/kent-c-dodds" />
                    <Box ml={20} bg="green" as="button" borderRadius="md" color="white" px={20} h={20}>
                        <Text fontSize="sm">(sm) In love with React & Next</Text>
                        <Text fontSize="sm">(sm) In love with React & Next</Text>
                        <Text fontSize="sm">(sm) In love with React & Next</Text>
                    </Box>
                </Center>
                <Box bg="white" w="700px">
                    <SimpleGrid columns={1} spacing={3} p={3}>
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
                            BIRTH DATE
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            23/APR/2002
                        </Text>
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            BIRTH DATE
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            23/APR/2002
                        </Text>
                    </SimpleGrid>
                </Box>
            </Box>
        </Flex>
    )
}

export default BlogHistory
