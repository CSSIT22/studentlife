import AppBody from "../../components/share/app/AppBody"
import { Container, Center, Box, Text, Flex, HStack, Heading, VStack, List, ListItem, Button, useMediaQuery } from "@chakra-ui/react"
import { CheckCircleIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"
import { fontSize } from "@mui/system"

const complete = () => {


    return (
        <AppBody>
            <Center>
                <Box width={"80%"} height={"500px"} background={"#D9D9D9"} borderRadius="20px" marginTop={"10%"}>
                    <Box p={5} className='my-box' marginLeft={"5%"}
                        width={"80%"}
                        marginTop={"-5"}
                        background={"#f2f2f2"}
                        borderRadius={"10px"}>
                        <Center>
                            <Heading size='sm'>
                                SHORTLINK UNBLOCK
                            </Heading>
                        </Center>

                    </Box>

                    <VStack spacing={4} align="stretch" marginTop={"10%"}>
                        <Box h="70px">
                            <Box width={"100%"}>
                                <Center>
                                    <Box bgColor={"white"} p="5%" w="60%" h="auto" borderRadius="15px">

                                        <Text align="center" fontWeight="bold" fontSize="lg">
                                            CREATE SHORTLINK COMPLETE
                                        </Text>
                                    </Box>
                                </Center>
                            </Box>

                            <Box width={"100%"} marginTop={'5%'}>
                                <Center>
                                    <Box bgColor={"white"} p="5%" w="60%" h="auto" borderRadius="15px">
                                        <Center>
                                            <CheckCircleIcon w="125" h="125" />

                                        </Center>
                                    </Box>
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

export default complete
