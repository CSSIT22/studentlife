import {
    Avatar,
    Box,
    Button,
    Center,
    Checkbox,
    Editable,
    EditablePreview,
    EditableTextarea,
    Grid,
    GridItem,
    Heading,
    HStack,
    Link,
    Text,
    VStack,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

import AppBody from "src/components/share/app/AppBody"

const history = () => {
    const navigate = useNavigate()
    const shortlink = () => {
        navigate("/link/shortlink")
    }
    return (
        <AppBody>
            <Center>
                {" "}
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
                            SHORTLINK HISTORY
                        </Heading>
                    </Box>

                    <VStack spacing={5} align="stretch" marginBottom={"100%"}>
                        <Center>
                            <Box w="90%" p={5} color="white" alignItems={"center"}>
                                <HStack spacing="24px">
                                    <Box w="400px" h="10">
                                        <Editable defaultValue="ShortlinkURL/loremciaga" textColor={"black"} border={"4px"} borderColor={"black"}>
                                            <EditablePreview />
                                            <EditableTextarea />
                                        </Editable>
                                    </Box>
                                    <Box w="180px" h="10" borderColor={"black"} paddingBottom={"65px"}>
                                        <Button bg={"red"} w={"100%"} mt={3}>
                                            Delete
                                        </Button>
                                    </Box>
                                </HStack>
                                <hr></hr>
                                <HStack spacing="24px">
                                    <Box w="400px" h="10">
                                        <Editable defaultValue="ShortlinkURL/E3" textColor={"black"} border={"4px"} borderColor={"black"}>
                                            <EditablePreview />
                                            <EditableTextarea />
                                        </Editable>
                                    </Box>
                                    <Box w="180px" h="10" borderColor={"black"} paddingBottom={"65px"}>
                                        <Button bg={"red"} w={"100%"} mt={3}>
                                            Delete
                                        </Button>
                                    </Box>
                                </HStack>
                                <hr></hr>
                                <HStack spacing="24px">
                                    <Box w="400px" h="10">
                                        <Editable defaultValue="ShortlinkURL/Nickk" textColor={"black"} border={"4px"} borderColor={"black"}>
                                            <EditablePreview />
                                            <EditableTextarea />
                                        </Editable>
                                    </Box>
                                    <Box w="180px" h="10" borderColor={"black"} paddingBottom={"65px"}>
                                        <Button bg={"red"} w={"100%"} mt={3}>
                                            Delete
                                        </Button>
                                    </Box>
                                </HStack>
                                <hr></hr>
                                <HStack spacing="24px">
                                    <Box w="400px" h="10">
                                        <Editable defaultValue="ShortlinkURL/Cornkids" textColor={"black"} border={"4px"} borderColor={"black"}>
                                            <EditablePreview />
                                            <EditableTextarea />
                                        </Editable>
                                    </Box>
                                    <Box w="180px" h="10" borderColor={"black"} paddingBottom={"65px"}>
                                        <Button bg={"red"} w={"100%"} mt={3}>
                                            Delete
                                        </Button>
                                    </Box>
                                </HStack>
                                <hr></hr>
                                <HStack spacing="24px">
                                    <Box w="400px" h="10">
                                        <Editable defaultValue="ShortlinkURL/CringeVideos" textColor={"black"} border={"4px"} borderColor={"black"}>
                                            <EditablePreview />
                                            <EditableTextarea />
                                        </Editable>
                                    </Box>
                                    <Box w="180px" h="10" borderColor={"black"} paddingBottom={"65px"}>
                                        <Button bg={"red"} w={"100%"} mt={3}>
                                            Delete
                                        </Button>
                                    </Box>
                                </HStack>
                                <Box>
                                    <Button bg={"orange.200"} w={"50%"} height={"60px"} onClick={shortlink}>
                                        <Text as={"b"}>Return</Text>
                                    </Button>
                                </Box>
                            </Box>
                            <hr></hr>
                        </Center>
                    </VStack>
                </Box>
            </Center>
        </AppBody>
    )
}
export default history
