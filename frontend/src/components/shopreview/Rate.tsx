import { Box, Flex, Heading, SimpleGrid, Stack } from "@chakra-ui/react"
import AmountRate from "./AmountRate"

const Rate = () => {
    return (
        <SimpleGrid columns={{ base: 3, lg: 6 }} gap={{ base: 3, lg: 6 }} marginTop={5}>
            <Box as="button" p={3} h={32} background={"white"} shadow={"md"} rounded={"2xl"}>
                <Box p={1} width={"60px"} height={"25px"} px={2} rounded={"2xl"} background={"#FF3939"}>
                    <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                        <img
                            style={{ maxWidth: 14 }}
                            src={"https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png"}
                        ></img>
                        <Heading ml={2} size={"xs"} color="white">
                            5/5
                        </Heading>
                    </Flex>
                </Box>
                <Heading textAlign={"center"}>3K</Heading>
                <br></br>
            </Box>
            <Box as="button" p={5} h={32} background={"white"} shadow={"md"} rounded={"2xl"}>
                <Box p={1} width={"60px"} height={"25px"} px={2} rounded={"2xl"} background={"#1DBC03"}>
                    <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                        <img
                            style={{ maxWidth: 14 }}
                            src={"https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png"}
                        ></img>
                        <Heading ml={2} size={"xs"} color="white">
                            4/5
                        </Heading>
                    </Flex>
                </Box>
                <Heading textAlign={"center"}>100</Heading>
                <br></br>
            </Box>
            <Box as="button" p={5} h={32} background={"white"} shadow={"md"} rounded={"2xl"}>
                <Box p={1} width={"60px"} height={"25px"} px={2} rounded={"2xl"} background={"#1DBC03"}>
                    <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                        <img
                            style={{ maxWidth: 14 }}
                            src={"https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png"}
                        ></img>
                        <Heading ml={2} size={"xs"} color="white">
                            3/5
                        </Heading>
                    </Flex>
                </Box>
                <Heading textAlign={"center"}>300K</Heading>
                <br></br>
            </Box>
            <Box as="button" p={5} h={32} background={"white"} shadow={"md"} rounded={"2xl"}>
                <Box p={1} width={"60px"} height={"25px"} px={2} rounded={"2xl"} background={"#39A0FF"}>
                    <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                        <img
                            style={{ maxWidth: 14 }}
                            src={"https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png"}
                        ></img>
                        <Heading ml={2} size={"xs"} color="white">
                            2/5
                        </Heading>
                    </Flex>
                </Box>
                <Heading textAlign={"center"}>1</Heading>
                <br></br>
            </Box>
            <Box as="button" p={5} h={32} background={"white"} shadow={"md"} rounded={"2xl"}>
                <Box p={1} width={"60px"} height={"25px"} px={2} rounded={"2xl"} background={"#39A0FF"}>
                    <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                        <img
                            style={{ maxWidth: 14 }}
                            src={"https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png"}
                        ></img>
                        <Heading ml={2} size={"xs"} color="white">
                            1/5
                        </Heading>
                    </Flex>
                </Box>
                <Heading textAlign={"center"}>15</Heading>
                <br></br>
            </Box>
            <Box as="button" p={5} h={32} background={"white"} shadow={"md"} rounded={"2xl"}>
                <Box p={1} width={"60px"} height={"25px"} px={2} rounded={"2xl"} background={"#838383"}>
                    <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                        <img
                            style={{ maxWidth: 14 }}
                            src={"https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png"}
                        ></img>
                        <Heading ml={2} size={"xs"} color="white">
                            0/5
                        </Heading>
                    </Flex>
                </Box>
                <Heading textAlign={"center"}>10</Heading>
                <br></br>
            </Box>
        </SimpleGrid>
    )
}

export default Rate
