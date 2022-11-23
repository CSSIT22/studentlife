import { Box, Button, Center, Heading, Link, Portal, StackDivider, useDisclosure, VStack } from "@chakra-ui/react"
import React from "react"
import { Input } from "@chakra-ui/react"

const alertbox = () => {
    return alert("Are you sure ?")
}

import AppBody from "src/components/share/app/AppBody"
const history = () => {
    return (
        <AppBody>
            <Center>
                {" "}
                <Box width={"80%"} height={"550px"} background={"#D9D9D9"} borderRadius="20px" marginTop={"10%"}>
                    <Box>
                        <Heading
                            width={"300px"}
                            height={"50px"}
                            marginLeft={"10%"}
                            marginTop={"-5"}
                            background={"#f2f2f2"}
                            borderRadius={"10px"}
                            fontSize={"xl"}
                            border={"3px solid white"}
                            textAlign={"center"}
                        >
                            SHORTLINK HISTORY
                        </Heading>
                    </Box>
                    <VStack spacing={4} align="stretch" marginTop={"5%"}>
                        <Box h="70px">
                            <Box width={"100%"}>
                                <Center>
                                    <Input placeholder="intregate.modules.com" w={"50%"} height={"60px"} />
                                    <Button colorScheme="red" w={"25%"} height={"60px"} marginLeft={"10%"}>
                                        DELETE
                                    </Button>
                                </Center>
                            </Box>
                        </Box>
                        <Box h="70px">
                            <Center>
                                <Input placeholder="intregate.modules.com" w={"50%"} height={"60px"} />
                                <Button colorScheme="red" w={"25%"} height={"60px"} marginLeft={"10%"} onClick={alertbox}>
                                    DELETE
                                </Button>
                            </Center>
                        </Box>
                        <Box h="70px">
                            <Center>
                                <Input placeholder="intregate.modules.com" w={"50%"} height={"60px"} />
                                <Button colorScheme="red" w={"25%"} height={"60px"} marginLeft={"10%"}>
                                    DELETE
                                </Button>
                            </Center>
                        </Box>
                        <Box h="70px">
                            <Center>
                                <Input placeholder="intregate.modules.com" w={"50%"} height={"60px"} />
                                <Button colorScheme="red" w={"25%"} height={"60px"} marginLeft={"10%"}>
                                    DELETE
                                </Button>
                            </Center>
                        </Box>
                        <Box h="70px">
                            <Center>
                                <Input placeholder="intregate.modules.com" w={"50%"} height={"60px"} />
                                <Button colorScheme="red" w={"25%"} height={"60px"} marginLeft={"10%"}>
                                    DELETE
                                </Button>
                            </Center>
                        </Box>
                        <Box h="70px">
                            <a href="./shortlink-feature">
                                <Center>
                                    <Button colorScheme="yellow" w={"25%"} height={"60px"} marginLeft={"10%"} borderRadius={"100px"}>
                                        RETURN
                                    </Button>
                                </Center>
                            </a>
                        </Box>
                    </VStack>
                </Box>
            </Center>
        </AppBody>
    )
}
export default history
