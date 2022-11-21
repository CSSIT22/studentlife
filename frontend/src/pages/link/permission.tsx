import { Box, Button, Center, Heading, VStack, Text, Checkbox, ListItem, OrderedList, List, Stack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import AppBody from "src/components/share/app/AppBody"

const permission = () => {
    const navigate = useNavigate()
    const userac = () => {
        navigate("/link/uaccess")
    }
    const shortac = () => {
        navigate("/link/saccess")
    }
    return (
        <AppBody>
            <Center>
                <Box width={"80%"} height={"500px"} background={"#D9D9D9"} borderRadius="20px" marginTop={"10%"}>
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
                            SHORTLINK PERMISSION
                        </Heading>
                    </Box>

                    <VStack spacing={4} align="stretch" marginTop={"10%"}>
                        <Box h="70px">
                            <Box width={"100%"}>
                                <Center>
                                    <List>
                                        <ListItem marginBottom={""}>
                                            <Text as={"b"} fontSize="2xl">
                                                User Access
                                            </Text>
                                        </ListItem>

                                        <ListItem marginBottom={"50px"}>
                                            <Button bg={"orange.200"} w={"100%"} height={"60px"} onClick={userac}>
                                                <Text as={"b"}>Click!</Text>
                                            </Button>
                                        </ListItem>

                                        <ListItem>
                                            <Text as={"b"} fontSize="2xl">
                                                Shortlink Access
                                            </Text>
                                        </ListItem>

                                        <ListItem marginBottom={"50px"}>
                                            <Button bg={"orange.200"} w={"100%"} height={"60px"} onClick={shortac}>
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
export default permission
