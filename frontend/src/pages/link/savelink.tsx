import AppBody from "../../components/share/app/AppBody"
import { Container, Center, Heading, Input, Button, Box, Text, Link, useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const savelink = () => {
    const toast = useToast()

    const navigate = useNavigate()
    const allLink = () => {
        navigate("/link/allLink")
    }
    return (
        <AppBody>
            <Container borderWidth="1px" padding="10" borderRadius="xl" background={"white"} gap={2} >
                <Box
                    width={"200px"}
                    height={"40px"}
                    marginLeft={"-30"}
                    marginTop={"-50"}
                    background={"orange.200"}
                    borderRadius={"10px"}
                    fontSize={"md"}
                    border={"3px solid white"}
                    textAlign={"center"}
                    textColor="white"
                >
                    <Text as={"b"}>SAVELINK FEATURE</Text>
                </Box>
                <br />
                <Input placeholder="link url:" w={"100%"} height={"50px"} border={"4px"} borderColor={"black"} />
                <Box>
                    <br />
                    <Button
                        bg={"green.400"}
                        w={"100%"}
                        rounded={"xl"}
                        onClick={() =>
                            toast({
                                title: "Savelink Complete!",

                                status: "success",
                                duration: 1500,
                                isClosable: true,
                            })
                        }
                    >
                        Save
                    </Button>
                </Box>

                <br />

                <Button width={"100%"} rounded={"xl"} bg={"orange.400"} onClick={allLink}>
                    All Links
                </Button>
            </Container>
        </AppBody>
    )
}
export default savelink
