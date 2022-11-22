import AppBody from "src/components/share/app/AppBody"
import { Button, Container, Flex, Box, Text, Link } from "@chakra-ui/react"
import { EditIcon, LinkIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    const navigate1 = () => {
        navigate("/link/shortlink")
    }
    const navigate2 = () => {
        navigate("/link/savelink")
    }
    return (
        <AppBody>
            <Container padding="2rem 0" w="100%">
                <Box
                    position="absolute"
                    left={["100%", "100%", "40%"]}
                    top={["50%", "50%", "20%"]}
                    padding="0.5rem 3rem"
                    bg="white"
                    borderRadius="10"
                    shadow={"lg"}
                    background={"orange.200"}
                >
                    <Text as={"b"}>LINK FEATURE</Text>
                </Box>
                <Box borderWidth="1px" borderRadius="xl" padding="2rem">
                    <div>
                        <Flex>
                            <Text as={"b"} fontSize={"2xl"}>
                                SHORTLINK FEATURE
                            </Text>
                        </Flex>
                        <Flex>
                            <Flex w="50%" padding="10" direction="column" gap="1rem">
                                <Box>
                                    <Text as={"b"}>This Features can shorten your link for convinience.</Text>
                                </Box>
                                <Box>
                                    <Button size="md" borderRadius="100" padding="5" background={"orange.200"} onClick={navigate1}>
                                        Click
                                    </Button>
                                </Box>
                            </Flex>
                            <Flex w="50%" justify="center" padding="10">
                                <LinkIcon w="125" h="125" />
                            </Flex>
                        </Flex>
                    </div>

                    <div>
                        <Flex justify="right">
                            <Text as={"b"} fontSize={"2xl"}>
                                SAVELINK FEATURE
                            </Text>
                        </Flex>
                        <Flex>
                            <Flex w="50%" justify="center" padding="10">
                                <EditIcon w="125" h="125" />
                            </Flex>
                            <Flex w="50%" padding="10" direction="column" gap="1rem">
                                <Box>
                                    <Text as={"b"}>You can use this feature to collect your favourite links in All-link! </Text>
                                </Box>
                                <Box>
                                    <Button size="md" borderRadius="100" padding="5" background={"orange.200"} onClick={navigate2}>
                                        Click
                                    </Button>
                                </Box>
                            </Flex>
                        </Flex>
                    </div>
                </Box>
            </Container>
        </AppBody>
    )
}

export default Home
