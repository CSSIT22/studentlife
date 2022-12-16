import { Box, Button, Center, Heading, VStack, Text, Checkbox, ListItem, OrderedList, List, Stack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import AppBody from "src/components/share/app/AppBody"

const ShortAc = () => {
    const navigate = useNavigate()
    const complete = () => {
        navigate("/link/complete")
    }
    return (
        <AppBody>
            <Center>
                {" "}
                <Box width={"80%"} height={"500px"} background={"white"} borderRadius="20px" marginTop={"10%"}>
                    <Box>
                        <Heading
                            width={"300px"}
                            height={"50px"}
                            marginLeft={"10%"}
                            marginTop={"-5"}
                            background={"orange.200"}
                            borderRadius={"10px"}
                            fontSize={"xl"}
                            border={"3px solid white"}
                            textAlign={"center"}
                            textColor="white"
                        >
                            SHORTLINK PERMISSION
                        </Heading>
                    </Box>

                    <VStack spacing={4} align="stretch" marginTop={"10%"}>
                        <Box h="70px">
                            <Box width={"100%"}>
                                <Center>
                                    <List>
                                        <ListItem marginBottom={""}>
                                            <Center><Text as={"b"}  fontSize="2xl">
                                                Major
                                            </Text></Center>
                                        </ListItem>

                                        <ListItem marginBottom={"20px"}>
                                            <Button bg={"orange.600"} w={"100%"} height={"60px"} onClick={complete}>
                                                <Text as={"b"}>Click!</Text>
                                            </Button>
                                        </ListItem>

                                        <ListItem>
                                        <Center><Text as={"b"} fontSize="2xl">
                                                Faculty
                                            </Text></Center>
                                        </ListItem>

                                        <ListItem marginBottom={"20px"}>
                                            <Button bg={"orange.600"} w={"300px"} height={"60px"} onClick={complete}>
                                                <Text as={"b"}>Click!</Text>
                                            </Button>
                                        </ListItem>
                                        
                                        <ListItem>
                                        <Center><Text as={"b"} fontSize="2xl">
                                                Year
                                            </Text></Center>
                                        </ListItem>
                                        <ListItem marginBottom={"20px"}>
                                            <Button bg={"orange.600"} w={"100%"} height={"60px"} onClick={complete}>
                                                <Text as={"b"}>Click!</Text>
                                            </Button>
                                        </ListItem>
                                    </List>
                                </Center>
                            </Box>
                        </Box>
                        <Box>
                            <br />
                            <br />
                        </Box>
                    </VStack>
                </Box>
            </Center>
        </AppBody>
    )
}
export default ShortAc
